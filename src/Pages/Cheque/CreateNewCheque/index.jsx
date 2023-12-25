import React, {Fragment, useState} from 'react';
import {Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Row, Col} from 'reactstrap';
import {Alerts, Btn} from '../../../AbstractElements';
import axios from "../../../api/axios";
import {useEffectOnce} from "react-use";
import * as Converter from "persian-currency-converter";
import {DateInputSimple} from "react-hichestan-datetimepicker";
import {toast} from "react-toastify";

const CreateNewCheque = ({getAllCheque}) => {
    const token = localStorage.getItem('token')
    const [errMsg, setErrMsg] = useState('')
    const [trueMsg, setTrueMsg] = useState('')

    const [addModal, setAddModal] = useState(false);
    const addToggle = () => {
        setAddModal(!addModal);
    };

    const [banks, setBanks] = useState();
    const [selectBank, setSelectBank] = useState('');
    const [chequeNumber, setChequeNumber] = useState('');
    const [chequeDate, setChequeDate] = useState('');
    const [chequeMount, setChequeMount] = useState('');
    const [isPaya, setIsPaya] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingErr, setLoadingErr] = useState(false);


    const handleAddCheque = (e) => {

        e.preventDefault();
        setLoading(true);
        try {
            axios.post("/Cheque/Add", JSON.stringify(
                    {
                        'chequeNumber': chequeNumber,
                        'chequeDate': chequeDate,
                        'chequeMount': chequeMount,
                        'bank': parseInt(selectBank),
                        'isPaya': isPaya,
                    }),
                {
                    headers: {
                        "accept": "text/plain",
                        "Content-Type": "application/json",
                        "Authorize": token
                    },
                })
                .then(res => {
                    setTrueMsg(`چک با شماره ${chequeNumber} ثبت گردید`);
                    setErrMsg(null);
                    setLoading(false);
                    setSelectBank('');
                    setChequeNumber('');
                    setChequeMount('');
                    getAllCheque();
                })
        } catch(err){
            if (err.response.status === 400) {
                setErrMsg(`از قبل با شماره ${chequeNumber} چک ثبت گردید است.`);
                setLoading(false);
                setTrueMsg(null);
            } else {
                setErrMsg(`فیلد هارا به درستی کامل کنید.`);
                setLoading(false);
                setTrueMsg(null);
            }
        }
    };


    const resetForm = () => {
        setTrueMsg(null);
        setErrMsg(null);
        setLoading(false);
        setSelectBank('');
        setChequeNumber('');
        setChequeMount('');
    }

    useEffectOnce(() => {
        axios.get("/Cheque/GetBank",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setBanks(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });
    })

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
                            <Col sm="12">
                                <FormGroup className="col-md-12">
                                    <Label>نوع پرداختی</Label>
                                    <Input type="select" name="select" className="form-control input-air-primary"
                                           onChange={e => {
                                               if (e.target.value === "true") {
                                                   setIsPaya(true)
                                                   setSelectBank(null)
                                                   setChequeNumber(null)
                                                   setChequeDate(null)
                                                   setChequeMount(null)
                                               } else if (e.target.value === "false") {
                                                   setIsPaya(false)
                                                   setSelectBank(null)
                                                   setChequeNumber(null)
                                                   setChequeDate(null)
                                                   setChequeMount(null)
                                               }
                                           }}
                                           value={isPaya}
                                    >
                                        <option key="1" value="false">چک</option>
                                        <option key="2" value="true">پایا</option>
                                    </Input>
                                </FormGroup>
                            </Col>

                            {isPaya
                            ?
                                <>
                                    <Col sm="6">
                                        <FormGroup className="col-md-12">
                                            <Label>بانک</Label>
                                            <Input type="select" name="select" className="form-control input-air-primary"
                                                   onChange={e => setSelectBank(e.target.value)}
                                                   value={selectBank}
                                            >
                                                <option key="55">انتخاب کنید</option>
                                                {banks}
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
                                            <Input className="form-control input-air-primary" type="number" required="" onChange={e => setChequeMount(e.target.value)} value={chequeMount}
                                                   min={1000}
                                            />
                                            {chequeMount &&
                                                Converter.threeDigitSeparator(chequeMount) + ' ریال '
                                            }

                                        </FormGroup>
                                    </Col>
                                </>
                            :
                                <>
                                    <Col sm="6">
                                        <FormGroup className="col-md-12">
                                            <Label>بانک</Label>
                                            <Input type="select" name="select" className="form-control input-air-primary"
                                                   onChange={e => setSelectBank(e.target.value)}
                                                   value={selectBank}
                                            >
                                                <option key="55">انتخاب کنید</option>
                                                {banks}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup className="col-md-12">
                                            <Label>شماره چک</Label>
                                            <Input className="form-control input-air-primary" type="number" required="" onChange={e => setChequeNumber(e.target.value)} value={chequeNumber}
                                                   min={0}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup className="col-md-12">
                                            <Label>تاریخ چک</Label>
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
                                            <Input className="form-control input-air-primary" type="number" required="" onChange={e => setChequeMount(e.target.value)} value={chequeMount}
                                                   min={1000}
                                            />
                                            {chequeMount &&
                                                Converter.threeDigitSeparator(chequeMount) + ' ریال '
                                            }

                                        </FormGroup>
                                    </Col>
                                </>
                            }
                        </Row>
                        <Btn attrBtn={{ color: 'primary', disabled: loading ? loading : loadingErr ? loadingErr : loading, onClick: (e) => handleAddCheque(e) }} >{loading ? 'درحال ایجاد...' : loadingErr ? "تاریخ را اصلاح کنید." : 'ایجاد'}</Btn>&nbsp;&nbsp;
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
export default CreateNewCheque;