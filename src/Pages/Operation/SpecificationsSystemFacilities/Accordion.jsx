import {Btn, H5} from '../../../AbstractElements';
import React, {useState} from 'react';
import { Accordion } from 'react-bootstrap'
import {Card, CardBody, CardHeader, Col, Collapse, Form, Row} from 'reactstrap';

const SpecificationsSystemFacilitiesAccordion = ({handleGetNumberContract, handleGetTrackingCode, handleGetFullName, handleGetNationalCode, handleGetNumberFile}) => {

    const [nameFiledSearch, setNameFiledSearch] = useState('');
    const [lastNameFiledSearch, setLastNameFiledSearch] = useState('');

    const [nationalCodeFiledSearch, setNationalCodeFiledSearch] = useState('');

    const [trackingCodeFiledSearch, setTrackingCodeFiledSearch] = useState('');

    const [numberContractFiledSearch, setNumberContractFiledSearch] = useState('');

    const [numberFileFiledSearch, setNumberFileFiledSearch] = useState('');

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
                                                       onChange={e => setNameFiledSearch(e.target.value)}
                                                       value={nameFiledSearch}
                                                />
                                            </Col>
                                            <Col md="4 mb-4">
                                                <input className="form-control input-air-primary" name="lastName" type="text" placeholder="نام خانوادگی"
                                                       onChange={e => setLastNameFiledSearch(e.target.value)}
                                                       value={lastNameFiledSearch}
                                                />
                                            </Col>

                                            <Col md="4 mb-4">
                                                <input className={danger ? "form-control border-danger" : "form-control input-air-primary"} name="numberContract" type="text" placeholder="کدملی"
                                                       onChange={e => {
                                                           setNationalCodeFiledSearch(e.target.value)
                                                           checkedFiled(e.target.value)
                                                       }}
                                                       value={nationalCodeFiledSearch}
                                                       maxLength={10}
                                                />
                                            </Col>

                                            <Col md="4 mb-4">
                                                <input className="form-control input-air-primary" name="nationalId" type="number" placeholder="کد پیگیری"
                                                       onChange={e => setTrackingCodeFiledSearch(e.target.value)}
                                                       value={trackingCodeFiledSearch}
                                                       min={0}
                                                />
                                            </Col>

                                            <Col md="4 mb-4">
                                                <input className="form-control input-air-primary" name="numberContract" type="number" placeholder="شماره قرارداد"
                                                       onChange={e => setNumberContractFiledSearch(e.target.value)}
                                                       value={numberContractFiledSearch}
                                                       min={0}
                                                />
                                            </Col>

                                            <Col md="4 mb-4">
                                                <input className="form-control input-air-primary" name="numberContract" type="text" placeholder="شماره پرونده"
                                                       onChange={e => setNumberFileFiledSearch(e.target.value)}
                                                       value={numberFileFiledSearch}
                                                       min={0}
                                                />
                                            </Col>

                                        </Row>
                                        <div className={"text-center mt-2"}>
                                            { trackingCodeFiledSearch && numberContractFiledSearch ?
                                                <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                : nameFiledSearch && lastNameFiledSearch && trackingCodeFiledSearch ?
                                                    <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                        : nameFiledSearch && lastNameFiledSearch && numberContractFiledSearch ?
                                                        <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                            : nameFiledSearch && lastNameFiledSearch && numberFileFiledSearch ?
                                                            <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                                : nameFiledSearch && lastNameFiledSearch && nationalCodeFiledSearch ?
                                                                <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                                    : numberFileFiledSearch && nationalCodeFiledSearch ?
                                                                    <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                                        : numberFileFiledSearch && trackingCodeFiledSearch ?
                                                                        <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                                            : numberContractFiledSearch && nationalCodeFiledSearch ?
                                                                            <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                                                : numberFileFiledSearch && numberContractFiledSearch ?
                                                                                <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                                                    : trackingCodeFiledSearch && nationalCodeFiledSearch ?
                                                                                    <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک نوع فیلد را جستجو کنید</Btn>
                                                                                        : !nameFiledSearch && lastNameFiledSearch ?
                                                                                        <Btn attrBtn={{color: 'primary', disabled: true}}>نام و نام خانوادگی را باهم وارد کنید</Btn>
                                                                                            : nameFiledSearch && !lastNameFiledSearch ?
                                                                                            <Btn attrBtn={{color: 'primary', disabled: true}}>نام و نام خانوادگی را باهم وارد کنید</Btn>
                                                                                                : trackingCodeFiledSearch ?
                                                                                                <Btn attrBtn={{ color: 'primary', onClick: (e) => handleGetTrackingCode(e, trackingCodeFiledSearch) }} >جستجو</Btn>
                                                                                                    : nameFiledSearch && nameFiledSearch ?
                                                                                                    <Btn attrBtn={{ color: 'primary', onClick: (e) => handleGetFullName(e, nameFiledSearch, lastNameFiledSearch) }} >جستجو</Btn>
                                                                                                        : numberContractFiledSearch ?
                                                                                                        <Btn attrBtn={{ color: 'primary', onClick: (e) => handleGetNumberContract(e, numberContractFiledSearch) }} >جستجو</Btn>
                                                                                                            : nationalCodeFiledSearch ?
                                                                                                            <Btn attrBtn={{ color: 'primary', onClick: (e) => handleGetNationalCode(e, nationalCodeFiledSearch) }} >جستجو</Btn>
                                                                                                                : numberFileFiledSearch ?
                                                                                                                <Btn attrBtn={{ color: 'primary', onClick: (e) => handleGetNumberFile(e, numberFileFiledSearch) }} >جستجو</Btn>
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
export default SpecificationsSystemFacilitiesAccordion;