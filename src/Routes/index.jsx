import React, { Fragment, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../Layout/Loader';
import Callback from '../Auth/Callback';
import PrivateRoute from './PrivateRoute';
import {AuthProvider} from "../context/AuthProvider";
import Logins from "../Auth/Signin";
import LayoutRoutes from './LayoutRoutes';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./style-router.css"


const Routers = () => {
  const jwt_token = localStorage.getItem('token');
  const RouterChecked = localStorage.getItem('Role');

  return (
    <Fragment>
      <AuthProvider>
        <BrowserRouter basename={'/'}>
          <>
            <Suspense fallback={<Loader />}>
              <TransitionGroup>
                <CSSTransition
                  timeout={5000}
                  classNames='fade-enter'
                  key={window.location.key}
                >
                  <Routes key={window.location.key} location={window.location}>
                    <Route path={'/'} element={<PrivateRoute />}>
                        {jwt_token ?
                          <>
                            {RouterChecked === "AccountingOffice" ?
                                <>
                                  <Route exact
                                         path={`${process.env.PUBLIC_URL}`}
                                         element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/reports/ReportsDamageCases/`} />}
                                  />
                                  <Route exact
                                         path={`/`}
                                         element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/reports/ReportsDamageCases/`} />}
                                  />
                                </>
                            :
                              <>
                                <Route exact
                                       path={`${process.env.PUBLIC_URL}`}
                                       element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/operations/SpecificationsMaskanMehr/`} />}
                                />
                                <Route exact
                                       path={`/`}
                                       element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/operations/SpecificationsMaskanMehr/`} />}
                                />
                              </>
                            }
                          </> : ''}
                        <Route path={`/*`} element={<LayoutRoutes />} />
                      </Route>
                      <Route path={`${process.env.PUBLIC_URL}/callback`} render={() => <Callback />} />
                      <Route exact path={`${process.env.PUBLIC_URL}/login`} element={<Logins />} />
                      <Route path={`${process.env.PUBLIC_URL}/login`} element={<Logins />} key={222} />
                  </Routes>
                </CSSTransition>
              </TransitionGroup>
            </Suspense>
          </>
        </BrowserRouter>
      </AuthProvider>
    </Fragment >
  );
};
export default Routers;