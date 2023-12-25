import React, {Fragment, useState} from 'react';
import {CardBody, Col, Input, Label, Row} from "reactstrap";
import axios from "../../api/axios";
import {Alerts, Btn, ToolTip} from "../../AbstractElements";
import ModalSetup from "../Operation/SpecificationsSystemFacilities/PaymentDetails/ModalEdit/ModalSetup";
import {useEffectOnce} from "react-use";
import {toast} from "react-toastify";


const UploadExcel = ({IdCheque, calling}) => {

    const [Large, setLarge] = useState(false);
    const LargeModaltoggle = () => setLarge(!Large);

    const [basictooltip, setbasictooltip] = useState(false);
    const toggle = () => setbasictooltip(!basictooltip);

    const token = localStorage.getItem("token");

    const [uploadFile, setUploadFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const handledUploadFile = (e) => {
        e.preventDefault()

        let formData = new FormData();

        formData.append('FormFile', uploadFile);
        formData.append('ChequeId', parseInt(IdCheque));

        setLoading(true);

            axios.post("/DeceasedDocument/UploadPaymentExcel", formData,
                {
                    headers:{
                        "Content-Type": "multipart/form-data",
                        "Authorize": token
                    }
                }).then(response => {
                    if (response.data.isInserted === true) {
                        toast.success('فایل شما با موفقیت بارگذاری شد!', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000
                        });
                    }
                    if (response.data.isInserted === false) {
                        toast.error(response.data.errorMessage, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000
                        });
                    }
                    setLoading(false);
                    calling();
                })
                .catch(err => {
                    if (err.request.status === 500) {
                        toast.error('مشکلی از سمت سرور رخ داده است!', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000
                        })
                        setLoading(false);
                        calling();
                    } else {
                        toast.error("مشکلی پیش آمده، دوباره امتحان کنید.", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000
                        });
                        setLoading(false);
                        calling();
                    }
                })
    }

    const excelTemplateDownload = () => {
        axios.get("/DeceasedDocument/GetPaymentTemplateExcel",
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorize": token
                },
                responseType: 'blob'
            })
            .then(response => {
                let url = window.URL.createObjectURL(response.data);
                let file = document.createElement('a');
                let fileName = "قالب اکسل بارگذاری پرداختی ها.xlsx"
                file.href = url;
                file.setAttribute("download", fileName);
                document.body.appendChild(file)
                file.click();
                file.remove();
            })
    }



    return (
        <Fragment>
            <a className="bg-success mx-1 px-3 py-2 justify-content-center rounded-3" id={"UploadExcelCheque" + IdCheque} onClick={LargeModaltoggle}><i className="icofont icofont-upload" ></i></a>
            <ToolTip
                attrToolTip={{
                    placement: 'top',
                    isOpen: basictooltip,
                    target: 'UploadExcelCheque' + IdCheque,
                    toggle: toggle
                }} >
                بارگذاری فایل اکسل
            </ToolTip>

            <ModalSetup isOpen={Large} title="عملیات" toggler={LargeModaltoggle} size="lg">

                <CardBody>
                    <p className="text-center f-26 mt-5">
                        بارگذاری فایل اکسل
                        &nbsp;&nbsp;
                        <Btn attrBtn={{ color: 'info', size: 'sm' }}><a className="text-white" onClick={excelTemplateDownload}>قالب اکسل</a></Btn>
                    </p>
                    <Row className="col-12">
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
                </CardBody>

            </ModalSetup>
        </Fragment>
    );
};
export default UploadExcel;
