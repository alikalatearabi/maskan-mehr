import {Row, Col, Table} from 'reactstrap';
import React from 'react';
import BoxLoader from "../../../../../Layout/Loader/box-loader";

const DebtBalanceTable = ({showData, isLoading}) => {


    return (
        <Row className="card-block">
            <Col sm="12" lg="12" xl="12">
                <div className="table-responsive">
                    <Table>
                        <thead className="table-primary">
                        <tr>
                            <th scope="col">تعداد اقساط</th>
                            <th scope="col">مبلغ اقساط</th>
                            <th scope="col">جمع اقساط</th>
                            <th scope="col">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showData ? showData : isLoading ? '' :
                            <tr key="1">
                                <td colSpan={5}>پرداختی وجود ندارد</td>
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
export default DebtBalanceTable;