import React, {Fragment, useState} from "react";
import {Card, CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";
import axios, {axiosHandler} from "../../../../../api/axios";
import {Alerts, Btn} from "../../../../../AbstractElements";
import {useEffectOnce} from "react-use";
import {DateInputSimple} from "react-hichestan-datetimepicker";
import * as shamsi from "shamsi-date-converter";
import BoxLoader from "../../../../../Layout/Loader/box-loader";

const Step5 = ({idTracking}) => {

    const token = localStorage.getItem('token');
    const UserChecked = localStorage.getItem('Role');

    const [loading, setLoading] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [trueMsg, setTrueMsg] = useState('');

    const [insurerStatus, setInsurerStatus] = useState();
    const [insurerStatusShow, setInsurerStatusShow] = useState();
    const [insurerStatusString, setInsurerStatusString] = useState();

    const [responseInsurer, setResponseInsurer] = useState();
    const [responseInsurerShow, setResponseInsurerShow] = useState();
    const [responseInsurerString, setResponseInsurerString] = useState();

    const [insurerCoverageStatus, setInsurerCoverageStatus] = useState();
    const [insurerCoverageStatusShow, setInsurerCoverageStatusShow] = useState();
    const [insurerCoverageStatusString, setInsurerCoverageStatusString] = useState();

    const [insurerStatusDesc, setInsurerStatusDesc] = useState();

    const [dateSecretariatLetter, setDateSecretariatLetter] = useState("");

    const [systemState, setSystemState] = useState();


    const handlePostDeath = async (e) => {

        e.preventDefault()
        setLoading(true)

        try {
            await axiosHandler.post("/DeceasedDocument/AddOrUpdateGeneralStatusDeceasedDocumentDto", JSON.stringify(
                    {
                        "deceasedDocumentId": parseInt(idTracking),
                        "responseInsurer": parseInt(responseInsurer),
                        "insuranceCoverageStatus": parseInt(insurerCoverageStatus),
                        "insurerStatus": parseInt(insurerStatus),
                        "description": insurerStatusDesc,
                        "dateSecretariatLetter": dateSecretariatLetter

                    }
                ),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorize": token
                    }
                }).then(response => {

                setTrueMsg("با موفقیت ذخیره گردید")
                setErrMsg(null)
                setLoading(false)

            })
        } catch(err){
            if (err){
                setLoading(false)
                setTrueMsg(null)
                setErrMsg('خطا! دوباره امتحان کنید.')
            }
        }
    }

    useEffectOnce(() => {
        axios.post(`/DeceasedDocument/GetGeneralStatus`, idTracking,
            {headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                },})
            .then(response => {
                setInsurerStatus(response.data.insurerStatus)
                setInsurerStatusString(response.data.insurerStatusName)
                setResponseInsurer(response.data.responseInsurer)
                setResponseInsurerString(response.data.responseInsurerName)
                setInsurerCoverageStatus(response.data.insuranceCoverageStatus)
                setInsurerCoverageStatusString(response.data.insuranceCoverageStatusName)
                setInsurerStatusDesc(response.data.description)
                if (response.data.dateSecretariatLetter === "0001-01-01T00:00:00") {
                    setDateSecretariatLetter("")
                } else {
                    setDateSecretariatLetter(response.data.dateSecretariatLetter)
                }
            });

        axios.post("/DeceasedDocument/GetSystemState", idTracking,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {
                setSystemState(response.data)
            });

        axios.get("/DeceasedDocument/GetResponseInsurer",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setResponseInsurerShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });

        axios.get("/DeceasedDocument/GetInsuranceCoverageStatus",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setInsurerCoverageStatusShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });

        axios.get("/DeceasedDocument/GetInsurerStatus",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setInsurerStatusShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });
    })



    return (
        <Fragment>
            <Card>
                <CardBody className="">
                    <p className="text-center f-26">وضعیت کلی پرونده</p>
                    {systemState ?
                        <>

                            {UserChecked === "BranchesManager"
                                ?
                                <Row className="mt-5 justify-content-between">
                                    <FormGroup className="row col-6" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col col-form-label f-20"> وضعیت بیمه گر  : </Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">{insurerStatus ? insurerStatusString : "- - -"}</Label>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-6" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col col-form-label f-20">رای بیمه گر : </Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">{responseInsurer ? responseInsurerString : "- - -"}</Label>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-6" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col col-form-label f-20">وضعیت پوشش : </Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">{insurerCoverageStatus ? insurerCoverageStatusString : "- - -"}</Label>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-6" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col col-form-label f-20">تاریخ دریافت نامه توسط دبیرخانه : </Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">
                                                {dateSecretariatLetter ?
                                                    <>
                                                        {
                                                            dateSecretariatLetter === "0001-01-01T00:00:00"
                                                                ?
                                                                'ثبت اشتباه'
                                                                :
                                                                shamsi.gregorianToJalali(dateSecretariatLetter).join('/')
                                                        }
                                                    </>
                                                    : '- - -'}
                                            </Label>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-12 mx-auto" style={{border : "1px dashed #5655e5"}}>
                                        <Col sm="12">
                                            <Label className="col-form-label f-20">شرح : </Label>
                                        </Col>
                                        <Col sm="12" className="">
                                            <Label className="f-20">{insurerStatusDesc ? insurerStatusDesc : '- - -'}</Label>
                                        </Col>
                                    </FormGroup>
                                </Row>
                                :
                                <Row className="mt-5 justify-content-between">
                                    <FormGroup className="row col-6">
                                        <Label className="col col-form-label f-20"> وضعیت بیمه گر  :</Label>
                                        <Col sm="12">
                                            <Input type="select" name="select" className="form-control input-air-primary"
                                                   onChange={e => setInsurerStatus(e.target.value)}
                                                   value={insurerStatus}
                                            >
                                                <option key="55">انتخاب کنید</option>
                                                {insurerStatusShow}
                                            </Input>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-6">
                                        <Label className="col col-form-label f-20">رای بیمه گر :</Label>
                                        <Col sm="12" className="">
                                            <Input type="select" name="select" className="form-control input-air-primary"
                                                   onChange={e => setResponseInsurer(e.target.value)}
                                                   value={responseInsurer}
                                            >
                                                <option key="55">انتخاب کنید</option>
                                                {responseInsurerShow}
                                            </Input>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-6">
                                        <Label className="col col-form-label f-20">وضعیت پوشش :</Label>
                                        <Col sm="12">
                                            <Input type="select" name="select" className="form-control input-air-primary"
                                                   onChange={e => setInsurerCoverageStatus(e.target.value)}
                                                   value={insurerCoverageStatus}
                                            >
                                                <option key="55">انتخاب کنید</option>
                                                {insurerCoverageStatusShow}
                                            </Input>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-6">
                                        <Label className="col col-form-label f-20">تاریخ دریافت نامه توسط دبیرخانه :</Label>
                                        <Col sm="12">
                                            <DateInputSimple
                                                className={"form-control form-control input-air-primary"}
                                                value={dateSecretariatLetter}
                                                name={'myDateTime'}
                                                onChange={e => setDateSecretariatLetter(e.target.value)}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-12 mt-3">
                                        <Col sm="2">
                                            <Label className="col-form-label f-20">شرح :</Label>
                                        </Col>
                                        <Col sm="10">
                                            <Input className="form-control input-air-primary" type="textarea"
                                                   onChange={e => setInsurerStatusDesc(e.target.value)}
                                                   value={insurerStatusDesc}
                                            />
                                        </Col>
                                    </FormGroup>
                                </Row>
                            }


                            <Row className="col-12">
                                {UserChecked === "BranchesManager" ?
                                    ''
                                    :
                                    <Btn attrBtn={{
                                        color: 'primary',
                                        className: 'col-4 mx-auto',
                                        disabled: loading ? loading : loading,
                                        onClick: (e) => handlePostDeath(e)
                                    }}>{loading ? 'درحال ذخیره...' : 'ذخیره'}</Btn>
                                }
                            </Row>
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
                    :
                        <BoxLoader />
                    }
                </CardBody>
            </Card>
        </Fragment>
    );
};
export default Step5;