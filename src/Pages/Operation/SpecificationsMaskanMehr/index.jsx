import {Breadcrumbs} from '../../../AbstractElements';
import React, {Fragment, useState} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import SpecificationsMaskanMehrTable from "./Table";
import SpecificationsMaskanMehrAccordion from "./Accordion";
import {axiosHandler} from "../../../api/axios";

const SpecificationsMaskanMehr = () => {

    const token = localStorage.getItem('token')

    const [sendProps, setSendProps] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const handleGetNumberContract = async (e, handleGetNumberContract) => {

        e.preventDefault();
        setSendProps(null);
        setIsLoading(true);

        await axiosHandler.post("/MaskanMehrInsuranceContract/FindByContractNumber", parseInt(handleGetNumberContract),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(response => {

            setSendProps(response.data)
            setIsLoading(false);

        }).catch(err => {
            setIsLoading(false);
        })
    }

    const handleGetNationalId = async (e, nationalIdFiledSearch) => {

        e.preventDefault();
        setSendProps(null);
        setIsLoading(true);

        await axiosHandler.post("/MaskanMehrInsuranceContract/FindByNationalCode", JSON.stringify(nationalIdFiledSearch),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(response => {

            setSendProps(response.data)
            setIsLoading(false);

        }).catch(err => {
            setIsLoading(false);
        })
    }

    const handleGetFullName = async (e, nameFiledSearch, lastNameFiledSearch) => {

        e.preventDefault();
        setSendProps(null);
        setIsLoading(true);

        await axiosHandler.post("/MaskanMehrInsuranceContract/FindByFullName", JSON.stringify(
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
            setIsLoading(false);

        }).catch(err => {
            setIsLoading(false);
        })
    }

    return (
        <Fragment>
            <Breadcrumbs parent="عملیات" title="مشخصات مسکن مهر" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <SpecificationsMaskanMehrAccordion handleGetNumberContract={handleGetNumberContract} handleGetNationalId={handleGetNationalId} handleGetFullName={handleGetFullName} />
                            </CardBody>

                            <CardBody>
                                <SpecificationsMaskanMehrTable sendProps={sendProps} isLoading={isLoading} />
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default SpecificationsMaskanMehr;