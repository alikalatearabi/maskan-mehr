import React, { Fragment } from 'react';
import { Col, Container, Row } from 'reactstrap';
import RegisterFrom from './RegisterFrom';
import imgg from '../../../assets/img/maintenance-bg.webp';

const RegisterBgImg = () => {
    return (
        <Fragment>
            <section>
                <Container fluid={true} className="p-0">
                    <Row className='m-0'>
                        <Col xl='5' style={{ backgroundImage: `url(${imgg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', display: 'block' }}>
                        </Col>
                        <Col xl="7 p-0" >
                            <div className="login-card1">
                                <RegisterFrom />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};

export default RegisterBgImg;