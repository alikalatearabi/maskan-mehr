import React, {Fragment, useState} from 'react';
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Row, Col} from 'reactstrap';
import {Alerts, Btn} from '../../../../AbstractElements';
import axios from "../../../../api/axios";
import button from "../../../../CommonElements/Button";
import PersonDetails from "../PersonDetails";
import * as Converter from "persian-currency-converter";
import {useEffectOnce} from "react-use";
import {DateInputSimple} from "react-hichestan-datetimepicker";

const CreateReceiveTheDeathFile = () => {
    const token = localStorage.getItem('token')
    const UserCheckedRole = localStorage.getItem('Role');
    const UserCheckedManager = localStorage.getItem('Manager');
    const UserCheckedManagerId = localStorage.getItem('managerId');

    const [addModal, setAddModal] = useState(false);
    const addToggle = () => {
        setAddModal(!addModal);
    };

    const [managerId, setManagerId] = useState("");
    const [branchId, setBranchId] = useState("");
    const [branchManagerId, setBranchManagerId] = useState("");
    const [maskanMehrPersonId, setMaskanMehrPersonId] = useState("");
    const [contractDate, setContractDate] = useState("");
    const [contractNumber, setContractNumber] = useState("");
    const [insuranceCapital, setInsuranceCapital] = useState("");
    const [lifeInsurancePre, setLifeInsurancePre] = useState("");
    const [totalNumberOfInstallments, setTotalNumberOfInstallments] = useState("");
    const [insurancePolicyNumber, setInsurancePolicyNumber] = useState("");
    const [fileName, setFileName] = useState("");

    const [errMsg, setErrMsg] = useState('');
    const [trueMsg, setTrueMsg] = useState('');

    const [loading, setLoading] = useState(false);


    const handleAddUser = async (e) => {

        e.preventDefault();
        setLoading(true);

        if (UserCheckedManagerId) {
            setManagerId(UserCheckedManagerId)
        }

        try {
            await axios.post("/MaskanMehrInsuranceContract/Add", JSON.stringify(
                    {
                        'managerId': parseInt(managerId),
                        'branchId': parseInt(branchId),
                        'maskanMehrPersonId': parseInt(maskanMehrPersonId),
                        'contractDate': contractDate,
                        'contractNumber': parseInt(contractNumber),
                        'insuranceCapital': parseInt(insuranceCapital),
                        'lifeInsurancePremium': parseInt(lifeInsurancePre),
                        'dateOfRegistration': null,
                        'totalNumberOfInstallments': parseInt(totalNumberOfInstallments),
                        'insurancePolicyNumber': parseInt(insurancePolicyNumber),
                        'fileName': parseInt(fileName),
                    }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorize": token
                    },
                })
                .then(res => {
                    setTrueMsg(`قرارداد جدید اضافه شد`);
                    setErrMsg(null);
                    setLoading(false);

                    setManagerId('')
                    setBranchId('')
                    setMaskanMehrPersonId('')
                    setContractNumber('')
                    setInsuranceCapital('')
                    setLifeInsurancePre('')
                    setTotalNumberOfInstallments('')
                    setMaskanMehrNationalId('')
                    setInsurancePolicyNumber('')
                    setFileName('')
                })
        } catch(err){
            if (err.response) {
                setErrMsg(`فیلد هارا به درستی کامل کنید.`);
                setLoading(false);
                setTrueMsg(null);
            }
        }
    };

    const [branchIdShow, setBranchIdShow] = useState('');
    const [managerIdShow, setManagerIdShow] = useState('');

    useEffectOnce(() => {
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
    })

    const [maskanMehrNationalId, setMaskanMehrNationalId] = useState("");
    const [buttonPerson, setButtonPerson] = useState(false);

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

    const resetForm = () => {
        setTrueMsg(null);
        setErrMsg(null);
        setLoading(false);

        setManagerId('')
        setBranchId('')
        setMaskanMehrPersonId('')
        setContractNumber('')
        setInsuranceCapital('')
        setLifeInsurancePre('')
        setTotalNumberOfInstallments('')
        setMaskanMehrNationalId('')
        setInsurancePolicyNumber('')
        setFileName('')
    }

    return (
        <Fragment>
            <Btn attrBtn={{ color: 'info', className: 'badge-light', onClick: addToggle }}>افزودن جدید</Btn>
            <Modal isOpen={addModal} toggle={addToggle} size="lg">
                <ModalHeader>افزودن جدید
                    <Btn attrBtn={{ color: 'transprant', className: 'btn-close', onClick: addToggle, type: 'button', databsdismiss: 'modal', arialabel: 'Close' }}></Btn>
                </ModalHeader>
                <ModalBody>
                    <Form className="form-bookmark needs-validation">
                        <Row>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>کدملی شخص</Label>
                                    <Label className="float-end">{buttonPerson ? <PersonDetails natPerson={maskanMehrNationalId} /> : ''}</Label>
                                    <Input className="form-control input-air-primary" type="text"
                                           onChange={e =>
                                               {
                                                   setMaskanMehrNationalId(e.target.value)
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
                                           }
                                           value={maskanMehrNationalId} />
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
                                               value={insurancePolicyNumber}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>تاریخ صدور بیمه نامه</Label>
                                    <Input className="form-control input-air-primary" type="text"
                                           onChange={e => setFileName(e.target.value)}
                                           value={fileName}
                                    />
                                </FormGroup>
                            </Col>


                        </Row>
                        <Btn attrBtn={{ color: 'primary', disabled: (loading ? loading : loading), onClick: (e) => handleAddUser(e) }} >{loading ? 'درحال ایجاد...' : 'ایجاد'}</Btn>&nbsp;&nbsp;
                        <Btn attrBtn={{ color: 'danger', className: 'mx-1', onClick: addToggle }} >لغو</Btn>
                        <Btn attrBtn={{ color: 'warning', className: 'ms-2', onClick: resetForm }} >بازنشانی فرم</Btn>
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
            </Modal>
        </Fragment>
    );
};
export default CreateReceiveTheDeathFile;