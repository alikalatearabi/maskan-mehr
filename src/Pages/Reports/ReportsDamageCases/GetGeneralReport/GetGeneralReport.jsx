import React, {Fragment, useState} from 'react';
import {Modal, ModalHeader, ModalBody, Form, Col, Input, Label, Row} from 'reactstrap';
import {Alerts, Btn} from '../../../../AbstractElements';
import axios, {axiosHandler} from "../../../../api/axios";
import button from "../../../../CommonElements/Button";
import {useEffectOnce} from "react-use";
import {DateInputSimple} from "react-hichestan-datetimepicker";

const GetGeneralReport = () => {
    const token = localStorage.getItem('token');
    const UserChecked = localStorage.getItem('Role');
    const UserCheckedManager = localStorage.getItem('Manager');
    const UserCheckedManagerId = localStorage.getItem('managerId');


    const [addModal, setAddModal] = useState(false);
    const addToggle = () => {
        setAddModal(!addModal);
    };

    const [loading, setLoading] = useState(false);

    const [managerId, setManagerId] = useState(null);
    const [managerIdList, setManagerIdList] = useState(null);

    const [reportStartDate, setReportStartDate] = useState(null);

    const [reportEndDate, setReportEndDate] = useState(null);

    const [binaryData, setBinaryData] = useState(null);


    const handleGetGeneralReport = async (e) => {

        e.preventDefault()
        setLoading(true);

        if (UserCheckedManagerId) {
            setManagerId(UserCheckedManagerId)
        }

        if (!reportStartDate) {
            setReportStartDate(null)
        }
        if (!reportEndDate) {
            setReportEndDate(null)
        }

        await axiosHandler.post("/Report/GeneralReport", JSON.stringify(
                {
                    "managerId": parseInt(managerId),
                    "startDateTime": reportStartDate,
                    "endDataTime": reportEndDate
                }),
            {
                headers: {
                    "accept": "text/plain",
                    "Content-Type": "application/json",
                    "Authorize": token
                },
                responseType: 'blob'
            })
            .then(response => {
                setLoading(false)
                setBinaryData(window.URL.createObjectURL(response.data))
            })
            .catch(err => {
                setLoading(false)
            });
    }

    useEffectOnce(async () => {

        await axios.get("/Manager/All",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setManagerIdList(res.map((item) => <option key={item.id} value={item.id}>{item.managerName}</option>));
            });
    })

    const resetForm = () => {
        setManagerId('')
        setReportEndDate('')
        setReportStartDate('')
        setBinaryData(null)
        setLoading(false)
    }

    return (
        <Fragment>
            <Btn attrBtn={{ color: 'warning', className: 'badge-light', onClick: addToggle }}>گزارش کلی</Btn>
            <Modal isOpen={addModal} toggle={addToggle} size="xl">
                <ModalHeader>افزودن جدید
                    <Btn attrBtn={{ color: 'transprant', className: 'btn-close', onClick: addToggle, type: 'button', databsdismiss: 'modal', arialabel: 'Close' }}></Btn>
                </ModalHeader>
                <ModalBody>
                    <Form className="form-bookmark needs-validation">
                        <Col className="col-12">

                            <Row>

                                <Col sm="4">
                                    <Label>مدیریت</Label>
                                    {UserChecked === "BranchesManager"
                                        ?
                                            <h3>{UserCheckedManager}</h3>
                                        :
                                            <Input type="select" name="select" className="mb-3 form-control input-air-primary"
                                                   onChange={e => setManagerId(e.target.value)}
                                                   value={managerId}
                                            >
                                                <option key="55">انتخاب کنید</option>
                                                {managerIdList}
                                            </Input>
                                    }
                                </Col>

                                <Col sm="4">
                                    <Label>تاریخ شروع</Label>
                                    <DateInputSimple
                                        className={"mb-3 form-control input-air-primary"}
                                        value={reportStartDate}
                                        name={'myDateTime'}
                                        onChange={e => setReportStartDate(e.target.value)}
                                    />
                                </Col>

                                <Col sm="4">
                                    <Label>تاریخ پایان</Label>
                                    <DateInputSimple
                                        className={"mb-3 form-control input-air-primary"}
                                        value={reportEndDate}
                                        name={'myDateTime'}
                                        onChange={e => setReportEndDate(e.target.value)}
                                    />
                                </Col>
                            </Row>

                        </Col>
                        <Row className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                            <Col>
                                <Btn attrBtn={{ className: "col-12", color: 'primary', disabled: (loading ? loading : loading), onClick: (e) => handleGetGeneralReport(e) }} >{loading ? 'درحال ایجاد...' : 'ایجاد'}</Btn>
                            </Col>
                            <Col>
                                <Btn attrBtn={{ className: "col-12", color: 'danger', onClick: addToggle }} >لغو</Btn>
                            </Col>
                            <Col>
                                <Btn attrBtn={{ className: "col-12", color: 'warning', onClick: resetForm}} >بازنشانی فرم</Btn>
                            </Col>

                            {binaryData &&
                                <Col>
                                    <Btn attrBtn={{className: "col-12", color: 'success', onClick: true}}>
                                        <a href={binaryData} download="reportExcel" className="text-white">
                                            بارگیری گزارش
                                        </a>
                                    </Btn>
                                </Col>
                            }
                        </Row>

                    </Form>
                </ModalBody>
            </Modal>
        </Fragment>
    );
};
export default GetGeneralReport;