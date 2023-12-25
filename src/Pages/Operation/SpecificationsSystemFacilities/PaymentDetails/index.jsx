import {Card, CardBody, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import React, {useState} from "react";
import PaymentDetailsTable from "./Table";
import {Alerts, Btn} from "../../../../AbstractElements";
import axios, {axiosHandler} from "../../../../api/axios";
import * as Converter from "persian-currency-converter";
import {useEffectOnce} from "react-use";
import {DateInputSimple} from "react-hichestan-datetimepicker";
import * as shamsi from "shamsi-date-converter";
import PaymentModal from "./Modal";
import RemovePayment from "./remove";
import {toast} from "react-toastify";


const PaymentDetails = ({idTracking}) => {

    const token = localStorage.getItem('token');
    const UserChecked = localStorage.getItem('Role');

    const [loading, setLoading] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [trueMsg, setTrueMsg] = useState('');
    const [errMsgCheque, setErrMsgCheque] = useState('');
    const [trueMsgCheque, setTrueMsgCheque] = useState('');

    const [dateOfReceivedAmount, setDateOfReceivedAmount] = useState('');

    const [amount, setAmount] = useState();

    const [chequeId, setChequeId] = useState(null);

    const [paymentType, setPaymentType] = useState(0);
    const [paymentTypeShow, setPaymentTypeShow] = useState();

    const [chequeIdChecked, setChequeIdChecked] = useState(false);

    const [showData, setShowData] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const loadData = () => {
        setShowData(null)
        setIsLoading(true)

        axios.post("/DeceasedDocument/GetPaysByDeceasedDocumentId", parseInt(idTracking),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(response => {

            setShowData(
                response.data.map((item) =>
                    <tr key={item.id}>
                        <td>{item.chequeId ? item.chequeId : "- - -"}</td>
                        <td>{Converter.threeDigitSeparator(item.amount)}</td>
                        <td>{item.dateOfReceivedAmount ? shamsi.gregorianToJalali(item.dateOfReceivedAmount).join('/') : "- - -"}</td>
                        <td>{item.paymentName}</td>
                        {UserChecked !== "BranchesManager" &&
                            <td>
                                <PaymentModal  idTracking={idTracking} chequeIdPer={item.chequeId} amountPer={item.amount} dateOfReceivedAmountPer={item.dateOfReceivedAmount} paymentTypePer={item.paymentType} paymentId={item.id} loadData={loadData} />
                                <RemovePayment idItem={item.id} loadData={loadData} />
                            </td>
                        }
                    </tr>
                )
            )
            setIsLoading(false)

        })
            .catch(err => setIsLoading(false))
    }

    const handlePostPayment = async (e) => {

        e.preventDefault()

        setLoading(true);

        if (amount && dateOfReceivedAmount && paymentType) {
            if (parseInt(paymentType) === 1) {
                if (amount <= amountChequeBalance) {
                    if (chequeId) {
                        if (chequeIdChecked) {
                            try {
                                await axios.post("/DeceasedDocument/AddPay", JSON.stringify(
                                        {
                                            "deceasedDocumentId": parseInt(idTracking),
                                            "amount": parseInt(amount),
                                            "chequeId": chequeId,
                                            "dateOfReceivedAmount": dateOfReceivedAmount,
                                            "paymentType": parseInt(paymentType),
                                        }
                                    ),
                                    {
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorize": token
                                        }
                                    }).then(response => {

                                        setLoading(false)
                                        setDisabledForCheque(false)
                                        setTrueMsgCheque(null)
                                        setErrMsgCheque(null)
                                        setErrMsg(null)
                                        setAmountChequeBalance(null)
                                        setAmount(null)
                                        setChequeId(null)
                                        setPaymentType(55)
                                        setDateOfReceivedAmount(null)
                                        setChequeIdChecked(null)

                                        toast.success('پرداختی با موفقیت ایجاد گردید.', {
                                            position: toast.POSITION.TOP_RIGHT,
                                            autoClose: 3000
                                        })

                                        loadData()
                                })
                            } catch (err) {
                                if (err) {
                                    setLoading(false)
                                    setIsLoading(false)
                                    toast.error('خطا! دویاره امتحان کنید.', {
                                        position: toast.POSITION.TOP_RIGHT,
                                        autoClose: 3000
                                    })
                                }
                            }
                        }
                    } else {
                        // hichi
                    }
                } else {

                    toast.error('مبلغ از موجودی چک بیشتر است.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000
                    })
                    setLoading(false)
                }
            } else {
                try {
                    await axios.post("/DeceasedDocument/AddPay", JSON.stringify(
                            {
                                "deceasedDocumentId": parseInt(idTracking),
                                "amount": parseInt(amount),
                                "chequeId": null,
                                "dateOfReceivedAmount": dateOfReceivedAmount,
                                "paymentType": parseInt(paymentType),
                            }
                        ),
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorize": token
                            }
                        }).then(response => {

                            setLoading(false)
                            setDisabledForCheque(false)
                            setTrueMsgCheque(null)
                            setErrMsgCheque(null)
                            setAmountChequeBalance(null)
                            setAmount(null)
                            setChequeId(null)
                            setPaymentType(55)
                            setDateOfReceivedAmount(null)
                            setChequeIdChecked(null)
                            setTrueMsg(null)
                            setErrMsg(null)

                            toast.success('پرداختی با موفقیت ایجاد گردید.', {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000
                            })

                            loadData()
                    })
                } catch (err) {
                    setLoading(false)
                    setIsLoading(false)
                    if (err.request.status.code === 204 || err.response.status.code === 204 || err.status.code === 204) {
                        setLoading(false)
                        setDisabledForCheque(false)
                        setTrueMsgCheque(null)
                        setErrMsgCheque(null)
                        setAmountChequeBalance(null)
                        setAmount(null)
                        setChequeId(null)
                        setPaymentType(55)
                        setDateOfReceivedAmount(null)
                        setChequeIdChecked(null)
                        setTrueMsg(null)
                        setErrMsg(null)

                        toast.success('پرداختی با موفقیت ایجاد گردید.', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000
                        })

                        loadData()
                    } else {
                        loadData()
                    }
                }
            }
        } else {
            setLoading(false)
            setTrueMsg(null)
            setErrMsg('مقادیر خالی میباشند.')
        }
    }

    const [paysAmount, setPaysAmount] = useState();

    useEffectOnce(() => {

        axios.post("/DeceasedDocument/GetPaysAmount", idTracking,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(response => {
                setPaysAmount(response.data)
        });

        axios.get("/DeceasedDocument/GetPaymentType",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setPaymentTypeShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });

        loadData()

    })

    const [amountChequeBalance, setAmountChequeBalance] = useState()
    const [disabledForCheque, setDisabledForCheque] = useState(false)

    const trueChequeId = (leftAmount) => {
        setChequeIdChecked(true)
        setLoading(false)
        setTrueMsgCheque(`چک وجود دارد. موجودی چک : ${Converter.threeDigitSeparator(leftAmount) + " ریال "}`)
        setErrMsgCheque(null)
        setAmountChequeBalance(leftAmount)
        setDisabledForCheque(false)
    }

    const falseChequeId = () => {
        setChequeIdChecked(false)
        setTrueMsgCheque(null)
        setLoading(false)
        setErrMsgCheque(`چک با این آیدی وجود ندارد.`)
        setDisabledForCheque(true)
    }

    const ResetForm = () => {
        setLoading(false)
        setDisabledForCheque(false)
        setTrueMsgCheque(null)
        setTrueMsg(null)
        setErrMsgCheque(null)
        setErrMsg(null)
        setAmountChequeBalance(null)
        setAmount(null)
        setChequeId(null)
        setPaymentType(55)
        setDateOfReceivedAmount(null)
        setChequeIdChecked(null)
    }

    return (
        <Col sm="12">
            <Card>
                <CardBody>
                    <p className="text-center f-26">مشخصات پرداخت ها</p>
                    <Row className="mt-5 mb-3">
                        <div className="col">

                            <FormGroup className="row">
                                <Label className="col-sm-4 col-form-label f-18">مبلغ کل پرداختی</Label>
                                <Col sm="8" className="text-end">
                                    <Label className="col-form-label f-18">{paysAmount ? Converter.threeDigitSeparator(paysAmount) + " ریال " : "صفر"}</Label>
                                </Col>
                            </FormGroup>

                        </div>
                    </Row>

                    <PaymentDetailsTable showData={showData} idTracking={idTracking} isLoading={isLoading} />


                    {UserChecked === "BranchesManager"
                        ?
                            ''
                        :
                        <>
                            <p className="text-center f-26 mt-5">ثبت پرداخت</p>

                            <Row className="mt-5">

                                    <FormGroup className="row">
                                        <Label className="col col-form-label f-18">تاریخ دریافت مبلغ</Label>
                                        <Col sm="8">
                                            <DateInputSimple
                                                className={"form-control form-control input-air-primary"}
                                                value={dateOfReceivedAmount}
                                                name={'myDateTime'}
                                                onChange={e => setDateOfReceivedAmount(e.target.value)}
                                            />
                                        </Col>
                                    </FormGroup>


                                    <FormGroup className="row">
                                        <Label className="col col-form-label f-18">نوع پرداخت</Label>
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


                                    {parseInt(paymentType) === 1 &&
                                        <FormGroup className="row">
                                            <Label className="col col-form-label f-18">آیدی چک</Label>
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

                                {parseInt(paymentType) === 2 || parseInt(paymentType) === 1 ?
                                    <FormGroup className="row">
                                        <Label className="col col-form-label f-18">مبلغ</Label>
                                        <Col sm="8">
                                            <Input type="number" name="number"
                                                   className="form-control input-air-primary"
                                                   placeholder="اینجا وارد کنید..."
                                                   onChange={e => setAmount(e.target.value)}
                                                   value={amount}
                                                   min={0}
                                            />
                                            {amount &&
                                                Converter.threeDigitSeparator(amount) + ' ریال '
                                            }
                                        </Col>
                                    </FormGroup>
                                    :
                                    ''
                                }


                            </Row>
                            <Col className="text-center mt-4">
                                <Btn attrBtn={{ color: 'primary', className: 'me-1', disabled: loading ? loading : disabledForCheque ? disabledForCheque : disabledForCheque, onClick: (e) => handlePostPayment(e) }} >{loading ? 'درحال ثبت...' : disabledForCheque ? 'مشکلات چک را برطرف بفرمایید' : 'ثبت'}</Btn>&nbsp;&nbsp;
                                <Btn attrBtn={{ color: 'warning', className: 'me-1', onClick: (e) => ResetForm(e) }} >بازنشانی فرم</Btn>&nbsp;&nbsp;
                            </Col>
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
                        </>
                    }


                </CardBody>
            </Card>
        </Col>
    );
};
export default PaymentDetails;