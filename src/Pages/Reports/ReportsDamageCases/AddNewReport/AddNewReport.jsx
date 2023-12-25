import React, {Fragment, useState} from 'react';
import {Modal, ModalHeader, ModalBody, Form, Col, Input, Label, Row} from 'reactstrap';
import {Alerts, Btn} from '../../../../AbstractElements';
import axios, {axiosHandler} from "../../../../api/axios";
import button from "../../../../CommonElements/Button";
import {useEffectOnce} from "react-use";

const AddNewReport = () => {
    const token = localStorage.getItem('token');
    const UserChecked = localStorage.getItem('Role');
    const UserCheckedManager = localStorage.getItem('Manager');
    const UserCheckedManagerId = localStorage.getItem('managerId');


    const [addModal, setAddModal] = useState(false);
    const addToggle = () => {
        setAddModal(!addModal);
    };

    const [errMsg, setErrMsg] = useState('');
    const [trueMsg, setTrueMsg] = useState('');

    const [loading, setLoading] = useState(false);

    const [insurerResponseStatus, setInsurerResponseStatus] = useState(null);
    const [insurerResponseStatusList, setInsurerResponseStatusList] = useState(null);

    const [insuranceCoverageStatus, setInsuranceCoverageStatus] = useState(null);
    const [insuranceCoverageStatusList, setInsuranceCoverageStatusList] = useState(null);

    const [insurerStatus, setInsurerStatus] = useState(null);
    const [insurerStatusList, setInsurerStatusList] = useState(null);

    const [managerId, setManagerId] = useState(null);
    const [managerIdList, setManagerIdList] = useState(null);

    const [reportName, setReportName] = useState(null);


    const [getRepostFieldsManager, setGetRepostFieldsManager] = useState(null);
    const [getRepostFieldsMaskanMehrInsuranceContract, setGetRepostFieldsMaskanMehrInsuranceContract] = useState(null);
    const [getRepostFieldsMaskanMehrPerson, setGetRepostFieldsMaskanMehrPerson] = useState(null);
    const [getRepostFieldsDeceasedDocument_DeathInformation, setGetRepostFieldsDeceasedDocument_DeathInformation] = useState(null);
    const [getRepostFieldsDeceasedDocument, setGetRepostFieldsDeceasedDocument] = useState(null);
    const [getRepostFieldsCheque, setGetRepostFieldsCheque] = useState(null);
    const [getRepostFieldsCorrespondence, setGetRepostFieldsCorrespondence] = useState(null);

    const [checkArray, setCheckArray] = useState([]);
    const [checkArrayPublic, setCheckArrayPublic] = useState();

    const handleCheckBox = (e, item) => {
        setCheckArray([])

        if (e.target.checked) {
            setCheckArray(checkArray.push({
                "id": null,
                "fieldName": item.name,
                "persianFieldName": item.persianName
            }));
            setCheckArrayPublic(checkArray)

        } else if (!e.target.checked) {
            setCheckArray(checkArray.splice(checkArray.indexOf(item), 1));
            setCheckArrayPublic(checkArray)
        }

    }


    const handleAddReport = async (e) => {

        setLoading(true);

        if (UserCheckedManagerId) {
            setManagerId(UserCheckedManagerId)
        }

        try {
            await axiosHandler.post("/Report/Add", JSON.stringify(
                    {
                        "id": null,
                        "responseInsurer": parseInt(insurerResponseStatus),
                        "insuranceCoverageStatus": parseInt(insuranceCoverageStatus),
                        "reportName": reportName,
                        "insurerStatus": parseInt(insurerStatus),
                        "managerId": parseInt(managerId),
                        "fields": checkArrayPublic,
                        "userId": 0,
                        "user": null
                    }),
                {
                    headers: {
                        "accept": "text/plain",
                        "Content-Type": "application/json",
                        "Authorize": token
                    },
                })
                .then(res => {
                    setTrueMsg(`گزارش جدید ایجاد گردید.`);
                    setErrMsg(null);
                    setLoading(false);
                })
        } catch(err){
            if (err) {
                setErrMsg(`در ارسال اطلاعات مشکلی وجود دارد.`);
                setLoading(false);
                setTrueMsg(null);
            }
        }
    }

    useEffectOnce(async () => {

        await axios.get("/DeceasedDocument/GetResponseInsurer",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setInsurerResponseStatusList(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });

        await axios.get("/DeceasedDocument/GetInsuranceCoverageStatus",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setInsuranceCoverageStatusList(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });

        await axios.get("/Report/GetRepostFields",
            {
                headers:{
                    "Authorize": token
                }
            })
            .then(response => response.data)
            .then(res => {
                setGetRepostFieldsManager(res.map((item, i) =>
                    <>
                        {item.groupBy === "Manager" &&
                            <div className="checkbox checkbox-info" key={i}>
                                <Input id={item.name}
                                       onChange={e => handleCheckBox(e, item)}
                                       defaultChecked={false}
                                       type="checkbox"
                                />
                                <Label htmlFor={item.name} className="mb-0">{item.persianName}</Label>
                            </div>
                        }
                    </>
                ));
                setGetRepostFieldsMaskanMehrInsuranceContract(res.map((item, i) =>
                    <>

                        {item.groupBy === "MaskanMehrInsuranceContract" &&
                            <div className="checkbox checkbox-info" key={i}>
                                <Input id={item.name}
                                       onChange={e => handleCheckBox(e, item)}
                                       defaultChecked={false}
                                       type="checkbox"
                                />
                                <Label htmlFor={item.name} className="mb-0">{item.persianName}</Label>
                            </div>
                        }
                    </>
                ));
                setGetRepostFieldsMaskanMehrPerson(res.map((item, i) =>
                    <>
                        {item.groupBy === "MaskanMehrPerson" &&
                            <div className="checkbox checkbox-info" key={i}>
                                <Input id={item.name}
                                       onChange={e => handleCheckBox(e, item)}
                                       defaultChecked={false}
                                       type="checkbox"
                                />
                                <Label htmlFor={item.name} className="mb-0">{item.persianName}</Label>
                            </div>
                        }
                    </>
                ));
                setGetRepostFieldsDeceasedDocument_DeathInformation(res.map((item, i) =>
                    <>
                        {item.groupBy === "DeceasedDocument_DeathInformation" &&
                            <div className="checkbox checkbox-info" key={i}>
                                <Input id={item.name}
                                       onChange={e => handleCheckBox(e, item)}
                                       defaultChecked={false}
                                       type="checkbox"
                                />
                                <Label htmlFor={item.name} className="mb-0">{item.persianName}</Label>
                            </div>
                        }
                    </>
                ));
                setGetRepostFieldsDeceasedDocument(res.map((item, i) =>
                    <>
                        {item.groupBy === "DeceasedDocument" &&
                            <div className="checkbox checkbox-info" key={i}>
                                <Input id={item.name}
                                       onChange={e => handleCheckBox(e, item)}
                                       defaultChecked={false}
                                       type="checkbox"
                                />
                                <Label htmlFor={item.name} className="mb-0">{item.persianName}</Label>
                            </div>
                        }
                    </>
                ));
                setGetRepostFieldsCheque(res.map((item, i) =>
                    <>
                        {item.groupBy === "Cheque" &&
                            <div className="checkbox checkbox-info" key={i}>
                                <Input id={item.name}
                                       onChange={e => handleCheckBox(e, item)}
                                       defaultChecked={false}
                                       type="checkbox"
                                />
                                <Label htmlFor={item.name} className="mb-0">{item.persianName}</Label>
                            </div>
                        }
                    </>
                ));
                setGetRepostFieldsCorrespondence(res.map((item, i) =>
                    <>
                        {item.groupBy === "Correspondence" &&
                            <div className="checkbox checkbox-info" key={i}>
                                <Input id={item.name}
                                       onChange={e => handleCheckBox(e, item)}
                                       defaultChecked={false}
                                       type="checkbox"
                                />
                                <Label htmlFor={item.name} className="mb-0">{item.persianName}</Label>
                            </div>
                        }
                    </>
                ));
            });

        await axios.get("/Manager/All",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setManagerIdList(res.map((item) => <option key={item.id} value={item.id}>{item.managerName}</option>));
            });

        await axios.get("/DeceasedDocument/GetInsurerStatus",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setInsurerStatusList(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });
    })

    const resetForm = () => {
        addToggle()
        setInsurerResponseStatus('')
        setInsuranceCoverageStatus('')
        setReportName('')
        setManagerId('')
        setCheckArrayPublic(null)
        setErrMsg(null)
        setTrueMsg(null)
    }

    return (
        <Fragment>
            <Btn attrBtn={{ color: 'info', className: 'badge-light', onClick: addToggle }}>افزودن گزارش جدید</Btn>
            <Modal isOpen={addModal} toggle={addToggle} size="xl">
                <ModalHeader>افزودن جدید
                    <Btn attrBtn={{ color: 'transprant', className: 'btn-close', onClick: addToggle, type: 'button', databsdismiss: 'modal', arialabel: 'Close' }}></Btn>
                </ModalHeader>
                <ModalBody>
                    <Form className="form-bookmark needs-validation">
                        <Col className="col-12">

                            <Row>
                                <Col sm="12" className="mb-3">
                                    <div className="m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                                        مدیریت :  &nbsp; {getRepostFieldsManager}
                                        <hr />
                                        قرارداد مسکن مهر :  &nbsp; {getRepostFieldsMaskanMehrInsuranceContract}
                                        <hr />
                                        اطلاعات شخص :  &nbsp; {getRepostFieldsMaskanMehrPerson}
                                        <hr />
                                        اطلاعات فوت :  &nbsp; {getRepostFieldsDeceasedDocument_DeathInformation}
                                        <hr />
                                        اطلاعات پرونده :  &nbsp; {getRepostFieldsDeceasedDocument}
                                        <hr />
                                        مشخصات چک  :  &nbsp; {getRepostFieldsCheque}
                                        <hr />
                                        مکاتبات  :  &nbsp; {getRepostFieldsCorrespondence}
                                        <hr />
                                    </div>
                                </Col>

                                <Col sm="4">
                                    <Label>نام گزارش</Label>
                                    <Input className="mb-3 form-control" type="text"
                                           value={reportName}
                                           onChange={e => setReportName(e.target.value)}
                                    />
                                </Col>

                                <Col sm="4">
                                    <Label>رای بیمه گر</Label>
                                    <Input type="select" name="select" className="mb-3 form-control input-air-primary"
                                           onChange={e => setInsurerResponseStatus(e.target.value)}
                                           value={insurerResponseStatus}
                                    >
                                        <option key="55">انتخاب کنید</option>
                                        {insurerResponseStatusList}
                                    </Input>
                                </Col>

                                <Col sm="4">
                                    <Label>وضعیت پوشش</Label>
                                    <Input type="select" name="select" className="mb-3 form-control input-air-primary"
                                           onChange={e => setInsuranceCoverageStatus(e.target.value)}
                                           value={insuranceCoverageStatus}
                                    >
                                        <option key="55">انتخاب کنید</option>
                                        {insuranceCoverageStatusList}
                                    </Input>
                                </Col>

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
                                    <Label>وضعیت بیمه گر</Label>
                                    <Input type="select" name="select" className="mb-3 form-control input-air-primary"
                                           onChange={e => setInsurerStatus(e.target.value)}
                                           value={insurerStatus}
                                    >
                                        <option key="55">انتخاب کنید</option>
                                        {insurerStatusList}
                                    </Input>
                                </Col>
                            </Row>

                        </Col>
                        <Btn attrBtn={{ color: 'primary', disabled: (loading ? loading : loading), onClick: (e) => handleAddReport(e) }} >{loading ? 'درحال ایجاد...' : 'ایجاد'}</Btn>&nbsp;&nbsp;
                        <Btn attrBtn={{ color: 'danger', className: 'mx-1', onClick: addToggle }} >لغو</Btn>
                        <Btn attrBtn={{ color: 'warning', className: 'ms-2', onClick: resetForm}} >بازنشانی فرم</Btn>
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
                    </Form>
                </ModalBody>
            </Modal>
        </Fragment>
    );
};
export default AddNewReport;