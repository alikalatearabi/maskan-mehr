import {Breadcrumbs} from '../../../AbstractElements';
import React, {Fragment, useState} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import SpecificationsSystemFacilitiesTable from "./Table";
import SpecificationsSystemFacilitiesAccordion from "./Accordion";
import {axiosHandler} from "../../../api/axios";

const SpecificationsSystemFacilities = () => {

    const token = localStorage.getItem('token')

    const [sendProps, setSendProps] = useState();

    const handleGetNumberContract = async (e, handleGetNumberContract) => {

        e.preventDefault()
        setSendProps(null);

        await axiosHandler.post("/DeceasedDocument/FindByContractNumber", parseInt(handleGetNumberContract),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(response => {

            setSendProps(response.data)

        })
    }

    const handleGetTrackingCode = async (e, trackingCodeFiledSearch) => {

        e.preventDefault()
        setSendProps(null);

        await axiosHandler.post("/DeceasedDocument/FindAsList", parseInt(trackingCodeFiledSearch),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(response => {

            setSendProps(response.data)

        })
    }

    const handleGetFullName = async (e, nameFiledSearch, lastNameFiledSearch) => {

        e.preventDefault()
        setSendProps(null);

        await axiosHandler.post("/DeceasedDocument/FindByPerson", JSON.stringify(
                {
                    "firstName": nameFiledSearch,
                    "lastName": lastNameFiledSearch
                }
            ),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(response => {

            setSendProps(response.data)

        })

    }

    const handleGetNationalCode = async (e, nationalCodeFiledSearch) => {

        e.preventDefault()
        setSendProps(null);

        await axiosHandler.post("/DeceasedDocument/FindByNationalCode", JSON.stringify(nationalCodeFiledSearch),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(response => {

            setSendProps(response.data)

        })

    }

    const handleGetNumberFile = async (e, numberFileFiledSearch) => {

        e.preventDefault()
        setSendProps(null);

        await axiosHandler.post("/DeceasedDocument/FindByCustomIdentity", JSON.stringify(numberFileFiledSearch),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(response => {

            setSendProps(response.data)

        })
    }

    return (
        <Fragment>
            <Breadcrumbs parent="عملیات" title="مشخصات تسهیلات سیستمی" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <SpecificationsSystemFacilitiesAccordion handleGetNumberFile={handleGetNumberFile} handleGetNationalCode={handleGetNationalCode} handleGetNumberContract={handleGetNumberContract} handleGetTrackingCode={handleGetTrackingCode} handleGetFullName={handleGetFullName} />
                            </CardBody>

                            <CardBody>
                                <SpecificationsSystemFacilitiesTable sendProps={sendProps} />
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default SpecificationsSystemFacilities;