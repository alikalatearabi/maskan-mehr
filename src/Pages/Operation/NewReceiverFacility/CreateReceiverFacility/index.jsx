import React, { Fragment, useState } from 'react';
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Row, Col} from 'reactstrap';
import {Alerts, Btn} from '../../../../AbstractElements';
import axios from "../../../../api/axios";
import {DateInputSimple} from 'react-hichestan-datetimepicker';

const CreateNewReceiverFacility = () => {
    const token = localStorage.getItem('token')

    const [addModal, setaddModal] = useState(false);
    const addToggle = () => {
        setaddModal(!addModal);
    };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [identity, setIdentity] = useState("");
    const [nationalCode, setNationalCode] = useState("");
    const [birthDate, setBirthDate] = useState();
    const [fatherName, setFatherName] = useState("");
    const [issuance, setIssuance] = useState("");
    const [issueDate, setIssueDate] = useState();
    const [telephoneNumber, setTelephoneNumber] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [civilRegistrationConfirmation, setCivilRegistrationConfirmation] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [trueMsg, setTrueMsg] = useState('');

    const [loading, setLoading] = useState(false);
    const [nationalCodeChecked, setNationalCodeChecked] = useState(false);


    const handleAddUser = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {
            await axios.post("/MaskanMehrPerson/Add", JSON.stringify(
                    {
                        'firstName': firstName,
                        'lastName': lastName,
                        'identity': identity,
                        'nationalCode': nationalCode,
                        'birthDate': birthDate,
                        'fatherName': fatherName,
                        'issuance': issuance,
                        'issueDate': issueDate,
                        'telephoneNumber': telephoneNumber,
                        'mobileNumber': mobileNumber,
                        'civilRegistrationConfirmation': civilRegistrationConfirmation,
                    }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorize": token
                    },
                })
                .then(res => {
                    setTrueMsg(`کاربر جدید با نام ${firstName ? firstName : ''} ${lastName} اضافه شد`
                    +
                        ' | ' +
                        `شناسه مسکن مهر کاربر : ${res.data}`
                    );
                    setErrMsg(null);
                    setLoading(false);

                    setFirstName("")
                    setLastName("")
                    setIdentity("")
                    setNationalCode("")
                    setBirthDate()
                    setFatherName("")
                    setIssuance("")
                    setIssueDate()
                    setTelephoneNumber("")
                    setMobileNumber("")
                    setCivilRegistrationConfirmation()
                })
        } catch(err){
            if (err.response) {
                setErrMsg(`فیلد هارا به درستی کامل کنید.`);
                setLoading(false);
                setTrueMsg(null);
            }
        }
    };


    const resetForm = () => {
        setErrMsg(null);
        setTrueMsg(null);
        setLoading(false);

        setFirstName("")
        setLastName("")
        setIdentity("")
        setNationalCode("")
        setBirthDate()
        setFatherName("")
        setIssuance("")
        setIssueDate()
        setTelephoneNumber("")
        setMobileNumber("")
        setCivilRegistrationConfirmation()
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
                                    <Label>نام</Label>
                                    <Input className="form-control input-air-primary" type="text" required=""
                                           onChange={e => setFirstName(e.target.value)}
                                           value={firstName} />
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>نام خانوادگی</Label>
                                    <Input className="form-control input-air-primary" type="text" required=""
                                           onChange={e => setLastName(e.target.value)}
                                           value={lastName} />
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>شماره شناسنامه</Label>
                                    <Input className="form-control input-air-primary" type="text" required=""
                                           onChange={e => setIdentity(e.target.value)}
                                           value={identity}
                                           maxLength={10}
                                    />
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>کد ملی</Label>
                                    <Input className="form-control input-air-primary" type="text"
                                           onChange={e => setNationalCode(e.target.value)}
                                           value={nationalCode}
                                           maxLength={10}
                                           onKeyUp={e =>
                                               axios.post("/MaskanMehrPerson/IsPersonExistByNationalCode", nationalCode,
                                                   {
                                                       headers: {
                                                           "Content-Type": "application/json",
                                                           "Authorize": token
                                                       },
                                                   })
                                                   .then(response => {
                                                       if (response.data) {
                                                           setNationalCodeChecked(true)
                                                       } else if (!response.data) {
                                                           setNationalCodeChecked(false)
                                                       }
                                                    })
                                           }
                                    />
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>تاریخ تولد</Label>
                                    <DateInputSimple
                                        className={"form-control input-air-primary"}
                                        value={birthDate}
                                        name={'myDateTime'}
                                        onChange={e => setBirthDate(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>نام پدر</Label>
                                    <Input className="form-control input-air-primary" type="text" required=""
                                           onChange={e => setFatherName(e.target.value)}
                                           value={fatherName} />
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>صدور</Label>
                                    <Input className="form-control input-air-primary" type="text" required=""
                                           onChange={e => setIssuance(e.target.value)}
                                           value={issuance} />
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>تاریخ صدور</Label>
                                    <DateInputSimple
                                        className={"form-control input-air-primary"}
                                        value={issueDate}
                                        name={'myDateTime'}
                                        onChange={e => setIssueDate(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>شماره تلفن</Label>
                                    <Input className="form-control input-air-primary" type="text" required=""
                                           onChange={e => setTelephoneNumber(e.target.value)}
                                           value={telephoneNumber}
                                           maxLength={11}
                                    />
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>شماره موبایل</Label>
                                    <Input className="form-control input-air-primary" type="text" required=""
                                           onChange={e => setMobileNumber(e.target.value)}
                                           value={mobileNumber}
                                           maxLength={11}
                                    />
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>تاییدیه ثبت احوال</Label>
                                    <Row className="col-6">
                                        <Col className="col-6">
                                            <div className="radio radio-primary">
                                                <Input id="radio11" type="radio" name="radio1"
                                                       value="1"
                                                       onClick={e => setCivilRegistrationConfirmation(false)}
                                                />
                                                <Label for="radio11">ندارد</Label>
                                            </div>
                                        </Col>
                                        <Col className="col-6">
                                            <div className="radio radio-primary">
                                                <Input id="radio12" type="radio" name="radio1"
                                                       value="2"
                                                       defaultChecked
                                                       onClick={e => setCivilRegistrationConfirmation(true)}
                                                />
                                                <Label for="radio12">دارد</Label>
                                            </div>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>

                        </Row>
                        <Btn attrBtn={{ color: 'primary', disabled: (loading ? loading : nationalCodeChecked ? nationalCodeChecked : loading), onClick: (e) => handleAddUser(e) }} >{loading ? 'درحال ایجاد...' : nationalCodeChecked ? 'این کد ملی از قبل موجود است' : 'ایجاد'}</Btn>&nbsp;&nbsp;
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
export default CreateNewReceiverFacility;