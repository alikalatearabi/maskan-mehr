import React, {Fragment, useState} from 'react';
import {CardBody, Col, Input, Label, Row} from "reactstrap";
import axios from "../../../../api/axios";
import {Alerts, Btn} from "../../../../AbstractElements";
import ModalSetupEditChat from "./EditChat";
import ChattingTable from "./Table"
import {useEffectOnce} from "react-use";
import {toast} from "react-toastify";


const UploadExcel = ({idTracking}) => {
    const [Large, setLarge] = useState(false);
    const LargeModaltoggle = () => setLarge(!Large);

    const token = localStorage.getItem("token");

    const [uploadFile, setUploadFile] = useState(null);

    const [errMsg, setErrMsg] = useState('');
    const [trueMsg, setTrueMsg] = useState('');
    const [loading, setLoading] = useState('');

    const handledUploadFile = (e) => {
        e.preventDefault()

        let formData = new FormData();

        formData.append('file', uploadFile);
        formData.append('DeceasedDocumentId', parseInt(idTracking));

        try {
            axios.post("/Correspondence/UploadExcelCorrespondence", formData,
                {
                    headers:{
                        "Content-Type": "multipart/form-data",
                        "Authorize": token
                    }
                }).then(response => {
                setTrueMsg(`با موفقیت انجام گردید.`);
                setLoading(false);
                setErrMsg(null);
                ChattingTable.ChatTable()
            })
        } catch(err){
            if (err.request.status === 500) {
                toast.error('مشکلی از سمت سرور رخ داده است!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                })
                setLoading(false);
                setTrueMsg(null);
            } else {
                setErrMsg(`مشکلی پیش آمده، دوباره امتحان کنید.`);
                setLoading(false);
                setTrueMsg(null);
            }
        }
    }

    const [excelUserExcel, setExcelUserExcel] = useState('');
    const [excelTemplateDownload, setExcelTemplateDownload] = useState('');
    const [excelTypesExcel, setExcelTypesExcel] = useState('');

    useEffectOnce( async () => {
        axios.get("/Correspondence/GetCorrespondenceUserExcel",
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorize": token
                },
                responseType: 'blob'
            })
            .then(response => {
                setExcelUserExcel(window.URL.createObjectURL(response.data))
            })


        axios.get("/Correspondence/GetExcelCorrespondenceTemplateExcel",
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorize": token
                },
                responseType: 'blob'
            })
            .then(response => {
                setExcelTemplateDownload(window.URL.createObjectURL(response.data))
            })


        axios.get("/Correspondence/GetCorrespondenceTypesExcel",
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorize": token
                },
                responseType: 'blob'
            })
            .then(response => {
                setExcelTypesExcel(window.URL.createObjectURL(response.data))
            })
    })



    return (
        <Fragment>
            <Btn attrBtn={{ color: 'info', size: 'sm', onClick: LargeModaltoggle }}>بارگذاری فایل اکسل</Btn>
            <ModalSetupEditChat isOpen={Large} title="عملیات" toggler={LargeModaltoggle} size="lg">

                <CardBody>
                    <p className="text-center f-26 mt-5">
                        بارگذاری فایل اکسل
                    </p>
                    <Row className="col-12">
                        <Row className="col-12 mb-3 mx-auto">
                                <Btn attrBtn={{ color: 'info', size: 'sm', className: "col-4 mx-1" }}><a className="text-white" download="شناسه های گیرنده و فرستنده" href={excelUserExcel}>شناسه های گیرنده و فرستنده</a></Btn>
                                <Btn attrBtn={{ color: 'info', size: 'sm', className: "col-3 mx-1" }}><a className="text-white" download="شناسه های نوع مکاتبه" href={excelTypesExcel}>شناسه های نوع مکاتبه</a></Btn>
                                <Btn attrBtn={{ color: 'info', size: 'sm', className: "col-4 mx-1" }}><a className="text-white" download="قالب بارگذاری" href={excelTemplateDownload}>قالب بارگذاری</a></Btn>
                        </Row>
                        <div className="custom-file col-8 mx-auto">
                            <Input
                                className="custom-file-input form-control input-air-primary"
                                id="validatedCustomFile"
                                type="file"
                                name="file"
                                onChange={(e) => setUploadFile(e.target.files[0])}
                            />
                            <Label className="custom-file-label" htmlFor="validatedCustomFile"></Label>
                        </div>
                    </Row>
                    <Row className="col-12">
                        <Btn attrBtn={{ color: 'primary', className: 'col-4 mx-auto', disabled: loading ? loading : loading, onClick: (e) => handledUploadFile(e) }} >{loading ? 'درحال ذخیره...' : 'ذخیره'}</Btn>&nbsp;&nbsp;
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
                </CardBody>

            </ModalSetupEditChat>
        </Fragment>
    );
};
export default UploadExcel;
