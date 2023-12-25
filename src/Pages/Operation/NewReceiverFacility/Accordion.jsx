import {Btn, H5} from '../../../AbstractElements';
import React, {useState} from 'react';
import { Accordion } from 'react-bootstrap'
import {Card, CardBody, CardHeader, Col, Collapse, Form, Row} from 'reactstrap';

const NewReceiverFacilityAccordion = ({handleGetNationalId, handleGetFullName}) => {

    const [nationalIdSearchRes, setNationalIdSearchRes] = useState();
    const [firstNameSearchRes, setFirstNameSearchRes] = useState();
    const [lastNameSearchRes, setLastNameSearchRes] = useState();
    const [danger, setDanger] = useState(false);

    const [isOpen, setIsOpen] = useState(1);
    const toggle = (id) => (isOpen === id ? setIsOpen(null) : setIsOpen(id));

    const checkedFiled = (e) => {
        if (e.length <= 0){
            setDanger(false)
        } else if (e.length <= 9) {
            setDanger(true)
        } else {
            setDanger(false)
        }
    }

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
                                            <Col md="4 mb-4">
                                                <input className="form-control input-air-primary" name="lastName" type="text" placeholder="نام"
                                                    onChange={e => setFirstNameSearchRes(e.target.value)}
                                                    value={firstNameSearchRes}
                                                />
                                            </Col>
                                            <Col md="4 mb-4">
                                                <input className="form-control input-air-primary" name="lastName" type="text" placeholder="نام خانوادگی"
                                                    onChange={e => setLastNameSearchRes(e.target.value)}
                                                    value={lastNameSearchRes}
                                                />
                                            </Col>
                                            <Col md="4 mb-4">
                                                <input className={danger ? "form-control border-danger" : "form-control input-air-primary"} name="lastName" type="text" placeholder="کد ملی"
                                                   onChange={e => {
                                                       setNationalIdSearchRes(e.target.value)
                                                       checkedFiled(e.target.value)
                                                   }}
                                                   value={nationalIdSearchRes}
                                                   maxLength={10}
                                                />
                                            </Col>
                                        </Row>
                                        <div className={"text-center mt-2"}>
                                            { nationalIdSearchRes && firstNameSearchRes ?
                                                <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                : nationalIdSearchRes && firstNameSearchRes && lastNameSearchRes ?
                                                    <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                    : !firstNameSearchRes && lastNameSearchRes ?
                                                        <Btn attrBtn={{color: 'primary', disabled: true}}>نام و نام خانوادگی را باهم وارد کنید</Btn>
                                                        : firstNameSearchRes && !lastNameSearchRes ?
                                                            <Btn attrBtn={{color: 'primary', disabled: true}}>نام و نام خانوادگی را باهم وارد کنید</Btn>
                                                            : firstNameSearchRes && lastNameSearchRes ?
                                                                <Btn attrBtn={{ color: 'primary', onClick: (e) => handleGetFullName(e, firstNameSearchRes, lastNameSearchRes) }} >جستجو</Btn>
                                                                : nationalIdSearchRes ?
                                                                    <Btn attrBtn={{ color: 'primary', onClick: (e) => handleGetNationalId(e, nationalIdSearchRes) }} >جستجو</Btn>
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
export default NewReceiverFacilityAccordion;