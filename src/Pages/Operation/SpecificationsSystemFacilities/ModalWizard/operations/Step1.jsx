import React, {Fragment, useState} from "react";
import {Card, CardBody, Col, Label, Row} from "reactstrap";
import * as shamsi from "shamsi-date-converter";
import axios, {axiosHandler} from "../../../../../api/axios";
import * as Converter from "persian-currency-converter";
import BoxLoader from "../../../../../Layout/Loader/box-loader";

const Step1 = ({idTracking}) => {

    const token = localStorage.getItem('token')

    const [dataPromise, setDataPromise] = useState();

    const x = () => {
        try {
            axiosHandler.post("/DeceasedDocument/FindAsList", parseInt(idTracking),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorize": token
                    }
                }).then(response => {

                setDataPromise(response.data.map((item) =>

                        <Row>
                            <Col className="col-6">
                                <h3 className="col-12 mb-3">
                                    مشخصات فردی
                                </h3>
                                <Col className="col-12">
                                    <Label>نام و نام خانوادگی</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.fullName ? item.person.fullName : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>کد ملی</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.nationalCode ? item.person.nationalCode : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>شماره شناسنامه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.identity ? item.person.identity : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>تاریخ تولد</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">
                                        {item.person.birthDate ?
                                            <>
                                                {
                                                    item.person.birthDate === "0001-01-01T00:00:00"
                                                        ?
                                                        'ثبت اشتباه'
                                                        :
                                                        shamsi.gregorianToJalali(item.person.birthDate).join('/')
                                                }
                                            </>
                                            : '- - -'}
                                    </span>
                                </Col>
                                <Col className="col-12">
                                    <Label>نام پدر</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.fatherName ? item.person.fatherName : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>محل تولد</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.issuance ? item.person.issuance : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>تلفن همراه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.mobileNumber ? item.person.mobileNumber : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>شماره فایل</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.fileNumber ? item.fileNumber : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>ایجاد کننده</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.fullNameInsert ? item.fullNameInsert : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>تاریخ ایجاد</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.dateTimeInsert ? item.dateTimeInsert : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>ویرایش کننده</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.fullNameUpdate ? item.fullNameUpdate : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>تاریخ ویرایش</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.dateTimeUpdate ? item.dateTimeUpdate : "- - -"}</span>
                                </Col>
                            </Col>

                            <Col className="col-6">
                                <h3 className="col-12 mb-3">
                                    مشخصات قرارداد
                                </h3>
                                <Col className="col-12">
                                    <Label>شماره قرارداد</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.contractNumber ? item.person.contractNumber : "- - -"}</span>
                                </Col>

                                <Col className="col-12">
                                    <Label>تاریخ قرارداد</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">
                                        {item.person.contractDate ?
                                            <>
                                                {
                                                    item.person.contractDate === "0001-01-01T00:00:00"
                                                        ?
                                                        'ثبت اشتباه'
                                                        :
                                                        shamsi.gregorianToJalali(item.person.contractDate).join('/')
                                                }
                                            </>
                                            : '- - -'}
                                    </span>
                                </Col>

                                <Col className="col-12">
                                    <Label>سرمایه بیمه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.insuranceCapital ? Converter.threeDigitSeparator(item.person.insuranceCapital) + " ریال " : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>حق بیمه عمر</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.lifeInsurancePremium ? Converter.threeDigitSeparator(item.person.lifeInsurancePremium) + " ریال " : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>نام مدیریت</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.manageName ? item.person.manageName : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>کد مدیریت</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.managerCode ? item.person.managerCode : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>نام شعبه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.branchName ? item.person.branchName : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>کد شعبه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.branchCode ? item.person.branchCode : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>مجموع تعداد اقساط</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.totalNumberOfInstallments ? item.person.totalNumberOfInstallments : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>تاییدیه ثبت احوال</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.civilRegistrationConfirmation ? "دارد" : "ندارد"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>شماره بیمه نامه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{item.person.insurancePolicyNumber ? item.person.insurancePolicyNumber : "- - -"}</span>
                                </Col>
                                <Col className="col-12">
                                    <Label>تاریخ صدور بیمه نامه</Label>
                                    <span className="f-s-5"> : </span>
                                </Col>
                                <span className="f-s-5">
                                        {item.person.fileName ?
                                            <>
                                                {
                                                    item.person.fileName === "0001-01-01T00:00:00"
                                                        ?
                                                        'ثبت اشتباه'
                                                        :
                                                        shamsi.gregorianToJalali(item.person.fileName).join('/')
                                                }
                                            </>
                                            : '- - -'}
                                    </span>
                            </Col>
                        </Row>
                    )
                )

                })
            } catch(err){
                if (err.response.status === 404) {
                    // console.log(err);
                } else if (err.response.status === 401) {
                    // console.log("401");
                    // console.log(err);
                } else {
                    // console.log(err);
                }
            }
        }

    if (!dataPromise){
        x()
    }
    return (
        <Fragment>
            <Card>
                <CardBody className="">
                    <p className="text-center f-26">تسهیلات گیرنده</p>
                    {dataPromise ? dataPromise : <BoxLoader /> }
                </CardBody>
            </Card>
        </Fragment>
    );
};
export default Step1;