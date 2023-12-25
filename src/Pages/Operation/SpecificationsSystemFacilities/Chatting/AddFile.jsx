import React, {Fragment, useState} from 'react';
import ModalSetupEditChat from "./EditChat";
import {CardBody, Col, Input, Label, Row} from "reactstrap";
import axios from "../../../../api/axios";
import {Alerts, Btn} from "../../../../AbstractElements";
import {useEffectOnce} from "react-use";
import {toast} from "react-toastify";


const AddFile = ({idItem, fileIds, ChatTable}) => {

    const token = localStorage.getItem("token");
    const UserChecked = localStorage.getItem('Role');

    const [Large, setLarge] = useState(false);
    const LargeModaltoggle = () => setLarge(!Large);

    const [uploadFile, setUploadFile] = useState(null);

    const [errMsg, setErrMsg] = useState('');
    const [trueMsg, setTrueMsg] = useState('');
    const [loading, setLoading] = useState('');

    const [binaryData, setBinaryData] = useState('');


    useEffectOnce(async () => {
        await axios.post("/DeceasedDocument/GetFile", fileIds.reverse()[0],
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorize": token
                },
                responseType: 'blob'
            })
            .then(response => {
                setBinaryData(window.URL.createObjectURL(response.data))
            });
    })


    const handledUploadFile = (e) => {
        e.preventDefault()

        let formData = new FormData();

        formData.append('file', uploadFile);
        formData.append('CorrespondenceId', idItem);

        axios.post("/Correspondence/AddFile", formData,
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
            axios.post("/DeceasedDocument/GetFile", fileIds.reverse()[0],
                {
                    headers: {
                        "Content-type": "application/json",
                        "Authorize": token
                    },
                    responseType: 'blob'
                })
                .then(response => {
                    setBinaryData(window.URL.createObjectURL(response.data))
                });
        }).catch(err => {
            if (err) {
                setErrMsg(`مشکلی پیش آمده، دوباره امتحان کنید.`);
                setLoading(false);
                setTrueMsg(null);
            }
        })
    }

    const [systemState, setSystemState] = useState();

    useEffectOnce(() => {
        axios.post("/DeceasedDocument/GetSystemState", idItem,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {
                setSystemState(response.data)
            });
    });

    const removeFile = async (e) => {
        e.preventDefault()

        await axios.post("/DeceasedDocument/RemoveFile", fileIds.reverse()[0],
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
                    setBinaryData(null)
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
            <a onClick={LargeModaltoggle} className="text-primary"><i className="icofont icofont-ui-clip mx-2" ></i></a>
            <ModalSetupEditChat isOpen={Large} title="عملیات" toggler={LargeModaltoggle} size="lg">

                <CardBody>
                    <p className="text-center f-26 mt-5">بارگذاری فایل ضمیمه</p>
                    <Row className="col-12">
                        <div className="custom-file col-8 mx-auto">
                            <p className="text-center f-18">{binaryData ? <a href={binaryData} download="file">بارگیری فایل موجود</a> : ""}</p>
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
                    <Row className="col-6 mx-auto text-center">
                        <Btn attrBtn={{ color: 'primary', className: 'col-4 mx-auto', disabled: loading ? loading : loading, onClick: (e) => handledUploadFile(e) }} >{loading ? 'درحال ذخیره...' : 'ذخیره'}</Btn>
                        {UserChecked === "BranchesManager" && systemState !== 1 ?
                            ''
                            : binaryData ?
                                <Btn attrBtn={{
                                    color: 'danger',
                                    className: 'col-4 mx-auto',
                                    onClick: (e) => removeFile(e)
                                }}>حذف</Btn>
                                : ''
                        }
                    </Row>
                    <Col className='mt-3 col-10 mx-auto'>
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
export default AddFile;
