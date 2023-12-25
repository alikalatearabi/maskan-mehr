import {Btn, H5} from '../../../AbstractElements';
import React, {useState} from 'react';
import { Accordion } from 'react-bootstrap'
import {Card, CardBody, CardHeader, Col, Collapse, Form, Input, Label, Row} from 'reactstrap';
import axios, {axiosHandler} from "../../../api/axios";
import {DateInputSimple} from "react-hichestan-datetimepicker";
import {toast} from "react-toastify";

const ReportsDamageCasesAccordion = ({binaryData, handleGetReport, handleGetReportCount, handleGetReportExcel, downloading, binaryDataLoad, nuller}) => {

    const token = localStorage.getItem('token')

    const [isOpen, setIsOpen] = useState(0);
    const toggle = (id) => (isOpen === id ? setIsOpen(null) : setIsOpen(id));

    const [reportSelect, setReportSelect] = useState(null);
    const [reportList, setReportList] = useState(null);

    const [reportStartDate, setReportStartDate] = useState(null);

    const [reportEndDate, setReportEndDate] = useState(null);

    const deleteReport = () => {
        axiosHandler.post("/Report/Remove", parseInt(reportSelect)
        , {
            headers: {
                "Content-type": "application/json",
                "Authorize": token
            },
        })
            .then(response => {
                toast.success('گزارش موردنظر با موفقیت حذف شد.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                })
                setReportSelect(null)
            })
            .catch(err => {
                toast.error('مشکلی در حذف پیش آمده! دوباره تلاش کنید.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                })
                setReportSelect(null)
            })
    };


    return (

        <Accordion defaultActiveKey="0">
            <div className="default-according" id="accordion1">
                <Card>
                    <CardHeader className="bg-primary">
                        <H5 attrH5={{ className: 'mb-0' }} className="text-white" >
                            <Btn attrBtn={{ as: Card.Header, className: 'btn btn-link text-white', color: 'default', onClick: () => toggle(1) }} >
                                <i className="icofont icofont-search"></i>جستجو
                            </Btn>
                        </H5>
                    </CardHeader>
                    <Collapse isOpen={isOpen === 1} className="bg-light" style={{borderBottomRightRadius: 15, borderBottomLeftRadius: 15}}>
                        <CardBody>

                            <Card className="bg-light">
                                <CardBody>
                                    <Form className="needs-validation" noValidate="">
                                        <div class="container">
                                            <Row>
                                                <div className="col-sm">
                                                    <Row>
                                                        <Col className="col-5">
                                                            <Label style={{fontSize:"1.2em", lineHeight: "40px"}}>انتخاب گزارش</Label>
                                                        </Col>
                                                        <Col className="col-7">
                                                            <Input type="select" name="select" className="form-control input-air-primary"
                                                               onChange={e => setReportSelect(e.target.value)}
                                                               value={reportSelect}
                                                               onClick={() =>
                                                                   axios.get("/Report/GetReports",
                                                                       {headers: {
                                                                               "Authorize": token
                                                                           },})
                                                                       .then(response => response.data)
                                                                       .then(res => {
                                                                           setReportList(res.map((item) => <option key={item.id} value={item.id}>{item.reportName}</option>));
                                                                       })
                                                               }
                                                            >
                                                                <option key="55">انتخاب کنید</option>
                                                                {reportList}
                                                            </Input>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className="col-sm">
                                                    <Row>
                                                        <Col className="col-5">
                                                            <Label style={{fontSize:"1.2em", lineHeight: "40px"}}>تاریخ شروع</Label>
                                                        </Col>
                                                        <Col className="col-7">
                                                            <DateInputSimple
                                                                className={"form-control input-air-primary"}
                                                                value={reportStartDate}
                                                                name={'myDateTime'}
                                                                onChange={e => setReportStartDate(e.target.value)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className="col-sm">
                                                    <Row>
                                                        <Col className="col-5">
                                                            <Label style={{fontSize:"1.2em", lineHeight: "40px"}}>تاریخ پایان</Label>
                                                        </Col>
                                                        <Col className="col-7">
                                                            <DateInputSimple
                                                                className={"form-control input-air-primary"}
                                                                value={reportEndDate}
                                                                name={'myDateTime'}
                                                                onChange={e => setReportEndDate(e.target.value)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Row>
                                        </div>
                                        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 mt-4">
                                            { reportSelect ?
                                                <div className="col mx-auto">
                                                    <Btn attrBtn={{className: "col-12", color: 'primary', onClick: (e) => {
                                                        nuller(e);
                                                        handleGetReportCount(e, reportSelect, reportStartDate, reportEndDate);
                                                        handleGetReport(e, reportSelect, reportStartDate, reportEndDate);
                                                    } }} >جستجو</Btn>
                                                </div>
                                                :
                                                <div className="col-12 mx-auto">
                                                    <Btn attrBtn={{className: "col-12", color: 'primary', disabled:true }}>جستجو</Btn>
                                                </div>
                                            }
                                            { binaryDataLoad &&
                                                <div className="col mx-auto">
                                                    <Btn attrBtn={{className: "col-12", color: 'warning',
                                                        disabled: downloading ? downloading : downloading,
                                                        onClick: (e) => {
                                                        handleGetReportExcel(e, reportSelect, reportStartDate, reportEndDate);
                                                    } }} >{downloading ? 'درحال آماده سازی...' :'بارگیری گزارش'}</Btn>
                                                </div>
                                            }
                                                {binaryData &&
                                                    <div className="col mx-auto">
                                                        <Btn attrBtn={{className: "col-12", color: 'success', href: binaryData, download: "reportExcel"}}>
                                                        دانلود کنید
                                                        </Btn>
                                                    </div>
                                                }
                                            {reportSelect &&
                                                <div className="col mx-auto">
                                                    <Btn attrBtn={{className: "col-12", color: 'danger', onClick: deleteReport }}>
                                                        حذف گزارش
                                                    </Btn>
                                                </div>
                                            }
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>

                        </CardBody>
                    </Collapse>
                </Card>
            </div>
        </Accordion>
    );
};
export default ReportsDamageCasesAccordion;