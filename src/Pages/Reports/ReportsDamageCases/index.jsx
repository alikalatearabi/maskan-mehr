import {Breadcrumbs} from '../../../AbstractElements';
import React, {Fragment, useState} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import ReportsDamageCasesTable from "./Table";
import ReportsDamageCasesAccordion from "./Accordion";
import AddNewReport from "./AddNewReport/AddNewReport";
import axios, {axiosHandler} from "../../../api/axios";
import "./custom.css"
import GetGeneralReport from "./GetGeneralReport/GetGeneralReport";
import {toast} from "react-toastify";
import * as Converter from "persian-currency-converter";

const ReportsDamageCases = () => {

    const token = localStorage.getItem('token');

    const [sendProps, setSendProps] = useState(null);
    const [sendPropsKey, setSendPropsKey] = useState(null);

    const [binaryData, setBinaryData] = useState(null);
    const [binaryDataLoad, setBinaryDataLoad] = useState(false);

    const [pageNumber, setPageNumber] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const nuller = (e) => {
        setPageNumber(0)
        setValueCount(null)
    }

    const handleGetReportExcel = (e, reportSelect, reportStartDate, reportEndDate) => {

        setDownloading(true)

        axios.post("/Report/GetExcelReport", JSON.stringify(
            {
                "reportId": parseInt(reportSelect),
                "startDateTime": reportStartDate,
                "endDataTime": reportEndDate
            }
        ), {
            headers: {
                "Content-type": "application/json",
                "Authorize": token
            },
            responseType: 'blob'
        })
            .then(response => {
                setBinaryData(window.URL.createObjectURL(response.data))
                setBinaryDataLoad(false)
                setDownloading(false)
            });
    }

    const [valueCount, setValueCount] = useState(null);

    const [epCount, setEpCount] = useState(null);
    const [reportIdCount, setReportIdCount] = useState(null);
    const [startDateTimeCount, setStartDateTimeCount] = useState(null);
    const [endDataTimeCount, setEndDataTimeCount] = useState(null);

    const handleGetReportCount = (e, reportSelect, reportStartDate, reportEndDate) => {

        setEpCount(e)
        setReportIdCount(reportSelect)
        setStartDateTimeCount(reportStartDate)
        setEndDataTimeCount(reportEndDate)

        if (startDateTimeCount === "") {
            setStartDateTimeCount(null)
        }
        if (endDataTimeCount === "") {
            setEndDataTimeCount(null)
        }

        axiosHandler.post("/Report/GetGridReportCount", JSON.stringify(
            {
                "reportId": parseInt(reportSelect),
                "startDateTime": reportStartDate,
                "endDataTime": reportEndDate,
                "pageNumber": null
            }
        ), {
            headers: {
                "Content-Type": "application/json",
                "Authorize": token
            }

        }).then(response => {
            setValueCount(parseInt(response.data / 100) + 1)
        })
    }

    const handleGetReportPagerPos = () => {
        setPageNumber(pageNumber + 1)

        handleGetReport(epCount, reportIdCount, startDateTimeCount, endDataTimeCount);
    }
    const handleGetReportPagerNeg = () => {
        if (pageNumber !== 0) {
            setPageNumber(pageNumber - 1)
        }

        handleGetReport(epCount, reportIdCount, startDateTimeCount, endDataTimeCount);
    }

    const handleGetReport = (e, reportIdCount, startDateTimeCount, endDataTimeCount) => {

        setSendPropsKey(null)
        setSendProps(null)
        setBinaryData(null)
        setIsLoading(true)

        if (startDateTimeCount === "") {
            setStartDateTimeCount(null)
        }
        if (endDataTimeCount === "") {
            setEndDataTimeCount(null)
        }

        axiosHandler.post("/Report/GetGridReport", JSON.stringify(
            {
                "reportId": parseInt(reportIdCount),
                "startDateTime": startDateTimeCount,
                "endDataTime": endDataTimeCount,
                "pageNumber": pageNumber + 1
            }
        ), {
            headers: {
                "Content-Type": "application/json",
                "Authorize": token
            }

        }).then(response => {

            setBinaryDataLoad(true)
            setSendProps(
                response.data.map((item, i) =>
                    <tr key={i} >
                        {item["firstName"] &&
                            <>
                                {item["firstName"] ?
                                    <td>{item["firstName"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["lastName"] &&
                            <>
                                {item["lastName"] ?
                                    <td>{item["lastName"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["identity"] &&
                            <>
                                {item["identity"] ?
                                    <td>{item["identity"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["nationalCode"] &&
                            <>
                                {item["nationalCode"] ?
                                    <td>{item["nationalCode"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["birthDate"] &&
                            <>
                                {item["birthDate"] ?
                                    <td>{item["birthDate"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["fatherName"] &&
                            <>
                                {item["fatherName"] ?
                                    <td>{item["fatherName"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["issuance"] &&
                            <>
                                {item["issuance"] ?
                                    <td>{item["issuance"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["contractNumber"] &&
                            <>
                                {item["contractNumber"] ?
                                    <td>{item["contractNumber"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["contractDate"] &&
                            <>
                                {item["contractDate"] ?
                                    <td>{item["contractDate"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["insuranceCapital"] &&
                            <>
                                {item["insuranceCapital"] ?
                                    <td>{Converter.threeDigitSeparator(item["insuranceCapital"])}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["lifeInsurancePremium"] &&
                            <>
                                {item["lifeInsurancePremium"] ?
                                    <td>{Converter.threeDigitSeparator(item["lifeInsurancePremium"])}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["dateOfRegistration"] &&
                            <>
                                {item["dateOfRegistration"] ?
                                    <td>{item["dateOfRegistration"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["totalNumberOfInstallments"] &&
                            <>
                                {item["totalNumberOfInstallments"] ?
                                    <td>{item["totalNumberOfInstallments"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["branchCode"] &&
                            <>
                                {item["branchCode"] ?
                                    <td>{item["branchCode"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["branchName"] &&
                            <>
                                {item["branchName"] ?
                                    <td>{item["branchName"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["managerCode"] &&
                            <>
                                {item["managerCode"] ?
                                    <td>{item["managerCode"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["managerName"] &&
                            <>
                                {item["managerName"] ?
                                    <td>{item["managerName"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["dateOfDeath"] &&
                            <>
                                {item["dateOfDeath"] ?
                                    <td>{item["dateOfDeath"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["title"] &&
                            <>
                                {item["title"] ?
                                    <td>{item["title"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["typeOfDeath"] &&
                            <>
                                {item["typeOfDeath"] ?
                                    <td>{item["typeOfDeath"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["placeOfDeath"] &&
                            <>
                                {item["placeOfDeath"] ?
                                    <td>{item["placeOfDeath"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["detailOfDeath"] &&
                            <>
                                {item["detailOfDeath"] ?
                                    <td>{item["detailOfDeath"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["fileNumber"] &&
                            <>
                                {item["fileNumber"] ?
                                    <td>{item["fileNumber"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["totalFund"] &&
                            <>
                                {item["totalFund"] ?
                                    <td>{Converter.threeDigitSeparator(item["totalFund"])}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["payedAmount"] &&
                            <>
                                {item["payedAmount"] ?
                                    <td>{Converter.threeDigitSeparator(item["payedAmount"])}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["chequeNumber"] &&
                            <>
                                {item["chequeNumber"] ?
                                    <td>{item["chequeNumber"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["chequeDate"] &&
                            <>
                                {item["chequeDate"] ?
                                    <td>{item["chequeDate"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["DateOfReceivedAmount"] &&
                            <>
                                {item["DateOfReceivedAmount"] ?
                                    <td>{item["DateOfReceivedAmount"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["IsPaya"] &&
                            <>
                                {item["IsPaya"] ?
                                    <td>{item["IsPaya"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["payedAmount1"] &&
                            <>
                                {item["payedAmount1"] ?
                                    <td>{Converter.threeDigitSeparator(item["payedAmount1"])}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["chequeNumber1"] &&
                            <>
                                {item["chequeNumber1"] ?
                                    <td>{item["chequeNumber1"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["chequeDate1"] &&
                            <>
                                {item["chequeDate1"] ?
                                    <td>{item["chequeDate1"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["DateOfReceivedAmount1"] &&
                            <>
                                {item["DateOfReceivedAmount1"] ?
                                    <td>{item["DateOfReceivedAmount1"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["IsPaya1"] &&
                            <>
                                {item["IsPaya1"] ?
                                    <td>{item["IsPaya1"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["sumPays"] &&
                            <>
                                {item["sumPays"] ?
                                    <td>{Converter.threeDigitSeparator(item["sumPays"])}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["startCaseDatetime"] &&
                            <>
                                {item["startCaseDatetime"] ?
                                    <td>{item["startCaseDatetime"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["startDeceasedDocumentUserId"] &&
                            <>
                                {item["startDeceasedDocumentUserId"] ?
                                    <td>{item["startDeceasedDocumentUserId"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["UpdateDeceasedDocumentUserId"] &&
                            <>
                                {item["UpdateDeceasedDocumentUserId"] ?
                                    <td>{item["UpdateDeceasedDocumentUserId"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["closeCaseDatetime"] &&
                            <>
                                {item["closeCaseDatetime"] ?
                                    <td>{item["closeCaseDatetime"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["insurancePolicyNumber"] &&
                            <>
                                {item["insurancePolicyNumber"] ?
                                    <td>{item["insurancePolicyNumber"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["isUnkwownContract"] &&
                            <>
                                {item["isUnkwownContract"] ?
                                    <td>{item["isUnkwownContract"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["fileName"] &&
                            <>
                                {item["fileName"] ?
                                    <td>{item["fileName"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["isUnknownNationalCode"] &&
                            <>
                                {item["isUnknownNationalCode"] ?
                                    <td>{item["isUnknownNationalCode"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["ContractIdentity"] &&
                            <>
                                {item["ContractIdentity"] ?
                                    <td>{item["ContractIdentity"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["customDeceasedDocumentIdentity"] &&
                            <>
                                {item["customDeceasedDocumentIdentity"] ?
                                    <td>{item["customDeceasedDocumentIdentity"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["id"] &&
                            <>
                                {item["id"] ?
                                    <td>{item["id"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["dateSecretariatLetter"] &&
                            <>
                                {item["dateSecretariatLetter"] ?
                                    <td>{item["dateSecretariatLetter"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["insurerStatus"] &&
                            <>
                                {item["insurerStatus"] ?
                                    <td>{item["insurerStatus"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["insuranceCoverageStatus"] &&
                            <>
                                {item["insuranceCoverageStatus"] ?
                                    <td>{item["insuranceCoverageStatus"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["description"] &&
                            <>
                                {item["description"] ?
                                    <td>{item["description"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                        {item["responseInsurer"] &&
                            <>
                                {item["responseInsurer"] ?
                                    <td>{item["responseInsurer"]}</td>
                                    :
                                    <td>- - -</td>
                                }
                            </>
                        }
                    </tr>
                )
            )
            Object.entries(response.data.slice(0, 1)).map((itemKey) =>
                itemKey.map((item) =>
                    setSendPropsKey(
                        <tr>
                            {item["firstName"] &&
                                <th scope="col" style={{color: "#ffffff"}}>نام</th>
                            }
                            {item["lastName"] &&
                                <th scope="col" style={{color: "#ffffff"}}>نام خانوادگی</th>
                            }
                            {item["identity"] &&
                                <th scope="col" style={{color: "#ffffff"}}>کد شناسنامه</th>
                            }
                            {item["nationalCode"] &&
                                <th scope="col" style={{color: "#ffffff"}}>کد ملی</th>
                            }
                            {item["birthDate"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تاریخ تولد</th>
                            }
                            {item["fatherName"] &&
                                <th scope="col" style={{color: "#ffffff"}}>نام پدر</th>
                            }
                            {item["issuance"] &&
                                <th scope="col" style={{color: "#ffffff"}}>ثبت احوال</th>
                            }
                            {item["contractNumber"] &&
                                <th scope="col" style={{color: "#ffffff"}}>شماره قرارداد</th>
                            }
                            {item["contractDate"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تاریخ قرارداد</th>
                            }
                            {item["insuranceCapital"] &&
                                <th scope="col" style={{color: "#ffffff"}}>سرمایه بیمه</th>
                            }
                            {item["lifeInsurancePremium"] &&
                                <th scope="col" style={{color: "#ffffff"}}>حق بيمه عمر</th>
                            }
                            {item["dateOfRegistration"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تاریخ ثبت نام</th>
                            }
                            {item["totalNumberOfInstallments"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تعداد کل اقساط</th>
                            }
                            {item["branchCode"] &&
                                <th scope="col" style={{color: "#ffffff"}}>کد شعبه</th>
                            }
                            {item["branchName"] &&
                                <th scope="col" style={{color: "#ffffff"}}>نام شعبه</th>
                            }
                            {item["managerCode"] &&
                                <th scope="col" style={{color: "#ffffff"}}>کد مدیریت</th>
                            }
                            {item["managerName"] &&
                                <th scope="col" style={{color: "#ffffff"}}>نام مدیریت</th>
                            }
                            {item["dateOfDeath"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تاریخ فوت</th>
                            }
                            {item["title"] &&
                                <th scope="col" style={{color: "#ffffff"}}>علت دقیق فوت</th>
                            }
                            {item["typeOfDeath"] &&
                                <th scope="col" style={{color: "#ffffff"}}>نوع فوت</th>
                            }
                            {item["placeOfDeath"] &&
                                <th scope="col" style={{color: "#ffffff"}}>محل فوت</th>
                            }
                            {item["detailOfDeath"] &&
                                <th scope="col" style={{color: "#ffffff"}}>توضیحات فوت</th>
                            }
                            {item["fileNumber"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تعداد اوراق</th>
                            }
                            {item["totalFund"] &&
                                <th scope="col" style={{color: "#ffffff"}}>مبلغ مانده بدهی</th>
                            }
                            {item["payedAmount"] &&
                                <th scope="col" style={{color: "#ffffff"}}>مبلغ چک</th>
                            }
                            {item["chequeNumber"] &&
                                <th scope="col" style={{color: "#ffffff"}}>شماره چک</th>
                            }
                            {item["chequeDate"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تاریخ چک</th>
                            }
                            {item["DateOfReceivedAmount"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تاریخ دریافت مبلغ</th>
                            }
                            {item["IsPaya"] &&
                                <th scope="col" style={{color: "#ffffff"}}>نوع پرداختی</th>
                            }
                            {item["payedAmount1"] &&
                                <th scope="col" style={{color: "#ffffff"}}>مبلغ چک دوم</th>
                            }
                            {item["chequeNumber1"] &&
                                <th scope="col" style={{color: "#ffffff"}}>شماره چک دوم</th>
                            }
                            {item["chequeDate1"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تاریخ چک دوم</th>
                            }
                            {item["DateOfReceivedAmount1"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تاریخ دریافت مبلغ دوم</th>
                            }
                            {item["IsPaya1"] &&
                                <th scope="col" style={{color: "#ffffff"}}>نوع پرداختی دوم</th>
                            }
                            {item["sumPays"] &&
                                <th scope="col" style={{color: "#ffffff"}}>جمع تمام پرداختی</th>
                            }
                            {item["startCaseDatetime"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تاریخ ایجاد پرونده</th>
                            }
                            {item["startDeceasedDocumentUserId"] &&
                                <th scope="col" style={{color: "#ffffff"}}>کاربر ایجاد کننده</th>
                            }
                            {item["UpdateDeceasedDocumentUserId"] &&
                                <th scope="col" style={{color: "#ffffff"}}>کاربر ویرایش کننده</th>
                            }
                            {item["closeCaseDatetime"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تاریخ ویرایش</th>
                            }
                            {item["insurancePolicyNumber"] &&
                                <th scope="col" style={{color: "#ffffff"}}>شماره بیمه نامه</th>
                            }
                            {item["isUnkwownContract"] &&
                                <th scope="col" style={{color: "#ffffff"}}>نوع قرارداد</th>
                            }
                            {item["fileName"] &&
                                <th scope="col" style={{color: "#ffffff"}}>شماره فایل</th>
                            }
                            {item["isUnknownNationalCode"] &&
                                <th scope="col" style={{color: "#ffffff"}}>نوع کد ملی</th>
                            }
                            {item["ContractIdentity"] &&
                                <th scope="col" style={{color: "#ffffff"}}>شناسه قرارداد</th>
                            }
                            {item["customDeceasedDocumentIdentity"] &&
                                <th scope="col" style={{color: "#ffffff"}}>شماره پرونده</th>
                            }
                            {item["id"] &&
                                <th scope="col" style={{color: "#ffffff"}}>کد پیگیری</th>
                            }
                            {item["dateSecretariatLetter"] &&
                                <th scope="col" style={{color: "#ffffff"}}>تاریخ دبیرخانه</th>
                            }
                            {item["insurerStatus"] &&
                                <th scope="col" style={{color: "#ffffff"}}>وضعیت بیمه گر</th>
                            }
                            {item["insuranceCoverageStatus"] &&
                                <th scope="col" style={{color: "#ffffff"}}>وضعیت پوشش</th>
                            }
                            {item["description"] &&
                                <th scope="col" style={{color: "#ffffff"}}>توضیحات</th>
                            }
                            {item["responseInsurer"] &&
                                <th scope="col" style={{color: "#ffffff"}}>رای بیمه گر</th>
                            }
                        </tr>
                    )
                )
            )

            setIsLoading(false)

        })

    }
    return (
        <Fragment>
            <Breadcrumbs parent="عملیات" title="گزارشات پرونده های خسارت" label={<AddNewReport />} label2={<GetGeneralReport />}  />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <ReportsDamageCasesAccordion binaryData={binaryData} handleGetReportCount={handleGetReportCount} downloading={downloading} handleGetReport={handleGetReport} binaryDataLoad={binaryDataLoad} handleGetReportExcel={handleGetReportExcel} nuller={nuller} />
                            </CardBody>

                            <CardBody>
                                <ReportsDamageCasesTable sendProps={sendProps} sendPropsKey={sendPropsKey} isLoading={isLoading} handleGetReportPagerPos={handleGetReportPagerPos} handleGetReportPagerNeg={handleGetReportPagerNeg} valueCount={valueCount} pageNumber={pageNumber}/>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default ReportsDamageCases;