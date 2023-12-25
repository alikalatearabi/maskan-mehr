import React, {Fragment, useState} from 'react';
import {CardBody, Col, Input, Label, Row} from "reactstrap";
import axios from "../../../../../api/axios";
import {Alerts, Btn} from "../../../../../AbstractElements";
import ModalSetupEditChat from "../../Chatting/EditChat";
import {toast} from "react-toastify";


const UploadFileDeceasedDocument = ({idTracking}) => {
    const [Large, setLarge] = useState(false);
    const LargeModaltoggle = () => {
        setLarge(!Large)
        getFileContract()
    };

    const token = localStorage.getItem("token");

    const [uploadFile, setUploadFile] = useState(null);

    const [errMsg, setErrMsg] = useState('');
    const [trueMsg, setTrueMsg] = useState('');
    const [loading, setLoading] = useState('');

    const [fileId, setFileId] = useState('');

    const handledUploadFile = (e) => {
        e.preventDefault()

        let formData = new FormData();

        formData.append('file', uploadFile);
        formData.append('DeceasedDocumentId', parseInt(idTracking));

        try {
            axios.post("/DeceasedDocument/UploadDeceasedDocumentFile", formData,
                {
                    headers:{
                        "Content-Type": "multipart/form-data",
                        "Authorize": token
                    }
                }).then(response => {
                setTrueMsg(`فایل شما با موفقیت آپلود شد!`);
                setLoading(false);
                setErrMsg(null);
                getFileContract()
            })
        } catch(err){
            if (uploadFile) {
                setErrMsg(`فایل را انتخاب کنید.`);
                setLoading(false);
                setTrueMsg(null);
            } else if (err) {
                setErrMsg(`مشکلی پیش آمده، دوباره امتحان کنید.`);
                setLoading(false);
                setTrueMsg(null);
            }
        }
    }

    const [deceasedDocumentFile, setDeceasedDocument] = useState('');

    const getFileContract = async () => {
        await axios.post("/DeceasedDocument/GetDeceasedDocumentFileInfo", parseInt(idTracking),
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorize": token
                },
            })
            .then(response => {
                setFileId(response.data['fileId'])
                axios.post("/DeceasedDocument/GetFile", response.data['fileId'],
                    {
                        headers: {
                            "Content-type": "application/json",
                            "Authorize": token
                        },
                        responseType: 'blob'
                    })
                    .then(response => {
                        setDeceasedDocument(window.URL.createObjectURL(response.data))
                    })
            })
    }


    const removeFile = async (e) => {
        e.preventDefault()

        await axios.post("/DeceasedDocument/RemoveFile", parseInt(fileId),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {
                if (response) {
                    toast.success('فایل مورد نظر با موفقیت حذف گردید.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000
                    })
                    setDeceasedDocument(null)
                    setTrueMsg(null)
                    setErrMsg(null)
                    setLoading(false)
                }
            }).catch(err => {
                if (err){
                    toast.error('حذف انجام نشد. مشکلی وجود دارد!', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000
                    })
                }
            });
    };


    return (
        <Fragment>
            <Btn attrBtn={{ color: 'info', size: 'sm', onClick: LargeModaltoggle }}>بارگذاری فایل قرارداد</Btn>
            <ModalSetupEditChat isOpen={Large} title="عملیات" toggler={LargeModaltoggle} size="lg">

                <CardBody>
                    <p className="text-center f-26 mt-5">
                        بارگذاری فایل قرارداد
                    </p>
                    <p className="text-center mt-3 f-18">
                        {deceasedDocumentFile ?
                        <a href={deceasedDocumentFile} download="file">بارگیری فایل موجود</a>
                            : ""
                        }
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
                    <Row className="col-6 mx-auto">
                        <Btn attrBtn={{ color: 'primary', className: 'col-5 mx-auto ', disabled: loading ? loading : loading, onClick: (e) => handledUploadFile(e) }} >{loading ? 'درحال ذخیره...' : 'ذخیره'}</Btn>&nbsp;&nbsp;
                        {deceasedDocumentFile ?
                                <Btn attrBtn={{
                                    color: 'danger',
                                    className: 'col-5 mx-auto',
                                    onClick: (e) => removeFile(e)
                                }}>حذف</Btn>
                                : ''
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
                </CardBody>

            </ModalSetupEditChat>
        </Fragment>
    );
};
export default UploadFileDeceasedDocument;