import React, { Fragment } from 'react';
import { Col, Container, Row } from 'reactstrap';
import LoginForm from './LoginForm';
import imgg from '../../../assets/img/maintenance-bg.webp';

const LoginValidation = () => {
    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col xl="7 order-1" style={{ backgroundImage: `url(${imgg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', display: 'block' }}>
                    </Col>
                    <Col xl="5 p-0">
                        <div className="login-card1">
                            <LoginForm />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default LoginValidation;