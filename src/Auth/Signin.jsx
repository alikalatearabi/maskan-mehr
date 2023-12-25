import React from 'react';
import { Container, Row, Col, TabContent, TabPane } from 'reactstrap';
import LoginTab from './Tabs/LoginTab';
import {useLocation} from "react-router-dom";

const Logins = () => {
  const token = localStorage.getItem('token')

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return (
    <Container fluid={true} className="p-0">
      <Row>
          <div className="bg-theme-form">
              {token ?
                window.location.href = from
                :
                <Col xs="12">
                  <div className="platform-logo">
                      خسارت مسکن مهر
                  </div>
                  <div className="login-card">
                    <div>
                      <div className="login-main1 login-tab1">
                        <TabContent className="content-login">
                          <TabPane className="fade show">
                            <LoginTab/>
                          </TabPane>
                          <TabPane className="fade show" tabId="auth0">
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                  </div>
                </Col>

            }
          </div>
      </Row>
    </Container>
  );
};

export default Logins;