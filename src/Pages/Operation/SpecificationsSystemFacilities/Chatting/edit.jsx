import React, {Fragment, useState} from 'react';
import ModalSetupEditChat from "./EditChat";
import {CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";
import axios from "../../../../api/axios";
import {Alerts, Btn} from "../../../../AbstractElements";
import {useEffectOnce} from "react-use";
import {DateInputSimple} from "react-hichestan-datetimepicker";

const EditChatModal = ({ChatTable, idTracking, idItem, senderNamePer, reciverNamePer, correspondenceTypePer, letterNumberPer, letterDatetimePer, secretariatLetterDatetimePer }) => {

    const [Large, setLarge] = useState(false);
    const LargeModaltoggle = () => setLarge(!Large);

    const token = localStorage.getItem("token")

    const [senderShow, setSenderShow] = useState()
    const [receiverShow, setReceiverShow] = useState()
    const [correspondenceTypeShow, setCorrespondenceTypeShow] = useState()

    const [correspondenceType, setCorrespondenceType] = useState();
    const [sender, setSender] = useState();
    const [receiver, setReceiver] = useState();
    const [letterNumber, setLetterNumber] = useState('');
    const [letterDatetime, setLetterDatetime] = useState();
    const [secretariatLetterDatetime, setSecretariatLetterDatetime] = useState(null);

    const [errMsg, setErrMsg] = useState('')
    const [trueMsg, setTrueMsg] = useState('')

    const [loading, setLoading] = useState('')

    useEffectOnce(() => {
        setCorrespondenceType(correspondenceTypePer)
        setSender(senderNamePer)
        setReceiver(reciverNamePer)
        setLetterNumber(letterNumberPer)
        setLetterDatetime(letterDatetimePer)
        setSecretariatLetterDatetime(secretariatLetterDatetimePer)


        axios.get("/Correspondence/GetCorrespondenceUser",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setSenderShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });

        axios.get("/Correspondence/GetCorrespondenceType",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setCorrespondenceTypeShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });

        axios.get("/Correspondence/GetCorrespondenceUser",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setReceiverShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });

    })


    const ChatUpdate = (e) => {

        e.preventDefault()
        if (secretariatLetterDatetime === "") {
            axios.put("/Correspondence/Update", JSON.stringify({
                "correspondenceType": parseInt(correspondenceType),
                "sender": parseInt(sender),
                "reciver": parseInt(receiver),
                "letterNumber": letterNumber,
                "letterDatetime": letterDatetime,
                "secretariatLetterDatetime": null,
                "deceasedDocumentId": idTracking,
                "id": idItem
            }),{
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(res => {
                setTrueMsg(`مکاتبه شما ویرایش گردید`);
                setLoading(false);
                setErrMsg(null);
                ChatTable()
            })
                .catch((err) => {
                    if (err) {
                        setErrMsg(`به مشکلی برخوردید. صفحه را تازه سازی کنید و دوباره تست کنید در غیر اینصورت با پشتیبانی تماس بگیرید.`);
                        setLoading(false);
                        setTrueMsg(null);
                        ChatTable()
                    }
                })
        } else {
            axios.put("/Correspondence/Update", JSON.stringify({
                "correspondenceType": parseInt(correspondenceType),
                "sender": parseInt(sender),
                "reciver": parseInt(receiver),
                "letterNumber": letterNumber,
                "letterDatetime": letterDatetime,
                "secretariatLetterDatetime": secretariatLetterDatetime,
                "deceasedDocumentId": idTracking,
                "id": idItem
            }),{
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(res => {
                setTrueMsg(`مکاتبه شما ویرایش گردید`);
                setLoading(false);
                setErrMsg(null);
                ChatTable()
            })
                .catch((err) => {
                    if (err) {
                        setErrMsg(`به مشکلی برخوردید. صفحه را تازه سازی کنید و دوباره تست کنید در غیر اینصورت با پشتیبانی تماس بگیرید.`);
                        setLoading(false);
                        setTrueMsg(null);
                        ChatTable()
                    }
                })
        }

    }

    return (
        <Fragment>
            <a onClick={LargeModaltoggle} className="text-warning"><i className="icofont icofont-ui-edit" ></i></a>
            <ModalSetupEditChat isOpen={Large} title="عملیات" toggler={LargeModaltoggle} size="lg">

                <CardBody>
                    <p className="text-center f-26 mt-5">ویرایش مکاتبه</p>

                    <Row className="mt-5">
                        <div className="col">

                            <FormGroup className="row">
                                <Label className="col-sm-4 col-form-label f-18">فرستنده</Label>
                                <Col sm="8">
                                    <Input type="select" name="select" className="form-control input-air-primary"
                                           onChange={e => setSender(e.target.value)}
                                           value={sender}
                                    >
                                        <option key="55">انتخاب کنید</option>
                                        {senderShow}
                                    </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup className="row">
                                <Label className="col-sm-4 col-form-label f-18">نوع مکاتبه</Label>
                                <Col sm="8">
                                    <Input type="select" name="select" className="form-control input-air-primary"
                                           onChange={e => setCorrespondenceType(e.target.value)}
                                           value={correspondenceType}
                                    >
                                        <option key="55">انتخاب کنید</option>
                                        {correspondenceTypeShow}
                                    </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup className="row">
                                <Col sm="4">
                                    <Label className="col-form-label f-18">تاریخ نامه</Label>
                                </Col>
                                <Col sm="8">
                                    <DateInputSimple
                                        className={"form-control input-air-primary"}
                                        value={letterDatetime}
                                        name={'myDateTime'}
                                        onChange={e => setLetterDatetime(e.target.value)}
                                    />
                                </Col>
                            </FormGroup>

                        </div>
                        <div className="col">

                            <FormGroup className="row">
                                <Label className="col-sm-4 col-form-label f-18">گیرنده</Label>
                                <Col sm="8">
                                    <Input type="select" name="select" className="form-control input-air-primary"
                                           onChange={e => setReceiver(e.target.value)}
                                           value={receiver}
                                           >
                                        <option key="55">انتخاب کنید</option>
                                        {receiverShow}
                                    </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup className="row">
                                <Label className="col-sm-4 col-form-label f-18">شماره نامه</Label>
                                <Col sm="8">
                                    <Input type="text" name="text" className="form-control input-air-primary" placeholder="اینجا بنویسید..."
                                           onChange={e => setLetterNumber(e.target.value)}
                                           value={letterNumber}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup className="row">
                                <Col sm="4">
                                    <Label className="col-form-label f-18">تاریخ دریافت دبیرخانه</Label>
                                </Col>
                                <Col sm="8">
                                    <DateInputSimple
                                        className={"form-control input-air-primary"}
                                        value={secretariatLetterDatetime}
                                        name={'myDateTime'}
                                        onChange={e => setSecretariatLetterDatetime(e.target.value)}
                                    />
                                </Col>
                            </FormGroup>

                        </div>
                    </Row>
                    <Col className="text-center">
                        <Btn attrBtn={{ color: 'primary', className: 'me-1', disabled: loading ? loading : loading, onClick: (e) => ChatUpdate(e) }} >{loading ? 'درحال ویرایش مکاتبه...' : 'ویرایش مکاتبه'}</Btn>&nbsp;&nbsp;
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
                    </Col>
                </CardBody>

            </ModalSetupEditChat>
        </Fragment>
    );
};
export default EditChatModal;
