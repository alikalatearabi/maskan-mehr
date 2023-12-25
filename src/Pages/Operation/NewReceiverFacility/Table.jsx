import { Row, Col, Table } from 'reactstrap';
import React from 'react';

const NewReceiverFacilityTable = ({sendProps}) => {

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
                            <th scope="col">کد ملی</th>
                            <th scope="col">شماره موبایل</th>
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
export default NewReceiverFacilityTable;