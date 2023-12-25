import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col } from 'reactstrap';
import { Btn, H2, P } from '../../AbstractElements';
import "./err404.css"

const Err404 = () => {
    return (
        <Fragment>
            <div className="error-wrapper">
                <Container>
                    <div className="error-page1">
                        <h2 style={{fontSize: 90}}>
                            404
                        </h2>
                        <Col md="8" className="offset-md-2">
                            <H2>خطای 404 - موردی پیدا نشد</H2>
                            <P attrPara={{ className: 'sub-content' }} >موردی که به دنبال آن هستید وجود ندارد.</P>
                            <Link to="/" >
                                <Btn attrBtn={{ className: 'btn-lg', color: 'primary' }}>برگردید</Btn>
                            </Link>
                        </Col>
                    </div>
                </Container>
            </div>
        </Fragment>
    );
};

export default Err404;