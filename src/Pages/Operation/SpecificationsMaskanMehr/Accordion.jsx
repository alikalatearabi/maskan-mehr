import {Btn, H5} from '../../../AbstractElements';
import React, {useState} from 'react';
import { Accordion } from 'react-bootstrap'
import {Card, CardBody, CardHeader, Col, Collapse, Form, Row} from 'reactstrap';

const SpecificationsMaskanMehrAccordion = ({handleGetNumberContract, handleGetNationalId, handleGetFullName}) => {

    const [nameFiledSearch, setNameFiledSearch] = useState('');
    const [lastNameFiledSearch, setLastNameFiledSearch] = useState('');

    const [nationalIdFiledSearch, setNationalIdFiledSearch] = useState('');

    const [numberContractFiledSearch, setNumberContractFiledSearch] = useState('');

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
                                            <Col md="3 mb-3">
                                                <input className="form-control input-air-primary" name="lastName" type="text" placeholder="نام"
                                                       onChange={e => setNameFiledSearch(e.target.value)}
                                                       value={nameFiledSearch}
                                                />
                                            </Col>
                                            <Col md="3 mb-3">
                                                <input className="form-control input-air-primary" name="lastName" type="text" placeholder="نام خانوادگی"
                                                       onChange={e => setLastNameFiledSearch(e.target.value)}
                                                       value={lastNameFiledSearch}
                                                />
                                            </Col>

                                            <Col md="3 mb-3">
                                                <input className={danger ? "form-control border-danger" : "form-control input-air-primary"} name="nationalId" type="text" placeholder="کد ملی"
                                                   onChange={e => {
                                                       setNationalIdFiledSearch(e.target.value)
                                                       checkedFiled(e.target.value)
                                                   }}
                                                   value={nationalIdFiledSearch}
                                                   maxLength={10}
                                                />
                                            </Col>
                                            <Col md="3 mb-3">
                                                <input className="form-control input-air-primary" name="numberContract" type="number" placeholder="شماره قرارداد"
                                                       onChange={e => setNumberContractFiledSearch(e.target.value)}
                                                       value={numberContractFiledSearch}
                                                       min={0}
                                                />
                                            </Col>
                                        </Row>
                                        <div className={"text-center mt-2"}>
                                            { nationalIdFiledSearch && numberContractFiledSearch ?
                                                <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                : nameFiledSearch && lastNameFiledSearch && nationalIdFiledSearch ?
                                                    <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                    : nameFiledSearch && lastNameFiledSearch && numberContractFiledSearch ?
                                                        <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                        : !nameFiledSearch && lastNameFiledSearch ?
                                                            <Btn attrBtn={{color: 'primary', disabled: true}}>نام و نام خانوادگی را باهم وارد کنید</Btn>
                                                            : nameFiledSearch && !lastNameFiledSearch ?
                                                                <Btn attrBtn={{color: 'primary', disabled: true}}>نام و نام خانوادگی را باهم وارد کنید</Btn>
                                                                : nationalIdFiledSearch ?
                                                                    <Btn attrBtn={{ color: 'primary', onClick: (e) => handleGetNationalId(e, nationalIdFiledSearch) }} >جستجو</Btn>
                                                                    : nameFiledSearch && nameFiledSearch ?
                                                                        <Btn attrBtn={{ color: 'primary', onClick: (e) => handleGetFullName(e, nameFiledSearch, lastNameFiledSearch) }} >جستجو</Btn>
                                                                        : handleGetNumberContract ?
                                                                            <Btn attrBtn={{ color: 'primary', onClick: (e) => handleGetNumberContract(e, numberContractFiledSearch) }} >جستجو</Btn>
                                                                        :
                                                                            <Btn attrBtn={{color: 'primary', disabled: true }}>جستجو</Btn>
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
export default SpecificationsMaskanMehrAccordion;