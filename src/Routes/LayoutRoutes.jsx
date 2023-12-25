import React, { Fragment, } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerAdmin } from './RouterAdmin';
import { routerExpert } from './RouterExpert';
import Layout from '../Layout/Layout';
import {createBreakpoint} from "react-use";
import {routerBranchesManager} from "./RouterBranchesManager";
import {routerAccountingOffice} from "./RouterAccountingOffice";

const LayoutRoutes = () => {
    const RouterChecked = localStorage.getItem('Role');


    return (
    <Fragment>
        {RouterChecked === "Admin" ?
            <Routes>
                {routerAdmin.map(({path, Component}, i) => (
                    <Route element={<Layout/>} key={i}>
                        <Route path={path} element={Component}/>
                    </Route>
                ))}
            </Routes>
        :
            createBreakpoint
        }

        {RouterChecked === "Expert" ?
            <Routes>
                {routerExpert.map(({path, Component}, i) => (
                    <Route element={<Layout/>} key={i}>
                        <Route path={path} element={Component}/>
                    </Route>
                ))}
            </Routes>
        :
            createBreakpoint
        }

        {RouterChecked === "BranchesManager" ?
            <Routes>
                {routerBranchesManager.map(({path, Component}, i) => (
                    <Route element={<Layout/>} key={i}>
                        <Route path={path} element={Component}/>
                    </Route>
                ))}
            </Routes>
        :
            createBreakpoint
        }

        {RouterChecked === "AccountingOffice" ?
            <Routes>
                {routerAccountingOffice.map(({path, Component}, i) => (
                    <Route element={<Layout/>} key={i}>
                        <Route path={path} element={Component}/>
                    </Route>
                ))}
            </Routes>
        :
            createBreakpoint
        }



    </Fragment >
  );
};

export default LayoutRoutes;