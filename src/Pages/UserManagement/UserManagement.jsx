import React, {Fragment, useState} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import UserManagementTable from "./Table";
import Breadcrumbs from "../../CommonElements/Breadcrumbs";
import UserManagementAccordion from "./Accordion";
import CreateNewUser from "./CreateNewUser";
import {axiosHandler} from "../../api/axios";
import UserManagementModal from "./modal";
import {useEffectOnce} from "react-use";

const UserManagement = () => {

    const token = localStorage.getItem('token');


    const [sendProps, setSendProps] = useState()

    const [getUsers, setGetUsers] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const handleGetId = async (e, idSearchRes) => {

        e.preventDefault();
        setSendProps(null);

        await axiosHandler.post("/User/Find/", idSearchRes,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {

                setSendProps(response.data)

            })
    };

    const handleGetUserName = async (e, userNameSearchRes) => {

        e.preventDefault();
        setSendProps(null);

        await axiosHandler.post("/User/FindUser", userNameSearchRes,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {

                setSendProps(response.data)

            }
        )
    };

    const handleGet = (e) => {
        setIsLoading(true)
        setSendProps(null)

        axiosHandler.get("/User/All",
            {
                headers: {
                    "Authorize": token
                }
            })
            .then(response => {
                setGetUsers(response.data.reverse().map((item) =>
                    <tr key={item.id}>
                        <td><b>{item.id}</b></td>
                        <td>{item.firstName ? item.firstName : '- - -'}</td>
                        <td>{item.lastName}</td>
                        <td>{item.userName}</td>
                        <td>{item.role}</td>
                        <td>{item.manager ? item.manager : '- - -'}</td>
                        <td><UserManagementModal handleGet={handleGet} idUserForEdit={item.id} /></td>
                    </tr>
                ))
                setIsLoading(false)
            })
    }
    useEffectOnce(() => handleGet() )


    return (
        <Fragment>
            <Breadcrumbs parent="عملیات بروی کاربران" title="لیست کاربران" label={<CreateNewUser handleGet={handleGet} />} />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <UserManagementAccordion handleGetId={handleGetId} handleGetUserName={handleGetUserName} />
                            </CardBody>

                            <CardBody>
                                <UserManagementTable sendProps={sendProps} handleGet={handleGet} getUsers={getUsers} isLoading={isLoading} />
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default UserManagement;