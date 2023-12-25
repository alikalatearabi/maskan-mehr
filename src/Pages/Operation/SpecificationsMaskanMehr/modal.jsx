import SweetAlert from 'sweetalert2'
import {Btn} from '../../../AbstractElements';
import React, {Fragment, useEffect, useState} from 'react';
import {Card, CardBody, Col, Form, Label, Row} from "reactstrap";
import axios from "../../../api/axios";
import "react-multi-date-picker/styles/layouts/mobile.css"
import ShowPerson from "./ShowPerson";
import * as shamsi from 'shamsi-date-converter';
import * as Converter from "persian-currency-converter";
import BoxLoader from "../../../Layout/Loader/box-loader";


const AcceptPerson = ({contractNumberShow, contractId}) => {
    const [Large, setLarge] = useState(false);

    const LargeModaltoggle = () => setLarge(!Large);

    const token = localStorage.getItem('token')

    const [loading, setLoading] = useState(false)

    const [dataPersonShow, setDataPersonShow] = useState(false)


    const handleShowAndAcceptPerson = async (e) => {
        e.preventDefault()

        try {
            await axios.post("/MaskanMehrInsuranceContract/Find", parseInt(contractId),
                {
                    headers: {
                        "accept": "text/plain",
                        "Content-Type": "application/json",
                        "Authorize": token
                    },
                })
                .then(response => {

                    setDataPersonShow(
                        <Row>
                            <Col className="col-6">
                                <h3 className="col-12 text-center">
                                    مشخصات فردی
                                </h3>
                                <Col className="col-12">
                                    <Label>نام و نام خانوادگی</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.fullName}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>کد ملی</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.nationalCode}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>شماره شناسنامه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.identity}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>تاریخ تولد</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.birthDate ? shamsi.gregorianToJalali(response.data.birthDate).join('/') : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>نام پدر</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.fatherName}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>محل تولد</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.issuance}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>تلفن همراه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.mobileNumber}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>تلفن ثابت</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.telephoneNumber}</span>
                                </Col>
                            </Col>

                            <Col className="col-6">
                                <h3 className="col-12 text-center">
                                    مشخصات قرارداد
                                </h3>
                                <Col className="col-12">
                                    <Label>شماره قرارداد</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.contractNumber}</span>
                                </Col>

                                <Col className="col-12">
                                    <Label>تاریخ قرارداد</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.contractDate ? shamsi.gregorianToJalali(response.data.contractDate).join('/') : "- - -"}</span>
                                </Col>

                                <Col className="col-12">
                                    <Label>سرمایه بیمه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{Converter.threeDigitSeparator(response.data.insuranceCapital) + " ریال "}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>حق بیمه عمر</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{Converter.threeDigitSeparator(response.data.lifeInsurancePremium) + " ریال "}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>نام مدیریت</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.manageName}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>نام شعبه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.branchName}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>مجموع تعداد اقساط</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.totalNumberOfInstallments}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>تاییدیه ثبت احوال</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.civilRegistrationConfirmation ? "دارد" : "ندارد"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>شماره بیمه نامه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.insurancePolicyNumber}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>تاریخ صدور بیمه نامه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.fileName ? shamsi.gregorianToJalali(response.data.fileName).join('/') : "- - -"}</span>
                                </Col>
                            </Col>
                        </Row>
                    )

                })
        } catch(err){
            if (err) {
            }
        }
    };


    const handleGetCodeAccept = async (e) => {

        e.preventDefault();
        setLoading(true)

        try {
            await axios.post("/DeceasedDocument/StartDeceasedDocument", contractId,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorize": token
                    },
                }).then(response => {
                    setLoading(false)
                    LargeModaltoggle()
                    SweetAlert.fire(
                        {title:"" +
                            "ذخیره گردید \n کد پیگیری : " + response.data,
                            icon : 'success',
                            confirmButtonText: 'تایید'
                        }
                    )
                })
        } catch (err) {
            if (err){
            }
        }
    }

    const [isExist, setIsExist] = useState(false)
    const [deceasedDocumentId, setDeceasedDocumentId] = useState()
    const [deceasedDocumentIdentity, setDeceasedDocumentIdentity] = useState()

    useEffect(() => {
        axios.post("/DeceasedDocument/IsDeceasedDocumentExist", contractId,
        {
            headers:{
                "Content-Type": "application/json",
                "Authorize": token
            }

            })
            .then(response =>
                {
                    setIsExist(response.data.isExist)
                    setDeceasedDocumentIdentity(response.data.deceasedDocumentIdentity)
                    setDeceasedDocumentId(response.data.deceasedDocumentId)
                }
            )
    })

    return (
        <>
            <Fragment>
                <Btn attrBtn={{color: 'primary', size: 'sm', onClick: LargeModaltoggle, onFocus: handleShowAndAcceptPerson}}><i
                    className="icofont icofont-edit"></i></Btn>
                <ShowPerson isOpen={Large} title="شروع پرونده" toggler={LargeModaltoggle} size="xl">
                    { dataPersonShow
                    ?


                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <Form className="form-bookmark needs-validation">
                                        {/*<h6 className="text-center">نمایش اطلاعات این قسمت درحال تعمیر میباشد.</h6>*/}
                                        {dataPersonShow}
                                        {isExist
                                            ?
                                            <b> این پرونده قبلا با کد پیگیری
                                                &nbsp;{deceasedDocumentId}&nbsp;
                                                و شماره پرونده
                                                &nbsp;{deceasedDocumentIdentity}&nbsp;
                                                ثبت گردیده است.</b>
                                            :
                                            <Btn attrBtn={{
                                                color: 'primary',
                                                disabled: loading ? loading : loading,
                                                onClick: (e) => handleGetCodeAccept(e)
                                            }}>{loading ? 'درحال ذخیره شدن...' : 'ذخیره'}</Btn>
                                        }
                                        <Btn attrBtn={{color: 'danger', className: 'ms-1', onClick: LargeModaltoggle}}>لغو</Btn>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>

                :
                <BoxLoader />
            }

                </ShowPerson>
            </Fragment>
        </>
    );
};

export default AcceptPerson;
