import {Card, CardBody, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import React, {useState} from "react";
import {Alerts, Btn} from "../../../../AbstractElements";
import ChattingTable from "./Table";
import axios, {axiosHandler} from "../../../../api/axios";
import {useEffectOnce} from "react-use";
import {DateInputSimple} from "react-hichestan-datetimepicker";
import * as shamsi from "shamsi-date-converter";
import RemoveChat from "./remove";
import AddFile from "./AddFile";
import EditChatModal from "./edit";
import {toast} from "react-toastify";


const Chatting = ({idTracking}) => {

    const token = localStorage.getItem("token")

    const [senderShow, setSenderShow] = useState()
    const [receiverShow, setReceiverShow] = useState()
    const [correspondenceTypeShow, setCorrespondenceTypeShow] = useState()

    const [correspondenceType, setCorrespondenceType] = useState(null)
    const [sender, setSender] = useState(null)
    const [receiver, setReceiver] = useState(null)
    const [letterNumber, setLetterNumber] = useState(null)
    const [letterDatetime, setLetterDatetime] = useState(null)
    const [secretariatLetterDatetime, setSecretariatLetterDatetime] = useState(null)


    const [errMsg, setErrMsg] = useState('')
    const [trueMsg, setTrueMsg] = useState('')

    const [loading, setLoading] = useState(false)

    const [stateTrue, setStateTrue] = useState(false)

    const [responseTable, setResponseTable] = useState(false)
    const [dataLoopQ, setDataLoopQ] = useState(null);

    const [isLoading, setIsLoading] = useState(null);


    const ChatAdd = async (e) => {

        setLoading(true)
        e.preventDefault()

        await axiosHandler.post("/Correspondence/Add", JSON.stringify({
            "correspondenceType": parseInt(correspondenceType),
            "sender": parseInt(sender),
            "reciver": parseInt(receiver),
            "letterNumber": letterNumber,
            "letterDatetime": letterDatetime,
            "secretariatLetterDatetime": secretariatLetterDatetime,
            "deceasedDocumentId": parseInt(idTracking)
        }), {
            headers: {
                "Content-Type": "application/json",
                "Authorize": token
            }
        }).then(res => {
            setCorrespondenceType('')
            setSender('')
            setReceiver('')
            setLetterNumber('')
            setLetterDatetime(null)
            setSecretariatLetterDatetime(null)
            setLoading(false);

            toast.success('مکاتبه با موفقیت ایجاد گردید.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000
            })

            ChatTable()

        }) .catch(err => {
            setLoading(false);
            if (err.request.status.code === 204 || err.response.status.code === 204 || err.status.code === 204) {
                setCorrespondenceType('')
                setSender('')
                setReceiver('')
                setLetterNumber('')
                setLetterDatetime(null)
                setSecretariatLetterDatetime(null)

                toast.success('مکاتبه با موفقیت ایجاد گردید.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000
                })

                ChatTable()
            }
        })
    }


    const ChatTable = () => {

        setResponseTable(null)
        setIsLoading(true)

        axios.post("/Correspondence/GetDeceasedDocumentCorrespondence", parseInt(idTracking)
            ,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(response => {

            setDataLoopQ(response.data.length)

            setResponseTable(response.data.map((item) =>
                <tr key={item.id}>
                    <td>{item.senderName}</td>
                    <td>{item.reciverName}</td>
                    <td>{item.correspondenceTypeName}</td>
                    <td>{item.letterNumber}</td>
                    <td>{item.letterDatetime ? shamsi.gregorianToJalali(item.letterDatetime).join('/') : "- - -"}</td>
                    <td>{item.secretariatLetterDatetime ? shamsi.gregorianToJalali(item.secretariatLetterDatetime).join('/') : "- - -"}</td>
                    <td>
                        <RemoveChat idItem={item.id} ChatTable={ChatTable} />
                        <AddFile idItem={item.id} idTracking={idTracking} fileIds={item.fileIds} ChatTable={ChatTable} />
                        <EditChatModal
                            ChatTable={ChatTable}
                            idItem={item.id}
                            idTracking={idTracking}
                            senderNamePer={item.sender}
                            reciverNamePer={item.reciver}
                            correspondenceTypePer={item.correspondenceType}
                            letterNumberPer={item.letterNumber}
                            letterDatetimePer={item.letterDatetime}
                            secretariatLetterDatetimePer={item.secretariatLetterDatetime}
                        />
                    </td>
                </tr>
            ))
            setIsLoading(false)

        })
    }


    useEffectOnce(() => {
        axios.get("/Correspondence/GetCorrespondenceUser",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setSenderShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
                setReceiverShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });
        axios.get("/Correspondence/GetCorrespondenceType",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setCorrespondenceTypeShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });

        ChatTable()
    })



    const ResetForm = () => {
        setCorrespondenceType('')
        setSender('')
        setReceiver('')
        setLetterNumber('')
        setLetterDatetime(null)
        setSecretariatLetterDatetime(null)
        setTrueMsg(null)
        setErrMsg(null)
        setLoading(null)
    }

    return (
        <Col sm="12">
            <Card>
                <CardBody>
                    <p className="text-center f-26">
                        مکاتبات
                        {/*&nbsp;&nbsp;*/}
                        {/*<UploadExcel idTracking={idTracking} />*/}
                    </p>

                    <ChattingTable responseTable={responseTable} dataLoopQ={dataLoopQ} idTracking={idTracking} stateTrue={stateTrue} isLoading={isLoading} />

                    <p className="text-center f-26 mt-5">ایجاد مکاتبه</p>

                    <Row className="mt-5">

                        <FormGroup className="row">
                            <Label className="col col-form-label f-18">فرستنده</Label>
                            <Col sm="8">
                                <Input type="select" name="select" className="form-control input-air-primary"
                                    onChange={e => setSender(e.target.value)}
                                    value={sender}
                                        >
                                       }
                                    <option key="55">انتخاب کنید</option>
                                    {senderShow}
                                </Input>
                            </Col>
                        </FormGroup>

                        <FormGroup className="row">
                            <Label className="col col-form-label f-18">گیرنده</Label>
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
                            <Label className="col col-form-label f-18">نوع مکاتبه</Label>
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
                            <Label className="col col-form-label f-18">شماره نامه</Label>
                            <Col sm="8">
                                <Input type="text" name="text" className="form-control input-air-primary" placeholder="اینجا بنویسید..."
                                       onChange={e => setLetterNumber(e.target.value)}
                                       value={letterNumber}
                                />
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

                    </Row>
                    <Col className="text-center mt-4">
                        <Btn attrBtn={{ color: 'primary', className: 'me-1', disabled: loading ? loading : loading, onClick: e => ChatAdd(e) }} >{loading ? 'درحال ایجاد مکاتبه...' : 'ایجاد مکاتبه'}</Btn>&nbsp;&nbsp;
                        <Btn attrBtn={{ color: 'warning', className: 'me-1', onClick: (e) => ResetForm() }} >بازنشانی فرم</Btn>&nbsp;&nbsp;
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
            </Card>
        </Col>
    );
};
export default Chatting;