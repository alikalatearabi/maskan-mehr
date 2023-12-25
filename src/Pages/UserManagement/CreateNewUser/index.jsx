import React, {Fragment, useState} from 'react';
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Row, Col} from 'reactstrap';
import {Alerts, Btn} from '../../../AbstractElements';
import axios from "../../../api/axios";

const CreateNewUser = ({handleGet}) => {
    const token = localStorage.getItem('token')

    const [addModal, setaddModal] = useState(false);
    const addToggle = () => {
        setaddModal(!addModal);
        showDrop()
    };


    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState(null);
    const [managerId, setManagerId] = useState(null);
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState(55);

    const [getRole, setGetRole] = useState();
    const [getManagerId, setGetManagerId] = useState();

    const [errMsg, setErrMsg] = useState(false);
    const [trueMsg, setTrueMsg] = useState(false);
    const [userNameMsg, setUserNameMsg] = useState(false);
    const [passwordMsg, setPasswordMsg] = useState(false);

    const [loading, setLoading] = useState(false);
    const [disableAttr, setDisableAttr] = useState(false);


    const handleAddUser = (e) => {

        e.preventDefault();
        setLoading(true);
        axios.post("/User/Create", JSON.stringify(
                {
                    'userName': userName,
                    'password': password,
                    'firstName': firstName,
                    'managerId': parseInt(managerId),
                    'lastName': lastName,
                    'role': parseInt(role),
                }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                },
            })
            .then(res => {
                setTrueMsg(`کاربر جدید با نام ${firstName ? firstName : ''} ${lastName} ثبت گردید`);
                setErrMsg(null);
                setLoading(false);
                setUserName('');
                setPassword('');
                setFirstName('');
                setManagerId('');
                setLastName('');
                setRole(55);
                handleGet()
            })
            .catch(err => {
                if (err.request.status.code === 204 || err.response.status.code === 204 || err.status.code === 204) {
                    setTrueMsg(`کاربر جدید با نام ${firstName ? firstName : ''} ${lastName} ثبت گردید`);
                    setErrMsg(null);
                    setLoading(false);
                    setUserName('');
                    setPassword('');
                    setFirstName('');
                    setManagerId('');
                    setLastName('');
                    setRole(55);
                    handleGet()
                } else if (err.response) {
                    setErrMsg(`فیلد هارا به درستی کامل کنید.`);
                    setLoading(false);
                    setTrueMsg(null);
                }
            })
    };

    const showDrop = () => {
        axios.get("/Manager/All",
            {
                headers: {
                    "Authorize": token,
                    "Content-Type": "text/plain"
                },
            })
            .then(res => {
                setGetManagerId(res.data.map((item) => <option
                    key={item.id}
                    value={item.id}>{item.managerName}</option>));
            });

        axios.get("/User/GetRoles",
            {
                headers: {
                    "Authorize": token,
                    "Content-Type": "text/plain"
                },})
            .then(response => response.data)
            .then(res => {
                setGetRole(res.map((item) => <option
                    key={item.id}
                    value={item.id}>{item.value}</option>));
            });
    }

    const resetForm = () => {
        setErrMsg(null);
        setPasswordMsg(null);
        setUserNameMsg(null);
        setTrueMsg(null);
        setLoading(false);
        setUserName('');
        setPassword('');
        setFirstName('');
        setManagerId('');
        setLastName('');
        setRole(55);
    }

    const validPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");

    const checkedPassFalse = () => {
        setPasswordMsg(`قوانین رمز عبور را رعایت کنید.`);
        setDisableAttr(true);
    };

    const checkedPassTrue = () => {
        setPasswordMsg(null)
        setDisableAttr(false);
    };

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
                                    <Label>نام کاربری</Label>
                                    <Input className="form-control input-air-primary" type="text"
                                           onChange={e => setUserName(e.target.value)}
                                           value={userName}
                                           onKeyUp={
                                               async () => {
                                                   await axios.post("/User/IsUserExist/", userName,
                                                       {
                                                           headers: {
                                                               "Content-Type": "application/json",
                                                               "Authorize": token
                                                           },
                                                       })
                                                       .then(res => {
                                                           setDisableAttr(true)
                                                           setUserNameMsg(true)
                                                       }).catch(
                                                           (err) => {
                                                               setUserNameMsg(false)
                                                               setDisableAttr(false)
                                                           })
                                               }}
                                    />
                                    {userNameMsg &&
                                        <span className="my-5">
                                                    کاربری با نام کاربری {userName} وجود دارد.
                                                </span>
                                    }
                                </FormGroup>
                            </Col>
                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>رمزعبور</Label>
                                    <Input className="form-control input-air-primary" type="text"
                                           onChange={e => setPassword(e.target.value)}
                                           value={password}
                                           onKeyUp=
                                               {e =>
                                               {
                                                   !validPassword.test(password)
                                                       ?
                                                       checkedPassFalse()
                                                       :
                                                       checkedPassTrue()
                                               }
                                               }
                                    />
                                    {passwordMsg &&
                                        <span className="my-5">
                                                    رمز عبور شما حداقل باید 8 رقم و شامل یک حرف بزرگ (a-z)، حرف کوچک (A-Z)، عدد (0-9) و حروف استثنایی (!@#$%...) باشد.
                                                </span>
                                    }
                                </FormGroup>
                            </Col>
                            <Col sm="6">
                                <FormGroup className="col-md-12">
                                    <Label>سطع دسترسی</Label>
                                    <Input type="select" name="select" className="form-control input-air-primary"
                                           onChange={e => setRole(e.target.value)}
                                           value={role}
                                        >
                                        <option value={55} key="55">انتخاب کنید</option>
                                        {getRole}
                                    </Input>
                                </FormGroup>
                            </Col>
                            {parseInt(role) === 2 &&
                                <Col sm="6">
                                    <FormGroup className="col-md-12">
                                        <Label>استان</Label>
                                        <Input type="select" name="select" className="form-control input-air-primary"
                                               onChange={e => setManagerId(e.target.value)}
                                               value={managerId}
                                            >
                                            <option key="55">انتخاب کنید</option>
                                            {getManagerId}
                                        </Input>
                                    </FormGroup>
                                </Col>
                            }
                        </Row>
                        <Btn attrBtn={{ color: 'primary', className: 'me-1', disabled: (loading ? loading : loading || disableAttr ? disableAttr : disableAttr), onClick: (e) => handleAddUser(e) }} >{loading ? 'درحال ایجاد...' : disableAttr ? 'خطاهارا برطرف نمایید.' : 'ایجاد'}</Btn>&nbsp;&nbsp;
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
export default CreateNewUser;