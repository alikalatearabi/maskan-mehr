import React, {Fragment, useState} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import {axiosHandler} from "../../../api/axios";
import ReceiveTheDeathFileTable from "./Table";
import CreateReceiveTheDeathFile from "./CreateReceiveTheDeathFile";
import ReceiveTheDeathFileAccordion from "./Accordion";
import * as shamsi from "shamsi-date-converter";
import RemoveFile from "./remove";
import EditFileModal from "./modal";

const ReceiveTheDeathFile = () => {

    const token = localStorage.getItem('token');
    const UserChecked = localStorage.getItem('Role');

    const [sendProps, setSendProps] = useState()

    const handleGetNationalId = async (e, nationalIdSearchRes) => {

        e.preventDefault();
        setSendProps(null);

        await axiosHandler.post("/MaskanMehrInsuranceContract/FindByNationalCode", JSON.stringify(nationalIdSearchRes),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {

                setSendProps(
                    response.data.map((item) =>
                        <tr key={item.contractId}>
                            <td>{item.contractNumber}</td>
                            <td><b>{item.fullName}</b></td>
                            <td>{item.fatherName}</td>
                            <td>{item.nationalCode}</td>
                            <td>{item.identity}</td>
                            <td>
                                {item.birthDate ?
                                    <>
                                        {
                                            item.birthDate === "0001-01-01T00:00:00"
                                                ?
                                                'ثبت اشتباه'
                                                :
                                                shamsi.gregorianToJalali(item.birthDate).join('/')
                                        }
                                    </>
                                    : '- - -'}
                            </td>
                            <td>{item.contractDate ? shamsi.gregorianToJalali(item.contractDate).join('/') : "- - -"}</td>
                            <td>
                                <EditFileModal idItem={item.contractId} idContract={item.contractNumber} />
                                <RemoveFile idItem={item.contractId}  nationalCode={item.nationalCode} />
                            </td>
                        </tr>
                    )
                )

            })
    };

    const handleGetFullName = async (e, firstNameSearchRes, lastNameSearchRes) => {

        e.preventDefault();
        setSendProps(null);

        await axiosHandler.post("/MaskanMehrInsuranceContract/FindByFullName", JSON.stringify(
                {
                    "firstName": firstNameSearchRes,
                    "lastName": lastNameSearchRes
                }
            ),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {
                setSendProps(
                    response.data.map((item) =>
                        <tr key={item.contractNumber}>
                            <td>{item.contractNumber}</td>
                            <td><b>{item.fullName}</b></td>
                            <td>{item.fatherName}</td>
                            <td>{item.nationalCode}</td>
                            <td>{item.identity}</td>
                            <td>
                                {item.birthDate ?
                                    <>
                                        {
                                            item.birthDate === "0001-01-01T00:00:00"
                                                ?
                                                'ثبت اشتباه'
                                                :
                                                shamsi.gregorianToJalali(item.birthDate).join('/')
                                        }
                                    </>
                                    : '- - -'}
                            </td>
                            <td>{item.contractDate ? shamsi.gregorianToJalali(item.contractDate).join('/') : "- - -"}</td>
                            <td>
                                <EditFileModal idItem={item.contractId} idContract={item.contractNumber} />
                                <RemoveFile idItem={item.contractId}  nationalCode={item.nationalCode}/>
                            </td>
                        </tr>
                    )
                )

            })
    };

    const handleGetContractNumber = async (e, contractNumberRes) => {

        e.preventDefault();
        setSendProps(null);

        await axiosHandler.post("/MaskanMehrInsuranceContract/FindByContractNumber", parseInt(contractNumberRes),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {

                setSendProps(
                    response.data.map((item) =>
                        <tr key={item.contractNumber}>
                            <td>{item.contractNumber}</td>
                            <td><b>{item.fullName}</b></td>
                            <td>{item.fatherName}</td>
                            <td>{item.nationalCode}</td>
                            <td>{item.identity}</td>
                            <td>
                                {item.birthDate ?
                                    <>
                                        {
                                            item.birthDate === "0001-01-01T00:00:00"
                                                ?
                                                'ثبت اشتباه'
                                                :
                                                shamsi.gregorianToJalali(item.birthDate).join('/')
                                        }
                                    </>
                                    : '- - -'}
                            </td>
                            <td>{item.contractDate ? shamsi.gregorianToJalali(item.contractDate).join('/') : "- - -"}</td>
                            <td>
                                <EditFileModal idItem={item.contractId} idContract={item.contractNumber} />
                                <RemoveFile idItem={item.contractId} nationalCode={item.nationalCode}/>
                            </td>
                        </tr>
                    )
                )

            })
    };


    return (
        <Fragment>
            <Breadcrumbs parent="عملیات" title="قرارداد های مسکن مهر" label={<CreateReceiveTheDeathFile />}  />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <ReceiveTheDeathFileAccordion handleGetNationalId={handleGetNationalId} handleGetFullName={handleGetFullName} handleGetContractNumber={handleGetContractNumber} />
                            </CardBody>

                            <CardBody>
                                <ReceiveTheDeathFileTable sendProps={sendProps} />
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default ReceiveTheDeathFile;