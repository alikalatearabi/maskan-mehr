import {Alerts, Btn} from '../../../../AbstractElements';
import React, {Fragment, useState} from 'react';
import ModalSetup from "./ModalEdit/ModalSetup";
import "./modal.css"
import {Card, CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";
import axios from "../../../../api/axios";
import {useEffectOnce} from "react-use";
import * as Converter from "persian-currency-converter";
import {DateInputSimple} from "react-hichestan-datetimepicker";

const PaymentModal = ({idTracking, chequeIdPer, amountPer, dateOfReceivedAmountPer, paymentTypePer, paymentId, loadData}) => {

    const [Large, setLarge] = useState(false);
    const LargeModaltoggle = () => setLarge(!Large);

    const token = localStorage.getItem('token');

    const [loading, setLoading] = useState(false);

    const [errMsgEdit, setErrMsgEdit] = useState('');
    const [trueMsgEdit, setTrueMsgEdit] = useState('');
    const [errMsgCheque, setErrMsgCheque] = useState('');
    const [trueMsgCheque, setTrueMsgCheque] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [trueMsg, setTrueMsg] = useState('');

    const [dateOfReceivedAmount, setDateOfReceivedAmount] = useState();

    const [amount, setAmount] = useState();

    const [chequeId, setChequeId] = useState();

    const [paymentType, setPaymentType] = useState();
    const [paymentTypeShow, setPaymentTypeShow] = useState();

    const [chequeIdChecked, setChequeIdChecked] = useState(false);


    const handlePostPayment = async (e) => {

        e.preventDefault()
        setLoading(true)

        if (parseInt(paymentType) === 1) {
            try {
                await axios.post("/Cheque/IsChequeExist", parseInt(chequeId),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorize": token
                        }
                    }).then(response => {
                    setChequeIdChecked(true)
                    setTrueMsgEdit(null)
                    setErrMsgEdit(null)
                    setLoading(false)
                })
            } catch (err) {
                if (err) {
                    setChequeIdChecked(false)
                    setLoading(false)
                    setTrueMsgEdit(null)
                    setErrMsgEdit(`چک با این آیدی وجود ندارد.`)
                }
            }
        } else {
            setChequeId(null)
        }

            try {
                await axios.put("/DeceasedDocument/UpdatePay", JSON.stringify(
                        {
                            "deceasedDocumentId": parseInt(idTracking),
                            "amount": parseInt(amount),
                            "chequeId": parseInt(chequeId),
                            "dateOfReceivedAmount": dateOfReceivedAmount,
                            "paymentType": parseInt(paymentType),
                            "id": parseInt(paymentId),
                        }
                    ),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorize": token
                        }
                    }).then(response => {
                        setTrueMsgEdit("با موفقیت ویرایش گردید.")
                        setErrMsgEdit(null)
                        setLoading(false)
                        loadData()
                })
            } catch (err) {
                if (err.request.status.code === 204 || err.response.status.code === 204 || err.status.code === 204) {
                    setTrueMsgEdit("با موفقیت ویرایش گردید.")
                    setErrMsgEdit(null)
                    setLoading(false)
                    loadData()
                }
                if (err) {
                    setLoading(false)
                    setTrueMsgEdit(null)
                    setErrMsgEdit('خطا! دوباره امتحان کنید.')
                }
            }
        }

    const dataImport = () => {
        if (!amount && !dateOfReceivedAmount && !paymentType) {
            setChequeId(chequeIdPer ? chequeIdPer : null);
            setAmount(amountPer);
            setDateOfReceivedAmount(dateOfReceivedAmountPer);
            setPaymentType(paymentTypePer);
        }
    }

    useEffectOnce( async () => {
        await axios.get("/DeceasedDocument/GetPaymentType",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setPaymentTypeShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });
        dataImport()
    })

    const [amountChequeBalance, setAmountChequeBalance] = useState()
    const [disabledForCheque, setDisabledForCheque] = useState(false)

    const trueChequeId = (x) => {
        setChequeIdChecked(true)
        setLoading(false)
        setTrueMsgCheque(`چک وجود دارد. موجودی چک : ${Converter.threeDigitSeparator(x) + " ریال "}`)
        setErrMsgCheque(null)
        setAmountChequeBalance(x)
        setDisabledForCheque(false)
    }

    const falseChequeId = () => {
        setChequeIdChecked(false)
        setTrueMsgCheque(null)
        setLoading(false)
        setErrMsgCheque(`چک با این آیدی وجود ندارد.`)
        setDisabledForCheque(true)
    }


    return (
            <Fragment>
                <a onClick={LargeModaltoggle} className="text-warning"><i className="icofont icofont-ui-edit"></i></a>
                <ModalSetup isOpen={Large} title="عملیات" toggler={LargeModaltoggle} size="lg">

                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <Row className="mt-5">
                                    <div className="col">

                                        <FormGroup className="row">
                                            <Label className="col-sm-4 col-form-label f-18">تاریخ دریافت</Label>
                                            <Col sm="8">
                                                <DateInputSimple
                                                    className={"form-control input-air-primary"}
                                                    value={dateOfReceivedAmount}
                                                    name={'myDateTime'}
                                                    onChange={e => setDateOfReceivedAmount(e.target.value)}
                                                />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup className="row">
                                            <Label className="col-sm-4 col-form-label f-18">نوع پرداخت</Label>
                                            <Col sm="8">
                                                <Input type="select" name="select" className="form-control input-air-primary"
                                                       onChange={e => setPaymentType(e.target.value)}
                                                       value={paymentType}
                                                >
                                                    <option key="55">انتخاب کنید</option>
                                                    {paymentTypeShow}
                                                </Input>
                                            </Col>
                                        </FormGroup>

                                    </div>
                                    <div className="col">

                                        <FormGroup className="row">
                                            <Label className="col-sm-4 col-form-label f-18">مبلغ</Label>
                                            <Col sm="8">
                                                <Input type="number" name="number" className="form-control input-air-primary" placeholder="اینجا بنویسید..."
                                                       onChange={e => setAmount(e.target.value)}
                                                       value={amount}
                                                       min={0}
                                                />
                                                {amount &&
                                                    Converter.threeDigitSeparator(amount) + ' ریال '
                                                }
                                            </Col>
                                        </FormGroup>
                                        {parseInt(paymentType) === 1 &&
                                            <FormGroup className="row">
                                                <Label className="col-sm-4 col-form-label f-18">آیدی چک</Label>
                                                <Col sm="8">
                                                    <Input type="number" name="number" className="form-control input-air-primary" placeholder="اینجا بنویسید..."
                                                           value={chequeId}
                                                           onChange={e => setChequeId(e.target.value)}
                                                           min={999}
                                                           onKeyUp={e => {
                                                               try {
                                                                   axios.post("/Cheque/IsChequeExist", parseInt(chequeId),
                                                                       {
                                                                           headers: {
                                                                               "Content-Type": "application/json",
                                                                               "Authorize": token
                                                                           }
                                                                       })
                                                                       .then(response =>
                                                                           {
                                                                               response.data.isExist
                                                                                   ?
                                                                                   trueChequeId(response.data.leftAmount)
                                                                                   :
                                                                                   falseChequeId()
                                                                           }
                                                                       )
                                                               } catch(err){
                                                                   setLoading(false)
                                                               }
                                                           }
                                                           }
                                                    />
                                                    {errMsgCheque &&
                                                        <span className="text-danger">
                                                            {errMsgCheque}
                                                        </span>
                                                    }
                                                    {trueMsgCheque &&
                                                        <span className="text-success">
                                                            {trueMsgCheque}
                                                        </span>
                                                    }
                                                </Col>
                                            </FormGroup>
                                        }

                                    </div>
                                </Row>
                                <Row className="col-12">
                                    <Btn attrBtn={{ color: 'primary', className: 'col-4 mx-auto', disabled: loading ? loading : disabledForCheque ? disabledForCheque : disabledForCheque, onClick: (e) => handlePostPayment(e) }} >{loading ? 'درحال ویرایش...' : disabledForCheque ? 'مشکلات چک را برطرف بفرمایید' : 'ویرایش'}</Btn>&nbsp;&nbsp;
                                </Row>
                                <Col className='mt-3'>
                                    {errMsgEdit &&
                                        <Alerts attrAlert={{ color: 'danger' }}>
                                            {errMsgEdit}
                                        </Alerts>
                                    }
                                    {trueMsgEdit &&
                                        <Alerts attrAlert={{ color: 'success' }}>
                                            {trueMsgEdit}
                                        </Alerts>
                                    }
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
                            </CardBody>
                        </Card>
                    </Col>

                </ModalSetup>
            </Fragment>
    );
};
export default PaymentModal;
