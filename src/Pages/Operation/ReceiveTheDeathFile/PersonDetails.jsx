import React, {Fragment, useState} from 'react';
import {Card, CardBody, Col, Form, Label, Row} from "reactstrap";
import axios from "../../../api/axios";
import "react-multi-date-picker/styles/layouts/mobile.css"
import ShowPerson from "./ShowPersonDetails";
import * as shamsi from 'shamsi-date-converter';


const PersonDetails = ({natPerson}) => {
    const [Large, setLarge] = useState(false);

    const LargeModaltoggle = () => setLarge(!Large);

    const token = localStorage.getItem('token')

    const [dataPersonShow, setDataPersonShow] = useState(false)

    const [nameCheck, setNameCheck] = useState(false)
    const [LastNameCheck, setLastNameCheck] = useState(false)


    const handleShowAndAcceptPerson = async (e) => {
        e.preventDefault()

        try {
            await axios.post("/MaskanMehrPerson/FindByNationalCode", JSON.stringify(natPerson),
                {
                    headers: {
                        "accept": "text/plain",
                        "Content-Type": "application/json",
                        "Authorize": token
                    },
                })
                .then(response => {

                    setNameCheck(response.data.firstName)
                    setLastNameCheck(response.data.lastName)

                    setDataPersonShow(
                            <Row key={response.data.nationalCode}>
                                <Col sm="6">
                                    <Label>نام و نام خانوادگی</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.firstName} {response.data.lastName}</span>
                                </Col>
                                <Col sm="6">
                                    <Label>نام پدر</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.fatherName}</span>
                                </Col>
                                <Col sm="6">
                                    <Label>شماره شناسنامه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.identity}</span>
                                </Col>
                                <Col sm="6">
                                    <Label>کد ملی</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.nationalCode}</span>
                                </Col>
                                <Col sm="6">
                                    <Label>تاریخ تولد</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.birthDate ? shamsi.gregorianToJalali(response.data.birthDate).join('/') : "- - -"}</span>
                                </Col>
                                <Col sm="6">
                                    <Label>محل تولد</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.issuance}</span>
                                </Col>
                                <Col sm="6">
                                    <Label>تاریخ صدور</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.issueDate ? shamsi.gregorianToJalali(response.data.issueDate).join('/') : "- - -"}</span>
                                </Col>
                                <Col sm="6">
                                    <Label>تلفن ثابت</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.telephoneNumber}</span>
                                </Col>
                                <Col sm="6">
                                    <Label>تلفن همراه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.mobileNumber}</span>
                                </Col>
                                <Col sm="6">
                                    <Label>تاییدیه ثبت احوال</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.civilRegistrationConfirmation ? "دارد" : "ندارد"}</span>
                                </Col>
                                <Col sm="6">
                                    <Label>شماره بیمه نامه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.insurancePolicyNumber}</span>
                                </Col>
                                <Col sm="6">
                                    <Label>تاریخ صدور بیمه نامه</Label>
                                    <span className="f-s-5"> : </span>
                                    <span className="f-s-5">{response.data.fileName ? shamsi.gregorianToJalali(response.data.fileName).join('/') : "- - -"}</span>
                                </Col>
                            </Row>
                        )

                })
        } catch(err){
            if (err) {
                // console.log(err)
            }
        }
    };

    return (
        <Fragment>
            <a onClick={LargeModaltoggle} onMouseEnter={handleShowAndAcceptPerson}>مشاهده مشخصات</a>
            <ShowPerson isOpen={Large} title="ویرایش" toggler={LargeModaltoggle} size="lg">

                <Col sm="12">
                    <Card>
                        <CardBody>
                            <Form className="form-bookmark needs-validation">
                                {nameCheck && LastNameCheck ?
                                    dataPersonShow
                                    :
                                    <div className="text-center">
                                        شخصی با این کد ملی وجود ندارد.
                                    </div>
                                }
                            </Form>
                        </CardBody>
                    </Card>
                </Col>

            </ShowPerson>
        </Fragment>
    );
};

export default PersonDetails;
