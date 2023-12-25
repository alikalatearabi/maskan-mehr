import {Btn, ToolTip} from '../../AbstractElements';
import React, {Fragment, useState} from 'react';
import {Card, CardBody, Col, Table} from "reactstrap";
import EditCheque from "./EditCheque";
import "react-multi-date-picker/styles/layouts/mobile.css"
import * as shamsi from "shamsi-date-converter";
import axios from "../../api/axios";
import * as Converter from "persian-currency-converter";
import {useEffectOnce} from "react-use";


const SeePaymentsCheque = ({IdCheque}) => {

    const token = localStorage.getItem('token')

    const [Large, setLarge] = useState(false);
    const LargeModaltoggle = () => setLarge(!Large);

    const [basictooltip, setbasictooltip] = useState(false);
    const toggle = () => setbasictooltip(!basictooltip);

    const [dataLoop2, setDataLoop2] = useState(null);
    const [dataLoop, setDataLoop] = useState(null);

    useEffectOnce(async () => {
        try {

            await axios.post(`/Cheque/Find`, parseInt(IdCheque),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorize": token
                    },
                })
                .then(response => {
                    setDataLoop2(response.data["pays"].length)

                    setDataLoop(response.data["pays"].map((item, i) =>
                        <tr scope="row" key={i}>
                            <td>{item.dateOfReceivedAmount ? shamsi.gregorianToJalali(item.dateOfReceivedAmount).join('/') : "- - -"}</td>
                            <td>{Converter.threeDigitSeparator(item.amount)}</td>
                            <td>{item.deceasedDocumentId}</td>
                        </tr>
                    ))
                });
        } catch (err) {
            if (err) {
            }
        }
    })


    return (
        <Fragment>
            <a className="bg-info mx-1 px-3 py-2 justify-content-center rounded-3" id={"SeePayment" + IdCheque} onClick={LargeModaltoggle}><i className="icofont icofont-sea-plane" ></i></a>
            <ToolTip
                attrToolTip={{
                    placement: 'top',
                    isOpen: basictooltip,
                    target: 'SeePayment' + IdCheque,
                    toggle: toggle
                }} >
                مشاهده پرداختی ها
            </ToolTip>

            <EditCheque isOpen={Large} title="پرداختی های چک" toggler={LargeModaltoggle} size="lg">

                <Col sm="12">
                    <Card>
                        <CardBody>
                            <Table>
                                <thead className="table-primary">
                                    <tr>
                                        <th scope="col">تاریخ پرداخت</th>
                                        <th scope="col">مقدار استفاده شده (ریال)</th>
                                        <th scope="col">کد پیگیری قرارداد</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataLoop2
                                        ?
                                            dataLoop
                                        :
                                            <tr scope="row" key="1">
                                                <th colSpan="3">پرداختی وجود ندارد</th>
                                            </tr>
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>

            </EditCheque>
        </Fragment>
    );
};
export default SeePaymentsCheque;
