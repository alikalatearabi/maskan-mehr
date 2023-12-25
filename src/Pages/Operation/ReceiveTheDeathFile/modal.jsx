import React, {Fragment, useState} from 'react';
import {ModalBody, Form, FormGroup, Input, Label, Row, Col} from 'reactstrap';
import {Alerts, Btn} from '../../../AbstractElements';
import axios from "../../../api/axios";
import PersonDetails from "./PersonDetails";
import EditReceiveTheDeathFile from "./EditReceiveTheDeathFile";
import * as Converter from "persian-currency-converter";
import {DateInputSimple} from "react-hichestan-datetimepicker";

const EditFileModal = ({idItem, idContract}) => {
    const token = localStorage.getItem('token')
    const UserCheckedRole = localStorage.getItem('Role');
    const UserCheckedManager = localStorage.getItem('Manager');
    const UserCheckedManagerId = localStorage.getItem('managerId');

    const [addModal, setAddModal] = useState(false);
    const addToggle = () => {
        setAddModal(!addModal);
        handleGetData()
    };

    const [managerId, setManagerId] = useState("");
    const [branchId, setBranchId] = useState("");
    const [branchManagerId, setBranchManagerId] = useState("");
    const [maskanMehrPersonId, setMaskanMehrPersonId] = useState("");
    const [contractDate, setContractDate] = useState("");
    const [contractNumber, setContractNumber] = useState("");
    const [insuranceCapital, setInsuranceCapital] = useState("");
    const [lifeInsurancePre, setLifeInsurancePre] = useState("");
    const [dateOfRegistration, setDateOfRegistration] = useState("");
    const [totalNumberOfInstallments, setTotalNumberOfInstallments] = useState("");
    const [maskanMehrNationalId, setMaskanMehrNationalId] = useState("");
    const [insurancePolicyNumber, setInsurancePolicyNumber] = useState("");
    const [fileName, setFileName] = useState("");

    const [branchIdShow, setBranchIdShow] = useState(false);
    const [managerIdShow, setManagerIdShow] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [trueMsg, setTrueMsg] = useState('');

    const [loading, setLoading] = useState(false);

    const handleGetData = () => {
        axios.get("/Manager/All",
            {
                headers:{
                    "Authorize": token
                }
            })
            .then(response => response.data)
            .then(res => {
                setManagerIdShow(res.map((item) => <option key={item.id} value={item.id}>{item.managerName}</option>));
            });

        axios.post("/MaskanMehrInsuranceContract/Find", parseInt(idItem),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                },
            })
            .then(response => {
                    setManagerId(response.data.managerId)
                    setBranchId(response.data.branchId)
                    setContractDate(response.data.contractDate)
                    setContractNumber(response.data.contractNumber)
                    setMaskanMehrPersonId(response.data.maskanMehrPersonId)
                    setInsuranceCapital(response.data.insuranceCapital)
                    setLifeInsurancePre(response.data.lifeInsurancePremium)
                    setDateOfRegistration(response.data.dateOfRegistration)
                    setTotalNumberOfInstallments(response.data.totalNumberOfInstallments)
                    setMaskanMehrNationalId(response.data.nationalCode)
                    setInsurancePolicyNumber(response.data.insurancePolicyNumber)
                    setFileName(response.data.fileName)
                    BranchMangerShower()
            })

    }

    const BranchMangerShower = () => {
        axios.post("/Branch/GetByManager", managerId,
            {
                headers:{
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => response.data)
            .then(res => {
                setBranchIdShow(res.map((item) => <option key={item.id} value={item.id}>{item.branchName}</option>));
            });
    }

    const handleEditFile = async (e) => {

        e.preventDefault();
        setLoading(true);

        if (UserCheckedManagerId) {
            setManagerId(UserCheckedManagerId)
        }

        try {
            await axios.put("/MaskanMehrInsuranceContract/Update", JSON.stringify(
                {
                    'managerId': parseInt(managerId),
                    'branchId': parseInt(branchId),
                    'maskanMehrPersonId': parseInt(maskanMehrPersonId),
                    'contractDate': contractDate,
                    'contractNumber': parseInt(contractNumber),
                    'insuranceCapital': parseInt(insuranceCapital),
                    'lifeInsurancePremium': parseInt(lifeInsurancePre),
                    'dateOfRegistration': dateOfRegistration,
                    'totalNumberOfInstallments': parseInt(totalNumberOfInstallments),
                    'insurancePolicyNumber': parseInt(insurancePolicyNumber),
                    'fileName': parseInt(fileName),
                    'id': parseInt(idItem),
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorize": token
                    },
                })
                .then(res => {
                    setTrueMsg(`قرارداد ویرایش گردید`);
                    setErrMsg(null);
                    setLoading(false);
                })
        } catch(err){
            if (err.response) {
                setErrMsg(`فیلد هارا به درستی کامل کنید.`);
                setLoading(false);
                setTrueMsg(null);
            }
        }
    };

    const [buttonPerson, setButtonPerson] = useState(false);

    const nationalIdChecked = (e) => {
        if (e.target.value.length === 10) {
            try {
                axios.post("/MaskanMehrPerson/FindByNationalCode", JSON.stringify(e.target.value),
                    {
                        headers:{
                            "Content-Type": "application/json",
                            "Authorize": token
                        }
                    })
                    .then(response => {
                        setButtonPerson(true)
                        setMaskanMehrPersonId(response.data.id)
                    })
            } catch (err) {
                setButtonPerson(false)
            }
        }
        else {
            setButtonPerson(false)
        }
    }


    return (
        <Fragment>
            <a onClick={addToggle} className="text-warning mx-2"><i className="icofont icofont-ui-edit"></i></a>
            <EditReceiveTheDeathFile isOpen={addModal} title="ویرایش" toggler={addToggle} size="lg">
                <ModalBody>
                    <Form className="form-bookmark needs-validation">
                        <Row>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>کدملی شخص</Label>
                                    <Label className="float-end">{buttonPerson ? <PersonDetails natPerson={maskanMehrNationalId} /> : ''}</Label>
                                    <Input className="form-control input-air-primary" type="text"
                                           value={maskanMehrNationalId}
                                           onChange={e =>
                                               {
                                                   setMaskanMehrNationalId(e.target.value);
                                                   nationalIdChecked(e)
                                               }
                                           }
                                    />
                                </FormGroup>
                            </Col>


                                {UserCheckedRole === "BranchesManager" ?
                                    <Col sm="6">
                                        <FormGroup className="col-md-12">
                                            <Label>مدیریت شعبه</Label>
                                            <h3>{UserCheckedManager}</h3>
                                        </FormGroup>
                                    </Col>
                                :
                                    <Col sm="6">
                                        <FormGroup className="col-md-12">
                                            <Label>مدیریت شعبه</Label>
                                            <Input type="select" name="select" className="form-control input-air-primary"
                                                   onChange={e => setManagerId(e.target.value)}
                                                   value={managerId}
                                            >
                                                <option key="55">انتخاب کنید</option>
                                                {managerIdShow}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                }

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>شعبه</Label>
                                    <Input type="select" name="select" className="form-control input-air-primary"
                                           onChange={e => setBranchId(e.target.value)}
                                           onClick={e => BranchMangerShower() }
                                           value={branchId}
                                    >
                                        <option key="55">انتخاب کنید</option>
                                        {branchIdShow}
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>تاریخ قرارداد</Label>
                                    <DateInputSimple
                                        className={"form-control input-air-primary"}
                                        value={contractDate}
                                        name={'myDateTime'}
                                        onChange={e => setContractDate(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>شماره قرارداد</Label>
                                    <Input className="form-control input-air-primary" type="number"
                                           min={0}
                                           onChange={e => setContractNumber(e.target.value)}
                                           value={contractNumber} />
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>سرمایه بیمه</Label>
                                    <Input className="form-control input-air-primary" type="number"
                                           min={0}
                                           onChange={e => setInsuranceCapital(e.target.value)}
                                           value={insuranceCapital}
                                    />
                                    {insuranceCapital &&
                                        Converter.threeDigitSeparator(insuranceCapital) + ' ریال '
                                    }
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>حق بیمه عمر</Label>
                                    <Input className="form-control input-air-primary" type="number"
                                           min={0}
                                           onChange={e => setLifeInsurancePre(e.target.value)}
                                           value={lifeInsurancePre}
                                    />
                                    {lifeInsurancePre &&
                                        Converter.threeDigitSeparator(lifeInsurancePre) + ' ریال '
                                    }
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>مجموع تعداد اقساط</Label>
                                    <div className="radio radio-primary">
                                        <Input className="form-control input-air-primary" type="number"
                                               min={0}
                                               onChange={e => setTotalNumberOfInstallments(e.target.value)}
                                               value={totalNumberOfInstallments} />
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>شماره بیمه نامه</Label>
                                    <div className="radio radio-primary">
                                        <Input className="form-control input-air-primary" type="text"
                                               onChange={e => setInsurancePolicyNumber(e.target.value)}
                                               value={insurancePolicyNumber} />
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>تاریخ صدور بیمه نامه</Label>
                                    <div className="radio radio-primary">
                                        <Input className="form-control input-air-primary" type="text"
                                               onChange={e => setFileName(e.target.value)}
                                               value={fileName}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>


                        </Row>
                        <Btn attrBtn={{ color: 'primary', disabled: (loading ? loading : loading), onClick: (e) => handleEditFile(e) }} >{loading ? 'درحال ویرایش...' : 'ویرایش'}</Btn>&nbsp;&nbsp;
                        <Btn attrBtn={{ color: 'danger', className: 'mx-1', onClick: addToggle }} >لغو</Btn>
                        <Col className='mt-3'>
                            {errMsg &&
                                <Alerts attrAlert={{ color: 'danger' }}>
                                    {errMsg}
                                </Alerts>
                            }
                            {trueMsg &&
                                <Alerts attrAlert={{ color: 'success' }}>
                                    {trueMsg}
                                </Alerts>
                            }
                        </Col>
                    </Form>
                </ModalBody>
            </EditReceiveTheDeathFile>
        </Fragment>
    );
};
export default EditFileModal;