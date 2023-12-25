import {Alerts, Btn, ToolTip} from '../../AbstractElements';
import React, {Fragment, useState} from 'react';
import {Card, CardBody, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import EditCheque from "./EditCheque";
import axios from "../../api/axios";
import "react-multi-date-picker/styles/layouts/mobile.css"
import {useEffectOnce} from "react-use";
import * as Converter from "persian-currency-converter";
import {DateInputSimple} from "react-hichestan-datetimepicker";
import {toast} from "react-toastify";


const EditChequeModal = ({editIdCheque, getAllCheque, usedAmount}) => {

    const token = localStorage.getItem('token')

    const [basictooltip, setbasictooltip] = useState(false);
    const toggle = () => setbasictooltip(!basictooltip);

    const [errMsg, setErrMsg] = useState('')
    const [trueMsg, setTrueMsg] = useState('')

    const [Large, setLarge] = useState(false);

    const LargeModaltoggle = () => setLarge(!Large);

    const [bank, setBank] = useState();
    const [bankShow, setBankShow] = useState();

    const [chequeDate, setChequeDate] = useState('');
    const [chequeNumber, setChequeNumber] = useState('');
    const [chequeMount, setChequeMount] = useState('');
    const [isPaya, setIsPaya] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingErr, setLoadingErr] = useState(false);


    const handleEditCheque = (e) => {

        e.preventDefault();
        setLoading(true);


        try {
            axios.put("/Cheque/Update", JSON.stringify(
                    {
                        'chequeNumber': chequeNumber,
                        'chequeDate': chequeDate,
                        'chequeMount': chequeMount,
                        'bank': parseInt(bank),
                        'isPaya': isPaya,
                        'id': editIdCheque,
                    }),
                {
                    headers: {
                        "accept": "text/plain",
                        "Content-Type": "application/json",
                        "Authorize": token
                    },
                })
                .then(res => {
                    toast.success(`چک با آیدی ${idShow} با موفقیت ویرایش گردید`, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000
                    })
                    setTrueMsg(``);
                    setErrMsg(null);
                    setLoading(false);
                    getAllCheque()
                })
        } catch(err){
            if (err) {
                setErrMsg(`فیلد هارا به درستی کامل کنید.`);
                setLoading(false);
                setTrueMsg(null);
            }
        }
    };

    const [idShow, setIdShow] = useState();

    useEffectOnce( () => {
        axios.post(`/Cheque/Find/`, editIdCheque,
            {headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                },})
            .then(response => {
                setIdShow(response.data.id)
                setChequeNumber(response.data.chequeNumber)
                setChequeMount(response.data.chequeMount)
                setBank(response.data.bankId)
                setChequeDate(response.data.chequeDate)
                setIsPaya(response.data.isPaya)
            });
        axios.get("/Cheque/GetBank",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setBankShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });
    });



    const [amountChequeBalance, setAmountChequeBalance] = useState()
    const [disabledForCheque, setDisabledForCheque] = useState(false)

    const [errMsgCheque, setErrMsgCheque] = useState('');

    const [chequeIdChecked, setChequeIdChecked] = useState(false);

    const trueChequeId = (x) => {
        setChequeIdChecked(true)
        setLoading(false)
        setErrMsgCheque(null)
        setAmountChequeBalance(x)
        setDisabledForCheque(false)
    }

    const falseChequeId = () => {
        setChequeIdChecked(false)
        setLoading(false)
        setErrMsgCheque(`مبلغ وارد شده کمتر از مقدار مصرف شده میباشد. حداقل مبلغی که میتوانید وارد کنید : ${Converter.threeDigitSeparator(usedAmount)} ریال میباشد.`)
        setDisabledForCheque(true)
    }

    return (
        <Fragment>
            <a className="bg-primary mx-1 px-3 py-2 justify-content-center rounded-3" id={"EditCheque" + editIdCheque} onClick={LargeModaltoggle}><i className="icofont icofont-edit" ></i></a>
            <ToolTip
                attrToolTip={{
                    placement: 'top',
                    isOpen: basictooltip,
                    target: 'EditCheque' + editIdCheque,
                    toggle: toggle
                }} >
                ویرایش چک
            </ToolTip>

            <EditCheque isOpen={Large} title="ویرایش" toggler={LargeModaltoggle} size="xl">

                <Col sm="12">
                    <Card>
                        {isPaya
                        ?
                            <CardBody>
                                <Form className="form-bookmark needs-validation">
                                    <Row>
                                        <p class="text-center f-22"> نوع پرداختی: پایا </p>
                                        <Col sm="6">
                                            <FormGroup className="col-md-12">
                                                <Label>بانک</Label>
                                                <Input type="select" name="select" className="form-control input-air-primary"
                                                       onChange={e => setBank(e.target.value)}
                                                       value={bank}
                                                >
                                                    <option key="55">انتخاب کنید</option>
                                                    {bankShow}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup className="col-md-12">
                                                <Label>تاریخ پایا</Label>
                                                <Row>
                                                    <DateInputSimple
                                                        className={"form-control input-air-primary"}
                                                        value={chequeDate}
                                                        name={'myDateTime'}
                                                        onChange={e => {
                                                            setLoadingErr(true)
                                                            axios.post("/Cheque/FindPayaByChequeDate", e.target.value,
                                                                {
                                                                    headers: {
                                                                        "accept": "text/plain",
                                                                        "Content-Type": "application/json",
                                                                        "Authorize": token
                                                                    },
                                                                })
                                                                .then(res => {
                                                                    if (res.data.isPaya === true) {
                                                                        toast.error('پرداختی پایا در این تاریخ وجود دارد.', {
                                                                            position: toast.POSITION.TOP_RIGHT,
                                                                            autoClose: 2500
                                                                        })
                                                                        setLoadingErr(true)
                                                                    }
                                                                    if (res.data === false) {
                                                                        setChequeDate(e.target.value)
                                                                        setLoadingErr(false)
                                                                    }
                                                                })
                                                        }}
                                                    />
                                                </Row>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup className="col-md-12">
                                                <Label>مبلغ پایا</Label>
                                                <Input className="form-control input-air-primary" type="number" required=""
                                                       onChange={e => setChequeMount(e.target.value)}
                                                       value={chequeMount}
                                                       onKeyUp={e => {
                                                           if (parseInt(usedAmount) <= e.target.value) {
                                                               trueChequeId()
                                                           } else {
                                                               falseChequeId()
                                                           }
                                                       }}
                                                       min={0}
                                                />
                                                {chequeMount &&
                                                    Converter.threeDigitSeparator(chequeMount) + ' ریال '
                                                }
                                                <br />
                                                {errMsgCheque &&
                                                    <span className="text-danger">
                                                {errMsgCheque}
                                            </span>
                                                }
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Btn attrBtn={{ color: 'primary', className: 'me-1', disabled: loading ? loading : disabledForCheque ? disabledForCheque : loadingErr ? loadingErr : loadingErr, onClick: (e) => handleEditCheque(e) }} >{loading ? 'درحال ویرایش...' : disabledForCheque ? 'مشکلات چک را برطرف بفرمایید' : loadingErr ? "تاریخ را اصلاح کنید." : 'ویرایش'}</Btn>&nbsp;&nbsp;
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
                        :
                            <CardBody>
                                <Form className="form-bookmark needs-validation">
                                    <Row>
                                        <p class="text-center f-22"> نوع پرداختی: چک </p>
                                        <Col sm="6">
                                            <FormGroup className="col-md-12">
                                                <Label>بانک</Label>
                                                <Input type="select" name="select" className="form-control input-air-primary"
                                                       onChange={e => setBank(e.target.value)}
                                                       value={bank}
                                                >
                                                    <option key="55">انتخاب کنید</option>
                                                    {bankShow}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup className="col-md-12">
                                                <Label>شماره چک</Label>
                                                <Input className="form-control input-air-primary" type="number" required="" min={0} onChange={e => setChequeNumber(e.target.value)} value={chequeNumber} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup className="col-md-12">
                                                <Label>تاریخ چک</Label>
                                                <span className="f-s-5"></span>
                                                <Row>
                                                    <DateInputSimple
                                                        className={"form-control input-air-primary"}
                                                        value={chequeDate}
                                                        name={'myDateTime'}
                                                        onChange={e => setChequeDate(e.target.value)}
                                                    />
                                                </Row>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup className="col-md-12">
                                                <Label>مبلغ چک</Label>
                                                <Input className="form-control input-air-primary" type="number" required=""
                                                       onChange={e => setChequeMount(e.target.value)}
                                                       value={chequeMount}
                                                       onKeyUp={e => {
                                                           if (parseInt(usedAmount) <= e.target.value) {
                                                               trueChequeId()
                                                           } else {
                                                               falseChequeId()
                                                           }
                                                       }}
                                                       min={0}
                                                />
                                                {chequeMount &&
                                                    Converter.threeDigitSeparator(chequeMount) + ' ریال '
                                                }
                                                <br />
                                                {errMsgCheque &&
                                                    <span className="text-danger">
                                                {errMsgCheque}
                                            </span>
                                                }
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Btn attrBtn={{ color: 'primary', className: 'me-1', disabled: loading ? loading : disabledForCheque ? disabledForCheque : disabledForCheque, onClick: (e) => handleEditCheque(e) }} >{loading ? 'درحال ویرایش...' : disabledForCheque ? 'مشکلات چک را برطرف بفرمایید' : 'ویرایش'}</Btn>&nbsp;&nbsp;
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
                        }
                    </Card>
                </Col>

            </EditCheque>
        </Fragment>
    );
};
export default EditChequeModal;
