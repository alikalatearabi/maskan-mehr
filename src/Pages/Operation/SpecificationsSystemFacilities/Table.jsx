import { Row, Col, Table } from 'reactstrap';
import * as shamsi from "shamsi-date-converter";
import React from "react";
import SpecificationsSystemFacilitiesModal from "./Modal";
import Remove from "./remove";

const SpecificationsSystemFacilitiesTable = ({sendProps}) => {
    const UserChecked = localStorage.getItem('Role');

    return (
        <Row className="card-block">
            <Col sm="12" lg="12" xl="12">
                <div className="table-responsive">
                    <Table>
                        <thead className="table-primary">
                        <tr>
                            <th scope="col">کد پیگیری</th>
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
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.person.contractNumber}</td>
                                        <td><b>{item.person.fullName}</b></td>
                                        <td>{item.person.fatherName}</td>
                                        <td>{item.person.nationalCode}</td>
                                        <td>{item.person.identity}</td>
                                        <td>
                                            {item.person.birthDate ?
                                                <>
                                                    {
                                                        item.person.birthDate === "0001-01-01T00:00:00"
                                                            ?
                                                            'ثبت اشتباه'
                                                            :
                                                            shamsi.gregorianToJalali(item.person.birthDate).join('/')
                                                    }
                                                </>
                                                : '- - -'}
                                        </td>
                                        <td>{item.person.contractDate ? shamsi.gregorianToJalali(item.person.contractDate).join('/') : "- - -"}</td>
                                        <td>
                                            <SpecificationsSystemFacilitiesModal idTracking={item.id} />
                                            {UserChecked === "Admin" &&
                                                <Remove idTracking={item.id}/>
                                            }
                                        </td>
                                    </tr>
                                )
                            :
                            <tr key="1">
                                <td colSpan="9">لطفا جستجو کنید</td>
                            </tr>
                        }
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>
    );
};
export default SpecificationsSystemFacilitiesTable;