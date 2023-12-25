import {Alerts, Btn, ToolTip} from '../../AbstractElements';
import React, {Fragment, useState} from 'react';
import {Card, CardBody, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import ModalSetupEditUser from "./EditUser";
import axios from "../../api/axios";


const UserManagementModal = ({handleGet, idUserForEdit}) => {
    const token = localStorage.getItem('token');

    const [basictooltip, setbasictooltip] = useState(false);
    const toggle = () => setbasictooltip(!basictooltip);

    const [Large, setLarge] = useState(false);

    const LargeModaltoggle = () => {
        setLarge(!Large);
        showDrop()
    }

    const [userNameCheck, setUserNameCheck] = useState('');

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [managerId, setManagerId] = useState();
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState();

    const [getRole, setGetRole] = useState();
    const [getManagerId, setGetManagerId] = useState();

    const [errMsg, setErrMsg] = useState(false);
    const [trueMsg, setTrueMsg] = useState(false);
    const [userNameMsg, setUserNameMsg] = useState(false);
    const [passwordMsg, setPasswordMsg] = useState(false);

    const [loading, setLoading] = useState(false);
    const [disableAttr, setDisableAttr] = useState(false);


    const handleEditUser = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {
            await axios.put("/User/Update", JSON.stringify(
                    {
                        'userName': userName,
                        'password': password,
                        'firstName': firstName,
                        'managerId': parseInt(managerId),
                        'lastName': lastName,
                        'role': parseInt(role),
                        'id': parseInt(idUserForEdit),
                    }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorize": token
                    },
                })
                .then(res => {
                    setTrueMsg(`کاربر با آیدی ${idUserForEdit} با موفقیت ویرایش گردید`);
                    setErrMsg(null);
                    setLoading(false);
                    handleGet()
                })
        } catch(err){
            if (err.request.status.code === 204 || err.response.status.code === 204 || err.status.code === 204) {
                setTrueMsg(`کاربر جدید با نام ${firstName ? firstName : ''} ${lastName} ثبت گردید`);
                setErrMsg(null);
                setLoading(false);
                setUserName('');
                setPassword('');
                setFirstName('');
                setManagerId('');
                setLastName('');
                setRole(null);
                handleGet()
            } else if (err) {
                setErrMsg(`فیلد هارا به درستی کامل کنید.`);
                setLoading(false);
                setTrueMsg(null);
            }
        }
    };

    const handleGetDd = async (e) => {
        try {
            await axios.post("/User/Find/", idUserForEdit,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorize": token
                    }
                })
                .then(response => {
                    setUserNameCheck(response.data.userName)

                    setUserName(response.data.userName)
                    setFirstName(response.data.firstName)
                    setManagerId(response.data.managerId)
                    setLastName(response.data.lastName)
                    setRole(response.data.roleId)
                })
        } catch(err){
            if (err.response.status === 404) {
                // console.log(err);
            } else if (err.response.status === 415) {
                // console.log("401");
                // console.log(err);
            } else {
                // console.log(err);
            }
        }
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
            <Btn attrBtn={{ color: 'primary', size: 'sm', onClick: LargeModaltoggle, onFocus: handleGetDd }}><i className="icofont icofont-edit" ></i></Btn>
            <ModalSetupEditUser isOpen={Large} title="ویرایش" toggler={LargeModaltoggle} size="xl">

                <Col sm="12">
                    <Card>
                        <CardBody>
                            <Form className="form-bookmark needs-validation">
                                <Row>
                                    <Col sm="6">
                                        <FormGroup className="col-md-12">
                                            <Label>نام</Label>
                                            <Input className="form-control input-air-primary" type="text"
                                                   onChange={e => setFirstName(e.target.value)}
                                                   value={firstName}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col sm="6">
                                        <FormGroup className="col-md-12">
                                            <Label>نام خانوادگی</Label>
                                            <Input className="form-control input-air-primary" type="text"
                                                   onChange={e => setLastName(e.target.value)}
                                                   value={lastName}
                                            />
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
                                                                   if (userNameCheck === userName){
                                                                       setDisableAttr(false)
                                                                       setUserNameMsg(false)
                                                                   } else {
                                                                       setDisableAttr(true)
                                                                       setUserNameMsg(true)
                                                                   }
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
                                            <a id='TooltipExample'><i className="icofont icofont-question-circle"></i></a>
                                            <ToolTip
                                                attrToolTip={{
                                                    placement: 'top',
                                                    isOpen: basictooltip,
                                                    target: 'TooltipExample',
                                                    toggle: toggle
                                                }} >
                                                در صورتی که نمیخواهید رمز عبور تغییر کند آن را خالی بگذارید.
                                            </ToolTip>
                                            <Input className="form-control input-air-primary" type="text"
                                                   onChange={e => setPassword(e.target.value)}
                                                   placeholder={""}
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
                                                <option key="55">انتخاب کنید</option>
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
                                <Btn attrBtn={{ color: 'primary', className: 'me-1', disabled: (loading ? loading : loading || disableAttr ? disableAttr : disableAttr), onClick: (e) => handleEditUser(e) }} >{loading ? 'درحال ویرایش...' : disableAttr ? 'خطاهارا برطرف نمایید.' : 'ویرایش'}</Btn>&nbsp;&nbsp;
                                <Btn attrBtn={{ color: 'danger', onClick: LargeModaltoggle }} >لغو</Btn>
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
                        </CardBody>
                    </Card>
                </Col>

            </ModalSetupEditUser>
        </Fragment>
    );
};
export default UserManagementModal;
