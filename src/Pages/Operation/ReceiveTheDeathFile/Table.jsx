import { Row, Col, Table } from 'reactstrap';
import React from 'react';

const ReceiveTheDeathFileTable = ({sendProps}) => {

    return (
        <Row className="card-block">
            <Col sm="12" lg="12" xl="12">
                <div className="table-responsive">
                    <Table>
                        <thead className="table-primary">
                        <tr>
                            <th scope="col">شماره قرارداد</th>
                            <th scope="col">نام و نام خانوادگی</th>
                            <th scope="col">نام پدر</th>
                            <th scope="col">کد ملی</th>
                            <th scope="col">شماره شناسنامه</th>
                            <th scope="col">تاریخ تولد</th>
                            <th scope="col">صدور</th>
                            <th scope="col">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sendProps
                            ?
                                sendProps
                            :
                                <tr key="1">
                                    <td colSpan="8">لطفا جستجو کنید</td>
                                </tr>
                        }
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>
    );
};
export default ReceiveTheDeathFileTable;