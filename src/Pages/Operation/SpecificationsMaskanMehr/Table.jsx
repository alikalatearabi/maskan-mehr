import React, {useState} from 'react';
import {Row, Col, Table, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import "./Table.css"
import * as shamsi from "shamsi-date-converter";
import AcceptPerson from "./modal";
import BoxLoader from "../../../Layout/Loader/box-loader";

const SpecificationsMaskanMehrTable = ({sendProps, isLoading}) => {


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
                            <th scope="col">تاریخ قرارداد</th>
                            <th scope="col">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                            { sendProps
                                ?
                                    sendProps.map((item) =>
                                        {

                                            return(
                                                <tr key={item.contractNumber}>
                                                    <td>{item.contractNumber}</td>
                                                    <td><b>{item.fullName}</b></td>
                                                    <td>{item.fatherName}</td>
                                                    <td>{item.nationalCode}</td>
                                                    <td>{item.identity}</td>
                                                    <td>
                                                        {item.birthDate ?
                                                            <>
                                                                {
                                                                    item.birthDate === "0001-01-01T00:00:00"
                                                                        ?
                                                                        'ثبت اشتباه'
                                                                        :
                                                                        shamsi.gregorianToJalali(item.birthDate).join('/')
                                                                }
                                                            </>
                                                            : '- - -'}
                                                    </td>
                                                    <td>{item.contractDate ? shamsi.gregorianToJalali(item.contractDate).join('/') : "- - -"}</td>
                                                    <td>
                                                        <Row>
                                                            <Col>
                                                                {item.contractNumber && <AcceptPerson contractNumberShow={item.contractNumber} contractId={item.contractId} />}
                                                            </Col>
                                                        </Row>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                : isLoading ?
                                    <tr key="1">
                                    </tr>
                                :
                                    <tr key="1">
                                        <td colSpan="9">لطفا جستجو کنید</td>
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
export default SpecificationsMaskanMehrTable;