import { Row, Col, Table } from 'reactstrap';
import React, {useState} from 'react';
import {axiosHandler} from "../../api/axios";
import UserManagementModal from "./modal";
import BoxLoader from "../../Layout/Loader/box-loader";
import {useEffectOnce} from "react-use";

const UserManagementTable = ({sendProps, handleGet, getUsers, isLoading}) => {


    return (
        <Row className="card-block">
            <Col sm="12" lg="12" xl="12">
                <div className="table-responsive">
                    <Table>
                        <thead className="table-primary">
                        <tr>
                            <th scope="col">آیدی</th>
                            <th scope="col">نام</th>
                            <th scope="col">نام خانوادگی</th>
                            <th scope="col">نام کاربری</th>
                            <th scope="col">نوع کاربر</th>
                            <th scope="col">استان</th>
                            <th scope="col">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sendProps ?
                                <tr key={sendProps.id}>
                                    <td><b>{sendProps.id}</b></td>
                                    <td>{sendProps.firstName ? sendProps.firstName : '- - -'}</td>
                                    <td>{sendProps.lastName}</td>
                                    <td>{sendProps.userName}</td>
                                    <td>{sendProps.role}</td>
                                    <td>{sendProps.manager ? sendProps.manager : '- - -'}</td>
                                    <td><UserManagementModal handleGet={handleGet} idUserForEdit={sendProps.id} /></td>
                                </tr>
                            :
                                getUsers
                        }
                        </tbody>
                    </Table>
                </div>
            </Col>
            {isLoading &&
                <tr key="1">
                    <BoxLoader/>
                </tr>
            }
        </Row>
    );
};
export default UserManagementTable;