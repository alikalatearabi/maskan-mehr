import React, {Fragment, useState} from 'react';
import {Card, CardBody, CardHeader, Col, Collapse, Container, Form, Row, Table} from 'reactstrap';
import Breadcrumbs from "../../CommonElements/Breadcrumbs";
import CreateNewCheque from "./CreateNewCheque";
import {Btn, H5} from "../../AbstractElements";
import {Accordion} from "react-bootstrap";
import {axiosHandler} from "../../api/axios";
import EditChequeModal from "./modal";
import RemoveCheque from "./remove";
import * as shamsi from 'shamsi-date-converter';
import SeePaymentsCheque from "./SeePayments";
import UploadExcel from "./uploadExcel";
import * as Converter from "persian-currency-converter";
import BoxLoader from "../../Layout/Loader/box-loader";
import {useEffectOnce} from "react-use";
import {DateInputSimple} from "react-hichestan-datetimepicker";
import {toast} from "react-toastify";

const Cheque = () => {

    const token = localStorage.getItem('token')

    // ################## search ##################
    const [chequeNumber, setChequeNumber] = useState('');
    const [chequeId, setChequeId] = useState('');
    const [chequeDate, setChequeDate] = useState('');

    const [getSingleCheque, setGetSingleCheque] = useState()
    const [isLoading, setIsLoading] = useState(false);

    const [getAllChequeList, setGetAllChequeList] = useState();

    const searchByNumberCheque = (e) => {

        e.preventDefault();
        setGetSingleCheque(null);
        setIsLoading(true);

        axiosHandler.post(`/Cheque/FindByChequeNumber`, chequeNumber,
            {headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                },})
            .then(response => {
                setGetSingleCheque(
                    <tr key={response.data['id']}>
                        <td>{response.data['id']}</td>
                        <td>{response.data['chequeNumber'] ? response.data['chequeNumber'] : response.data['isPaya'] ? 'پایا' : '- - -'}</td>
                        <td>{response.data['chequeDate'] && shamsi.gregorianToJalali(response.data['chequeDate']).join('/')}</td>
                        <td>{Converter.threeDigitSeparator(response.data['chequeMount'])}</td>
                        <td>{response.data['usedAmount'] ? Converter.threeDigitSeparator(response.data['usedAmount']) : 'صفر' }</td>
                        <td>{response.data['bank']}</td>
                        <th>
                            <Col>
                                {response.data['id'] && <RemoveCheque IdCheque={response.data['id']} getAllCheque={calling} />}
                                {response.data['id'] && <EditChequeModal editIdCheque={response.data['id']} getAllCheque={calling} usedAmount={response.data['usedAmount'] ? response.data['usedAmount'] : 0} chequeDateBefor={response.data['chequeDate']} />}
                                {response.data['id'] && <SeePaymentsCheque IdCheque={response.data['id']} />}
                                {response.data['id'] && <UploadExcel IdCheque={response.data['id']} calling={calling} />}
                            </Col>
                        </th>
                    </tr>
                )
                setIsLoading(false);
            });
    }

    const searchByIdCheque = (e) => {

        e.preventDefault()
        setGetSingleCheque(null);
        setIsLoading(true);

         axiosHandler.post(`/Cheque/Find`, chequeId,
            {headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                },})
            .then(response => {
                setGetSingleCheque(
                    <tr key={response.data['id']}>
                        <td>{response.data['id']}</td>
                        <td>{response.data['chequeNumber'] ? response.data['chequeNumber'] : response.data['isPaya'] ? 'پایا' : '- - -'}</td>
                        <td>{response.data['chequeDate'] && shamsi.gregorianToJalali(response.data['chequeDate']).join('/')}</td>
                        <td>{Converter.threeDigitSeparator(response.data['chequeMount'])}</td>
                        <td>{response.data['usedAmount'] === null ? Converter.threeDigitSeparator(response.data['usedAmount']) :  'صفر'}</td>
                        <td>{response.data['bank']}</td>
                        <td>
                            <Col>
                                {response.data['id'] && <RemoveCheque IdCheque={response.data['id']} getAllCheque={calling} />}
                                {response.data['id'] && <EditChequeModal editIdCheque={response.data['id']} getAllCheque={calling} usedAmount={response.data['usedAmount'] ? response.data['usedAmount'] : 0} chequeDateBefor={response.data['chequeDate']} />}
                                {response.data['id'] && <SeePaymentsCheque IdCheque={response.data['id']} />}
                                {response.data['id'] && <UploadExcel IdCheque={response.data['id']} calling={calling} />}
                            </Col>
                        </td>
                    </tr>
                )
                setIsLoading(false);
            });
    }

    const searchByDate = (e) => {

        e.preventDefault()
        setGetSingleCheque(null);
        setGetAllChequeList(null);
        setIsLoading(true);

         axiosHandler.post(`/Cheque/FindByChequeDate`, chequeDate,
            {headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                },})
            .then(response => {
                if (response.data) {
                    setGetAllChequeList(response.data.map((item) =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.chequeNumber ? item.chequeNumber : item.isPaya ? 'پایا' : '- - -'}</td>
                            <td>{item.chequeDate && shamsi.gregorianToJalali(item.chequeDate).join('/')}</td>
                            <td>{Converter.threeDigitSeparator(item.chequeMount)}</td>
                            <td>{item.usedAmount ? Converter.threeDigitSeparator(item.usedAmount) : 'صفر'}</td>
                            <td>{item.bank}</td>
                            <td>
                                <Col>
                                    {item.id && <RemoveCheque getAllCheque={calling} IdCheque={item.id} />}
                                    {item.id && <EditChequeModal usedAmount={item.usedAmount ? item.usedAmount : 0} getAllCheque={calling} editIdCheque={item.id} />}
                                    {item.id && <SeePaymentsCheque IdCheque={item.id} />}
                                    {item.id && <UploadExcel IdCheque={item.id} calling={calling} />}
                                </Col>
                            </td>
                        </tr>
                    ))
                    setIsLoading(false);
                } else {
                    toast.error('در تاریخ مورد نظر موردی یافت نشد.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000
                    })
                    getAllCheque()
                }
            });
    }

    const getAllCheque =  () => {

        setIsLoading(true);

        axiosHandler.get(`/Cheque/All`,
            {headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                },})
            .then(response => {
                setGetAllChequeList(response.data.slice(0,100).map((item) =>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.chequeNumber ? item.chequeNumber : item.isPaya ? 'پایا' : '- - -'}</td>
                        <td>{item.chequeDate && shamsi.gregorianToJalali(item.chequeDate).join('/')}</td>
                        <td>{Converter.threeDigitSeparator(item.chequeMount)}</td>
                        <td>{item.usedAmount ? Converter.threeDigitSeparator(item.usedAmount) : 'صفر'}</td>
                        <td>{item.bank}</td>
                        <th>
                            <Col>
                                {item.id && <RemoveCheque getAllCheque={calling} IdCheque={item.id} />}
                                {item.id && <EditChequeModal usedAmount={item.usedAmount ? item.usedAmount : 0} getAllCheque={calling} editIdCheque={item.id} />}
                                {item.id && <SeePaymentsCheque IdCheque={item.id} />}
                                {item.id && <UploadExcel IdCheque={item.id} calling={calling} />}
                            </Col>
                        </th>
                    </tr>
                ))
                setIsLoading(false);
            });
    }

    useEffectOnce(() =>
        getAllCheque()
    )

    const calling = () => {
        setGetSingleCheque(null)
        setGetAllChequeList(null)
        getAllCheque()
    }
    // ################## end search ##################


    // ################## Accordion ##################
    const [isOpen, setIsOpen] = useState(1);
    const toggle = (id) => (isOpen === id ? setIsOpen(null) : setIsOpen(id));
    // ################## end Accordion ##################


    return (
        <Fragment>
            <Breadcrumbs parent="عملیات بروی چک ها" title="لیست چک ها" label={<CreateNewCheque getAllCheque={getAllCheque} />} />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <Accordion defaultActiveKey="0">
                                    <div className="default-according" id="accordion1">
                                        <Card>
                                            <CardHeader className="bg-primary">
                                                <H5 attrH5={{ className: 'mb-0' }} className="text-white" >
                                                    <Btn attrBtn={{ as: Card.Header, className: 'btn btn-link text-white', color: 'default', onClick: () => toggle(1) }} >
                                                        <i className="icofont icofont-search"></i>جستجو
                                                    </Btn>
                                                </H5>
                                            </CardHeader>
                                            <Collapse isOpen={isOpen === 1} className="bg-light" style={{borderBottomRightRadius: 15, borderBottomLeftRadius: 15}}>
                                                <CardBody>

                                                    <Card className="bg-light">
                                                        <CardBody>
                                                            <Form className="needs-validation">
                                                                <Row>
                                                                    <Col md="4" className="mb-1">
                                                                        <input className="form-control input-air-primary" name="searchNumberCheque" type="number"
                                                                               value={chequeNumber}
                                                                               placeholder="شماره چک"
                                                                               onChange={e => setChequeNumber(e.target.value)}
                                                                               min={0}
                                                                           />
                                                                    </Col>
                                                                    <Col md="4" className="mb-1">
                                                                        <input className="form-control input-air-primary" name="checkIdCheque" type="number"
                                                                               value={chequeId}
                                                                               placeholder="آیدی چک"
                                                                               onChange={e => setChequeId(e.target.value)}
                                                                               min={999}
                                                                           />
                                                                    </Col>
                                                                    <Col md="4" className="mb-1 row">
                                                                        <DateInputSimple
                                                                            className={"form-control input-air-primary"}
                                                                            value={chequeDate}
                                                                            name={'myDateTime'}
                                                                            placeholder="تاریخ چک"
                                                                            onChange={e => setChequeDate(e.target.value)}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <div className={"text-center mt-4"}>
                                                                    {chequeNumber && chequeId ?
                                                                        <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک فیلد را جستجو کنید</Btn>
                                                                    : chequeNumber && chequeDate ?
                                                                        <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک فیلد را جستجو کنید</Btn>
                                                                    :chequeId && chequeDate ?
                                                                        <Btn attrBtn={{color: 'primary', disabled: true}}>فقط یک فیلد را جستجو کنید</Btn>
                                                                    : chequeNumber ?
                                                                        <Btn attrBtn={{color: 'primary', onClick: (e) => searchByNumberCheque(e)}}>جستجو</Btn>
                                                                    : chequeId ?
                                                                        <Btn attrBtn={{color: 'primary', onClick: (e) => searchByIdCheque(e)}}>جستجو</Btn>
                                                                    : chequeDate ?
                                                                        <Btn attrBtn={{color: 'primary', onClick: (e) => searchByDate(e)}}>جستجو</Btn>
                                                                    :
                                                                        <Btn attrBtn={{color: 'primary', disabled: true, onClick: (e) => getAllCheque(e)}}>جستجو</Btn>
                                                                    }
                                                                </div>
                                                            </Form>
                                                        </CardBody>
                                                    </Card>

                                                </CardBody>
                                            </Collapse>
                                        </Card>
                                    </div>
                                </Accordion>
                            </CardBody>



                            <CardBody>
                                <Row className="card-block">
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive" style={ getAllChequeList && {height: 500}}>
                                            <Table>
                                                <thead className="table-primary">
                                                    <tr>
                                                        <th scope="col">آیدی چک</th>
                                                        <th scope="col">شماره چک</th>
                                                        <th scope="col">تاریخ چک</th>
                                                        <th scope="col">مبلغ چک (ریال)</th>
                                                        <th scope="col">مبلغ مصرف شده (ریال)</th>
                                                        <th scope="col">بانک</th>
                                                        <th scope="col">عملیات</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { getSingleCheque
                                                    ?
                                                        getSingleCheque
                                                    :
                                                        getAllChequeList
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
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default Cheque;