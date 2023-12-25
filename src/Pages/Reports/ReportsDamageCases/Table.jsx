import {Row, Col, Table} from 'reactstrap';
import React from 'react';
import BoxLoader from "../../../Layout/Loader/box-loader";
import {Btn} from "../../../AbstractElements";
import dateTime2 from "../../../Component/Forms/Form Widgets/Date and Time/DateTime2";
import timeAndDate from "../../../Component/Forms/Form Widgets/Form Date Rangepicker/TimeAndDate";

const ReportsDamageCasesTable = ({sendPropsKey, sendProps, isLoading, valueCount, handleGetReportPagerPos, handleGetReportPagerNeg, pageNumber}) => {


    return (
        <Row className="card-block">
            <Col sm="12" lg="12" xl="12">
                <div className="table-responsive" style={sendPropsKey && {height: 500}}>
                    <Table>
                        <thead style={{position: "sticky", top: 0, backgroundColor: "#805dca", color: "#ffffff"}} className="table-primary">
                            {sendPropsKey ?
                                    sendPropsKey
                                :
                                    <tr>
                                        <th style={{color: "#ffffff"}}>نامشخص</th>
                                    </tr>
                            }
                        </thead>
                        <tbody>
                            {sendProps
                                ?
                                    <>
                                        {sendProps}
                                    </>
                                : isLoading ?
                                    ''
                                    :
                                        <tr>
                                            <td>لطفا گزارش خود را انتخاب کنید.</td>
                                        </tr>
                            }
                        </tbody>
                    </Table>
                </div>
                <div className="row">
                    <div className="col-12">
                        {valueCount &&
                            <>
                                 <div className="row mt-2">
                                    <div className="col-sm text-right">
                                        صفحه {pageNumber} از {valueCount}
                                    </div>
                                    <div className="col-sm text-center">
                                        <Btn attrBtn={{
                                            color: 'primary',
                                            className: 'mx-auto',
                                            onClick: (e) => handleGetReportPagerNeg(valueCount)
                                        }}> قبلی </Btn>
                                        &nbsp;
                                        <Btn attrBtn={{
                                            color: 'primary',
                                            className: 'mx-auto',
                                            onClick: (e) => handleGetReportPagerPos(valueCount)
                                        }}> بعدی </Btn>
                                    </div>
                                 </div>

                            </>
                        }
                    </div>
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
export default ReportsDamageCasesTable;
