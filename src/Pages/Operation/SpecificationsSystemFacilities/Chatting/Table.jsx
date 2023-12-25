import { Row, Col, Table } from 'reactstrap';
import React from 'react';
import BoxLoader from "../../../../Layout/Loader/box-loader";

const ChattingTable = ({responseTable, dataLoopQ, isLoading}) => {




    return (
        <Row className="card-block">
            <Col sm="12" lg="12" xl="12">
                <div className="table-responsive">
                    <Table>
                        <thead className="table-primary">
                        <tr>
                            <th scope="col">نام فرستنده</th>
                            <th scope="col">نام گیرنده</th>
                            <th scope="col">نوع مکاتبه</th>
                            <th scope="col">شماره نامه</th>
                            <th scope="col">تاریخ نامه</th>
                            <th scope="col">تاریخ دریافت دبیرخانه</th>
                            <th scope="col">عملیات</th>

                        </tr>
                        </thead>
                        <tbody>

                        { dataLoopQ
                        ?
                            responseTable
                                : isLoading ?
                                ''
                                    :
                                    <tr>
                                        <td colSpan="9">
                                            هنوز مکاتبه ای ثبت نشده است
                                        </td>
                                    </tr>
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
export default ChattingTable;