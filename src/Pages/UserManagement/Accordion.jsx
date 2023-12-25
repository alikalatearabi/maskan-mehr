import {Btn, H5} from '../../AbstractElements';
import React, {useState} from 'react';
import { Accordion } from 'react-bootstrap'
import {Card, CardBody, CardHeader, Col, Collapse, Form, Row} from 'reactstrap';

const UserManagementAccordion = ({handleGetId, handleGetUserName}) => {

    const [idSearchRes, setIdSearchRes] = useState();
    const [userNameSearchRes, setUserNameSearchRes] = useState();

    const [isOpen, setIsOpen] = useState(1);
    const toggle = (id) => (isOpen === id ? setIsOpen(null) : setIsOpen(id));

    return (

        <Accordion defaultActiveKey="0">
            <div className="default-according" id="accordion1">
                <Card>
                    <CardHeader className="bg-primary">
                        <H5 attrH5={{ className: 'mb-0' }} className="text-white" >
                            <Btn attrBtn={{ as: Card.Header, className: 'btn btn-link text-white', color: 'default', onClick: () => toggle(1) }} >
                                <i className="icofont icofont-search"></i>جستجو
                            </Btn>
                        </H5>
                    </CardHeader>
                    <Collapse isOpen={isOpen === 1} className="bg-light" style={{borderBottomRightRadius: 15, borderBottomLeftRadius: 15}}>
                        <CardBody>

                            <Card className="bg-light">
                                <CardBody>
                                    <Form className="needs-validation" noValidate="">
                                        <Row>
                                            <Col md="6" className="mb-1">
                                                <input className="form-control input-air-primary" name="lastName" type="text" placeholder="نام کاربری"
                                                    onChange={e => setUserNameSearchRes(e.target.value)}
                                                    value={userNameSearchRes}
                                                />
                                            </Col>
                                            <Col md="6" className="mb-1">
                                                <input className="form-control input-air-primary" name="lastName" type="text" placeholder="آیدی کاربر"
                                                   onChange={e => setIdSearchRes(e.target.value)}
                                                   value={idSearchRes}
                                                />
                                            </Col>
                                        </Row>
                                        <div className={"text-center mt-4"}>
                                            {idSearchRes && userNameSearchRes ?
                                                <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک فیلد را جستجو کنید</Btn>
                                                : idSearchRes ?
                                                    <Btn attrBtn={{ color: 'primary', onClick: (e) => handleGetId(e, idSearchRes) }} >جستجو</Btn>
                                                    : userNameSearchRes ?
                                                        <Btn attrBtn={{ color: 'primary', onClick: (e) => handleGetUserName(e, userNameSearchRes) }} >جستجو</Btn>
                                                        :
                                                        <Btn attrBtn={{color: 'primary', disabled: true}}>جستجو</Btn>
                                            }
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>

                        </CardBody>
                    </Collapse>
                </Card>
            </div>
        </Accordion>
    );
};
export default UserManagementAccordion;