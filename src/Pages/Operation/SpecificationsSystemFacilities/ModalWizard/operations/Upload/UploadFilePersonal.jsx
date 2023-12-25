import React, {Fragment, useState} from "react";
import {CardBody, Col, Input, Label, Row} from "reactstrap";
import {Alerts, Btn} from "../../../../../../AbstractElements";
import axios from "../../../../../../api/axios";
import {toast} from "react-toastify";
import {useEffectOnce} from "react-use";

const UploadFilePersonal = ({idTracking, title, itemId, keyOp, uploadedFilePersonalDocumentsDescription}) => {

    const token = localStorage.getItem("token");
    const UserChecked = localStorage.getItem('Role');

    const [uploadFile, setUploadFile] = useState(null);
    const [rmRf, setRmRf] = useState(null);
    const [selectStatus, setSelectStatus] = useState(1);
    const [fileId, setFileId] = useState(null);

    const [errMsg, setErrMsg] = useState(false);
    const [trueMsg, setTrueMsg] = useState(false);
    const [loading, setLoading] = useState(false);
    const [systemState, setSystemState] = useState();

    const handledUploadFile = async (e) => {
        e.preventDefault()

        let formData = new FormData();

        formData.append('file', uploadFile);
        formData.append('DeceasedDocumentId', parseInt(itemId));
        // formData.append('UploadedFileAppointmentDocument', null);
        formData.append('UploadedFilePersonalDocumentsDescription', parseInt(uploadedFilePersonalDocumentsDescription));
        formData.append('UploadFileState', parseInt(selectStatus));

        if (fileId) {
            axios.post("/DeceasedDocument/UpdateUploadFile", JSON.stringify({
                    "fileId": fileId,
                    "uploadFileState": parseInt(selectStatus)
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorize": token
                    }
                }).then(response => {
                toast.success('وضعیت فایل با موفقیت تغییر یافت!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                })
                setLoading(false);
                setErrMsg(null);
                getIdFileStatus()
            })
                .catch(err => {
                    if (err) {
                        setLoading(false);
                        setTrueMsg(null);
                        toast.error('مشکلی به وجود آمده. دوباره امتحان کنید.', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000
                        })
                    }
                })
        } else {
            axios.post("/DeceasedDocument/UploadFile", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorize": token
                    }
                }).then(response => {
                toast.success('با موفقیت بارگذاری گردید.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                })
                setLoading(false);
                setErrMsg(null);
                getIdFileStatus()
            })
                .catch(err => {
                    if (err) {
                        setLoading(false);
                        setTrueMsg(null);
                        toast.error('مشکلی به وجود آمده. دوباره امتحان کنید.', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000
                        })
                    }
                })
        }

    }

    const getIdFileStatus = () => {
        axios.post("/DeceasedDocument/GetDeceasedDocumentPersonalDocumentsDescriptionFile", JSON.stringify(
                {
                    "deceasedDocumentId": parseInt(itemId),
                    "uploadedFilePersonalDocumentsDescription": parseInt(keyOp)
                }
            ),
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorize": token
                },
            })
            .then(response => {
                setSelectStatus(response.data["uploadFileState"])
                setFileId(response.data["fileId"])
            })
    }

    const downloadFile = () => {
        axios.post("/DeceasedDocument/GetFile", fileId,
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
                let fileName = "document"
                file.href = url;
                file.setAttribute("download", fileName);
                document.body.appendChild(file)
                file.click();
                file.remove();
            })
            .catch(err => {
                if (err.request.status === 500) {
                    toast.error('مشکلی از سمت سرور رخ داده است!', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000
                    })

                }  else if (err.response.status === 404) {
                    toast.error('فایل شما یافت نشد!', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000
                    })

                } else if (err.request.status === 401) {
                    localStorage.removeItem('profileURL');
                    localStorage.removeItem('Name');
                    localStorage.removeItem('token');
                    localStorage.removeItem('Role');
                    localStorage.removeItem('Manager');
                    localStorage.removeItem('managerId');
                    setTimeout(window.location.reload.bind(window.location), 4000)
                    toast.error('دسترسی شما منقضی شده لطفا دوباره وارد شوید(تا چند ثانیه دیگر به صفحه ورود منتقل میشوید)', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 4000
                    })
                }
            })
    }





    const removeFile = (e) => {

        axios.post("/DeceasedDocument/RemoveFile", fileId,
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
                    setFileId(null)
                    setErrMsg(null)
                    setTrueMsg(null)
                    setSelectStatus(1)
                    rmRf.target.value = null
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

    useEffectOnce(() => {

        axios.post("/DeceasedDocument/GetSystemState", parseInt(idTracking),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {
                setSystemState(response.data)
            });

        getIdFileStatus()
    })

    return (
        <Fragment>
            <CardBody className={`mx-1 text-center border 
                ${
                        selectStatus === 1 ?
                            "border-primary"
                            : selectStatus === 2 ?
                                "border-danger"
                                : selectStatus === 3 ?
                                    "border-danger"
                                    : selectStatus === 4 ?
                                        "border-success"
                                        :
                                        "border-primary"

                }
                rounded`}>

                <p className="text-center f-14">{title}</p>

                <Col className="mb-3">
                    {
                        selectStatus === 2 ?
                            <span className={"text-danger border rounded border-danger px-3 py-1"}> برگشت خورده (کپی) </span>
                            : selectStatus === 3 ?
                                <span className={"text-danger border rounded border-danger px-3 py-1"}> برگشت خورده (نقص) </span>
                                : selectStatus === 4 ?
                                    <span className={"text-success border rounded border-success px-3 py-1"}> تایید شده </span>
                                    :
                                    ""
                    }
                </Col>

                {
                    UserChecked === "BranchesManager" ?
                        ''
                        :
                            <Row>
                                <Input type="select" name="select" className="form-control input-air-primary"
                                       onChange={e => {
                                           setSelectStatus(e.target.value)
                                       }}
                                       value={selectStatus}
                                >
                                    <option key="1" value="1">هیچ کدام</option>
                                    <option key="2" value="2">کپی</option>
                                    <option key="3" value="3">نقص</option>
                                    <option key="4" value="4">تایید شده</option>
                                </Input>
                            </Row>
                }


                {UserChecked === "BranchesManager" && systemState !== 1 ?
                    <div className="custom-file mb-2 col-12 mx-auto">
                        <p className="text-center mt-3 f-18">{ fileId ?
                            <a onClick={downloadFile} download="file">بارگیری فایل موجود</a> : ""}</p>
                        <Label className="custom-file-label" htmlFor="validatedCustomFile"></Label>

                    </div>
                    :
                    <div className="custom-file mb-2 col-12 mx-auto">
                        <p className="text-center mt-3 f-18">
                            { fileId ?
                                <a onClick={downloadFile} download="file">بارگیری فایل موجود</a>
                                : ""}
                        </p>
                        <Input
                            className="custom-file-input form-control input-air-primary"
                            id="validatedCustomFile"
                            type="file"
                            name="file"
                            onChange={(e) => {
                                setUploadFile(e.target.files[0])
                                setRmRf(e)
                            }
                            }
                        />
                        <Label className="custom-file-label" htmlFor="validatedCustomFile"></Label>
                        <Row>
                            {uploadFile || selectStatus !== 1 || UserChecked !== "BranchesManager" ?
                                <Btn attrBtn={{
                                    color: 'primary',
                                    className: 'col mt-3 mx-2',
                                    disabled: loading ? loading : loading,
                                    onClick: (e) => handledUploadFile(e)
                                }}>{loading ? 'درحال بارگذاری...' : 'ذخیره'}</Btn>
                                :
                                ''
                            }
                            {UserChecked === "BranchesManager" && systemState !== 1 ?
                                ''
                                : fileId ?
                                    <Btn attrBtn={{
                                        color: 'danger',
                                        className: 'col mt-3 mx-2',
                                        onClick: (e) => removeFile(e)
                                    }}>حذف</Btn>
                                    : ''
                            }
                        </Row>
                    </div>
                }

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
            </CardBody>
        </Fragment>
    );
};
export default UploadFilePersonal;