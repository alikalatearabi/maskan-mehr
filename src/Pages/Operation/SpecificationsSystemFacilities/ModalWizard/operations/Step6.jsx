import React, {Fragment, useState} from "react";
import {Card, CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";
import {Alerts, Btn} from "../../../../../AbstractElements";
import axios, {axiosHandler} from "../../../../../api/axios";
import * as shamsi from "shamsi-date-converter";
import SendToInsurer from "./send";
import {useEffectOnce} from "react-use";
import * as Converter from "persian-currency-converter"
import UploadFileDeceasedDocument from "./uploadFileDeceasedDocument";
import BoxLoader from "../../../../../Layout/Loader/box-loader";
import DebtBalance from "./DebtBalance";


const Step6 = ({idTracking}) => {
    const token = localStorage.getItem('token')
    const UserChecked = localStorage.getItem('Role');

    const [loading, setLoading] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [trueMsg, setTrueMsg] = useState('')
    const [errIdent, setErrIdent] = useState(null)
    const [errIdentDis, setErrIdentDis] = useState(false)

    const [fileNumber, setFileNumber] = useState()
    const [totalFund, setTotalFund] = useState()
    const [customDeceasedDocumentIdentity, setCustomDeceasedDocumentIdentity] = useState()
    const [contractNumber, setContractNumber] = useState()
    const [contractDate, setContractDate] = useState()
    const [insuranceCapital, setInsuranceCapital] = useState()
    const [totalNumberOfInstallments, setTotalNumberOfInstallments] = useState()

    const [systemState, setSystemState] = useState();

    useEffectOnce(() => {
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
    });


    const handlePostDeath = async (e) => {

        e.preventDefault()
        setLoading(true)

        try {
            await axiosHandler.post("/DeceasedDocument/AddOrUpdateContractSpecifications", JSON.stringify(
                    {
                        "deceasedDocumentId": parseInt(idTracking),
                        "fileNumber": parseInt(fileNumber),
                        "totalFund": parseInt(totalFund),
                        "customDeceasedDocumentIdentity": customDeceasedDocumentIdentity,
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
                setTrueMsg(null)
                setLoading(false)
                setErrMsg('خطا! دوباره امتحان کنید.')
            }
        }
    }

    useEffectOnce(() => {
        axios.post(`/DeceasedDocument/GetContractSpecifications`, idTracking,
            {headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                },})
            .then(response => {
                setFileNumber(response.data.fileNumber)
                setTotalFund(response.data.totalFund)
                setCustomDeceasedDocumentIdentity(response.data.customDeceasedDocumentIdentity)
                setContractNumber(response.data.contractNumber)
                setContractDate(response.data.contractDate)
                setInsuranceCapital(response.data.insuranceCapital)
                setTotalNumberOfInstallments(response.data.totalNumberOfInstallments)
            });
    })


    const downloadPdf = () => {
        axios.post("/DeceasedDocument/GetDeceasedDocumentPdf", parseInt(idTracking),
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
                let fileName = "document.pdf"
                file.href = url;
                file.setAttribute("download", fileName);
                document.body.appendChild(file)
                file.click();
                file.remove();
            })
    }

    return (
        <Fragment>
            <Card>
                {contractDate ?
                    <>
                        <CardBody className="">
                            <p className="text-center f-26">
                                مشخصات قرارداد
                            </p>
                            <p className="text-center f-26">
                                <Btn attrBtn={{color: 'danger', size: 'sm', onClick: downloadPdf }}>بارگیری فایل PDF</Btn>
                                &nbsp;&nbsp;
                                <DebtBalance idTracking={idTracking} />
                                &nbsp;&nbsp;
                                <UploadFileDeceasedDocument idTracking={idTracking} />
                            </p>
                            <Row className="mt-5 justify-content-between gap-2">
                                <div className="col">

                                    <FormGroup className="row" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col-sm-4 col-form-label f-20">شماره قرارداد : </Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">{contractNumber ? contractNumber : "- - -"}</Label>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col-sm-4 col-form-label f-20">تاریخ قرارداد : </Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">{contractDate ? shamsi.gregorianToJalali(contractDate).join('/') : "- - -"}</Label>
                                        </Col>
                                    </FormGroup>


                                        {UserChecked === "BranchesManager"
                                            ?
                                            <FormGroup className="row" style={{border : "1px dashed #5655e5"}}>
                                                <Label className="col-sm-4 col-form-label f-18">تعداد اوراق :</Label>
                                                <Col sm="12" className="">
                                                    <Label
                                                        className="f-20">{fileNumber ? fileNumber : "- - -"}</Label>
                                                </Col>
                                            </FormGroup>
                                            :
                                            <FormGroup className="row">
                                                <Label className="col-12 col-form-label f-18">تعداد اوراق :</Label>
                                                <Col sm="12">
                                                    <Input type="number" name="number" className="form-control input-air-primary"
                                                           placeholder="اینجا وارد کنید..."
                                                           onChange={e => setFileNumber(e.target.value)}
                                                           value={fileNumber}
                                                           min={0}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        }

                                </div>
                                <div className="col">

                                    <FormGroup className="row" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col-sm-4 col-form-label f-20">تعداد اقساط :</Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">{totalNumberOfInstallments ? totalNumberOfInstallments : "- - -"}</Label>
                                        </Col>
                                    </FormGroup>


                                    <FormGroup className="row" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col-sm-4 col-form-label f-20">سرمایه قرارداد :</Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">
                                                {insuranceCapital ?
                                                    Converter.threeDigitSeparator(insuranceCapital) + " ریال "
                                                    :
                                                    "- - -"
                                                }
                                            </Label>
                                        </Col>
                                    </FormGroup>

                                        {UserChecked === "BranchesManager" && systemState !== 1
                                            ?
                                            <FormGroup className="row" style={{border : "1px dashed #5655e5"}}>
                                                <Label className="col-12 col-form-label f-18">مبلغ مانده بدهی به تاریخ موثر فوت : </Label>
                                                <Col sm="12" className="">
                                                    <Label className="f-20">{totalFund ? Converter.threeDigitSeparator(totalFund) : "- - -"} ریال </Label>
                                                </Col>
                                            </FormGroup>
                                            :

                                            <FormGroup className="row">
                                                <Label className="col-12 col-form-label f-18">مبلغ مانده بدهی به تاریخ موثر فوت :</Label>
                                                <Col sm="12">
                                                    <Input type="number" name="number" className="form-control input-air-primary" placeholder="اینجا وارد کنید..."
                                                           onChange={e => setTotalFund(e.target.value)}
                                                           value={totalFund}
                                                           min={0}
                                                    />
                                                    <span>
                                                        {totalFund &&
                                                            Converter.threeDigitSeparator(totalFund) + ' ریال '
                                                        }
                                                    </span>
                                                </Col>
                                            </FormGroup>
                                        }


                                </div>

                                    {UserChecked === "BranchesManager"
                                        ?
                                        <FormGroup className="row mx-auto" style={{border : "1px dashed #5655e5"}}>
                                            <Label className="col-12 col-form-label f-18">شماره پرونده :</Label>
                                            <Col sm="12" className="">
                                                <Label className="f-20">{customDeceasedDocumentIdentity}</Label>
                                            </Col>
                                        </FormGroup>
                                        :
                                        <FormGroup className="row">
                                            <Label className="col-sm-4 col-form-label f-18">شماره پرونده :</Label>
                                            <Col sm="8">
                                                <Input type="text" name="text" className="form-control input-air-primary"
                                                       placeholder="اینجا وارد کنید..."
                                                       onChange={e => {
                                                           setCustomDeceasedDocumentIdentity(e.target.value)
                                                           axios.post("/DeceasedDocument/IsDeceasedDocumentHasOtherPerson", JSON.stringify(
                                                                   {
                                                                       'deceasedDocumentId': idTracking,
                                                                       'newCustomDeceasedDocumentIdentity': e.target.value,
                                                                   }),
                                                               {
                                                                   headers: {
                                                                       "Content-Type": "application/json",
                                                                       "Authorize": token
                                                                   },
                                                               })
                                                               .then(response => {
                                                                   if (response.data.isExist) {
                                                                       setErrIdent('نام : ' + response.data.person.fullName + ' - ' + 'کدملی : ' + response.data.person.nationalCode)
                                                                       setErrIdentDis(true)
                                                                   } else {
                                                                       setErrIdent(null)
                                                                       setErrIdentDis(false)
                                                                   }
                                                               })
                                                       }}
                                                       value={customDeceasedDocumentIdentity}
                                                       min={0}
                                                />
                                                {errIdent &&
                                                    <Alerts attrAlert={{color: 'danger', className: "mt-2"}}>
                                                        {errIdent}
                                                    </Alerts>
                                                }
                                            </Col>
                                        </FormGroup>
                                    }

                            </Row>
                            <Row className="col-12 mt-3">
                                {UserChecked === "BranchesManager" && systemState !== 1 ?
                                    ''
                                    :
                                    <Btn attrBtn={{
                                        color: 'primary',
                                        className: 'col-4 mx-auto',
                                        disabled: loading ? loading : errIdentDis ? errIdentDis : errIdentDis,
                                        onClick: (e) => handlePostDeath(e)
                                    }}>{loading ? 'درحال ذخیره...' : errIdentDis ? 'شماره پرونده را اصلاح کنید' : 'ذخیره'}</Btn>
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
                    </>
                :
                    <>
                        <p className="text-center f-26">
                            مشخصات قرارداد
                        </p>
                        <BoxLoader />
                    </>
                }
            </Card>
            {
                systemState === 1 ?
                    <SendToInsurer idTracking={idTracking}/>
                        :
                        <span className="pull-right">ارسال شده به بیمه گر</span>
            }
        </Fragment>
    );
};
export default Step6;