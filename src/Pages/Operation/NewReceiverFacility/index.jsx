import React, {Fragment, useState} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import {axiosHandler} from "../../../api/axios";
import NewReceiverFacilityTable from "./Table";
import CreateNewReceiverFacility from "./CreateReceiverFacility";
import NewReceiverFacilityAccordion from "./Accordion";
import EditReceiverFacilityModal from "./modal";
import * as shamsi from "shamsi-date-converter";
import {toast} from "react-toastify";

const NewReceiverFacility = () => {

    const token = localStorage.getItem('token');


    const [sendProps, setSendProps] = useState()

    const handleGetNationalId = async (e, nationalIdSearchRes) => {

        setSendProps(null);

        await axiosHandler.post("/MaskanMehrPerson/FindByNationalCode", JSON.stringify(nationalIdSearchRes),
            {
                headers: {
                    "accept": "text/plain",
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response =>
                <>
                    {
                        response.data ?

                            setSendProps(
                                <tr key={response.data.id}>
                                    <td>{response.data.id ? response.data.id : '- - -'}</td>
                                    <td><b>{response.data.firstName ? response.data.firstName : '- - -'}</b></td>
                                    <td><b>{response.data.lastName ? response.data.lastName : '- - -'}</b></td>
                                    <td>{response.data.nationalCode ? response.data.nationalCode : '- - -'}</td>
                                    <td>{response.data.mobileNumber ? response.data.mobileNumber : '- - -'}</td>
                                    <td>{response.data.birthDate ?
                                        <>
                                            {
                                                response.data.birthDate === "0001-01-01T00:00:00"
                                                    ?
                                                    'ثبت اشتباه'
                                                    :
                                                    shamsi.gregorianToJalali(response.data.birthDate).join('/')
                                            }
                                        </>
                                        : '- - -'}</td>
                                    <td>{response.data.issuance ? response.data.issuance : '- - -'}</td>
                                    <td><EditReceiverFacilityModal handleGetNationalId={handleGetNationalId()}
                                                                   nationalCodeForEdit={response.data.nationalCode}
                                                                   userId={response.data.id}/></td>
                                </tr>
                            )

                            :
                            toast.error('موردی یافت نشد!', {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 1000
                            })
                    }
                </>
            )
        }

    const handleGetFullName = async (e, firstNameSearchRes, lastNameSearchRes) => {

        setSendProps(null);

        await axiosHandler.post("/MaskanMehrPerson/Find", JSON.stringify(
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
            .then(response =>
                <>
                    {
                        setSendProps(response.data.map((item) =>
                            <tr key={item.id}>
                                <td>{item.id ? item.id : '- - -'}</td>
                                <td><b>{item.firstName ? item.firstName : '- - -'}</b></td>
                                <td><b>{item.lastName ? item.lastName : '- - -'}</b></td>
                                <td>{item.nationalCode ? item.nationalCode : '- - -'}</td>
                                <td>{item.mobileNumber ? item.mobileNumber : '- - -'}</td>
                                <td>{item.birthDate ?
                                    <>
                                        {
                                            item.birthDate === "0001-01-01T00:00:00"
                                                ?
                                                'ثبت اشتباه'
                                                :
                                                shamsi.gregorianToJalali(item.birthDate).join('/')
                                        }
                                    </>
                                : '- - -'}</td>
                                <td>{item.issuance ? item.issuance : '- - -'}</td>
                                <td><EditReceiverFacilityModal handleGetFullName={handleGetFullName}
                                                               nationalCodeForEdit={item.nationalCode}
                                                               userId={item.id}/></td>
                            </tr>
                        ))
                    }
                </>

            )
    };


    return (
        <Fragment>
            <Breadcrumbs parent="عملیات" title="تسهیلات گیرنده جدید" label={<CreateNewReceiverFacility />} />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <NewReceiverFacilityAccordion handleGetNationalId={handleGetNationalId} handleGetFullName={handleGetFullName} />
                            </CardBody>

                            <CardBody>
                                <NewReceiverFacilityTable sendProps={sendProps} />
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default NewReceiverFacility;