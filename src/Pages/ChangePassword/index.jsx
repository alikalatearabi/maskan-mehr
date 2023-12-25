import React, {Fragment, useState} from 'react';
import Breadcrumbs from '../../CommonElements/Breadcrumbs';
import {Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Form} from "reactstrap";
import {Alerts, Btn} from "../../AbstractElements";
import axios from "../../api/axios";

const ChangePassword = () => {

    const token = localStorage.getItem('token')

    const [errMsg, setErrMsg] = useState('')

    const [trueMsg, setTrueMsg] = useState('')

    const [loading, setLoading] = useState(false);

    const [passwordFirst, setPasswordFirst] = useState();
    const [passwordLast, setPasswordLast] = useState();


    const changePassword = async (e) => {

        e.preventDefault();
        setLoading(true);

        if (passwordFirst !== passwordLast) {
            setErrMsg(`رمزها یکسان نیستند.`);
            setLoading(false);
            setTrueMsg(null);
        } else {
            try {
                await axios.post("/Account/ChangePassword", passwordFirst,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorize": token
                        },
                    })
                    .then(res => {
                        setTrueMsg(`رمزعبور شما با موفقیت تغییر یافت`);
                        setErrMsg(null);
                        setLoading(false);
                    })
            } catch(err){
                if (err) {
                    setErrMsg(`مشکلی پیش آمده، دوباره امتحان کنید..`);
                    setLoading(false);
                    setTrueMsg(null);
                }
            }
        }

    }

    const resetForm = (e) => {
        setPasswordFirst('');
        setPasswordLast('');
        setErrMsg(null);
        setLoading(false);
        setTrueMsg(null);
    }

    const validPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");

    const checkedPassFalse = () => {
        setErrMsg(`قوانین رمز عبور را رعایت کنید.`);
        setTrueMsg(null);
        setLoading(false);
    };

    const checkedPassTrue = () => {
        setErrMsg(null);
        setLoading(false);
    };

    return (
        <Fragment>
            <Breadcrumbs parent="عملیات حساب" title="تغییر رمزعبور" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <Form className="form-bookmark needs-validation">
                                    <Row>
                                        <span className="text-center my-5">
                                            رمز عبور شما حداقل باید 8 رقم و شامل یک حرف بزرگ (a-z)، حرف کوچک (A-Z)، عدد (0-9) و حروف استثنایی (!@#$%...) باشد.
                                        </span>
                                        <Col sm="12">
                                            <FormGroup className="col-md-6 mx-auto">
                                                <Label>رمز عبور جدید</Label>
                                                <Input type="text" name="text" className="form-control input-air-primary"
                                                   onChange={e => setPasswordFirst(e.target.value)}
                                                   value={passwordFirst}
                                                   onKeyUp=
                                                       {e =>
                                                       {
                                                           !validPassword.test(passwordFirst)
                                                           ?
                                                               checkedPassFalse()
                                                           :
                                                               checkedPassTrue()
                                                       }
                                                   }
                                                >
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12">
                                            <FormGroup className="col-md-6 mx-auto">
                                                <Label>تکرار رمز عبور</Label>
                                                <Input type="text" name="text" className="form-control input-air-primary"
                                                       onChange={e => setPasswordLast(e.target.value)}
                                                       value={passwordLast}
                                                >
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12">
                                            <Col className="col-md-6 mx-auto text-center">
                                                <Btn attrBtn={{ color: 'primary', className: 'me-1', disabled: loading ? loading : loading, onClick: (e) => changePassword(e) }} >{loading ? 'درحال تغییر رمز...' : 'تغییر رمز'}</Btn>&nbsp;&nbsp;
                                                <Btn attrBtn={{ color: 'danger', onClick: resetForm }} >بازنشانی فرم</Btn>
                                            </Col>
                                            <Col className='col-md-6 mx-auto mt-3'>
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
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default ChangePassword;