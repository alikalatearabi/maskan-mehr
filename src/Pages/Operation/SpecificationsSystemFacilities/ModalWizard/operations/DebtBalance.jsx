import React, {Fragment, useState} from 'react';
import {CardBody, Col, Input, Label, Row} from "reactstrap";
import axios, {axiosHandler} from "../../../../../api/axios";
import {Alerts, Btn} from "../../../../../AbstractElements";
import ModalSetupEditChat from "../../Chatting/EditChat";
import {toast} from "react-toastify";
import DebtBalanceTable from "./DebtBalanceTable";
import DebtBalanceRemove from "./DebtBalanceRemove";
import {convertToPersianNum, threeDigitSeparator} from "persian-currency-converter/build/utils/convert";
import * as Converter from "persian-currency-converter";


const DebtBalance = ({idTracking}) => {
    const [Large, setLarge] = useState(false);
    const LargeModaltoggle = () => {
        setLarge(!Large)
        DebtBalanceGet()
    };

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [showData, setShowData] = useState('');

    const [numberOfInstallmentsPaid, setNumberOfInstallmentsPaid] = useState(0); // تعداد اقساط پرداخت شده
    const [numberOfInstallments, setNumberOfInstallments] = useState(0); // تعداد اقساطی که باید پرداخت می نمود
    const [theSumOfTheInstallmentsThatTheCustomerHadToPay, setTheSumOfTheInstallmentsThatTheCustomerHadToPay] = useState(0); //جمع اقساطی که مشتری باید پرداخت می نمود
    const [customerProfit, setCustomerProfit] = useState(0); // برگشت سود سهم مشتری
    const [balanceOfTheDebt, setBalanceOfTheDebt] = useState(0); // مانده بدهی اعلام شده در بدهی فسخ
    const [currentInstallmentAmount, setCurrentInstallmentAmount] = useState(0); // مبلغ قسط جاری

    const [calcField, setCalcField] = useState(0);

    const [sumOfInstallmentss, setSumOfInstallmentss] = useState(0); // جمع اقساط
    const [sumTheSumOfTheInstallmentsThatTheCustomerHadToPay, setSumTheSumOfTheInstallmentsThatTheCustomerHadToPay] = useState(0); // جمع اقساط

    const [addNumberOfInstallments, setAddNumberOfInstallments] = useState(0); // مبلغ قسط جاری
    const [addAmountOfInstallment, setAddAmountOfInstallment] = useState(0); // مبلغ قسط جاری


    const DebtBalanceGet = (e) => {
        setShowData(null);
        setIsLoading(true);
        setSumOfInstallmentss(0);

        axiosHandler.post("/DebtBalance/Get", parseInt(idTracking),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                },
            })
            .then(response => {
                setNumberOfInstallmentsPaid(response.data.numberOfInstallmentsPaid)
                setNumberOfInstallments(response.data.numberOfInstallments)
                setTheSumOfTheInstallmentsThatTheCustomerHadToPay(response.data.theSumOfTheInstallmentsThatTheCustomerHadToPay)
                setCustomerProfit(response.data.customerProfit)
                setBalanceOfTheDebt(response.data.balanceOfTheDebt)
                setCurrentInstallmentAmount(response.data.currentInstallmentAmount)
                setCalcField(response.data.calcField)
                // response.data.installments.map((item) => setSumOfInstallments(sumOfInstallments + parseInt(item.sumOfInstallments)))

                let list1 = [...response.data.installments.map((item) => item.numberOfInstallments)];
                let list2 = [...response.data.installments.map((item) => item.amountOfInstallment)];

                setSumOfInstallmentss(list1.reduce((acc, curr, index) => acc + curr * list2[index], 0));

                setSumTheSumOfTheInstallmentsThatTheCustomerHadToPay(response.data.theSumOfTheInstallmentsThatTheCustomerHadToPay);

                setShowData(
                    response.data.installments.map((item) =>
                        <tr key={item.id}>
                            <td>{item.numberOfInstallments}</td>
                            <td>{Converter.threeDigitSeparator(item.amountOfInstallment)}</td>
                            <td>{item.sumOfInstallments}</td>
                            <td>
                                <DebtBalanceRemove idItem={item.id} loadData={DebtBalanceGet} />
                            </td>
                        </tr>
                    )
                )

                setIsLoading(false)
            }).catch(err => {
                if (err){
                    toast.error('اطلاعات بارگیری نشدند لطفا صفحه را ببندید و دوباره باز کنید.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3500
                    })
                }
            });
    };

    const AddOrUpdateDebtBalance = async (e) => {
        e.preventDefault()
        setLoading(true)

        await axios.post("/DebtBalance/AddOrUpdateDebtBalance", JSON.stringify({
                "numberOfInstallmentsPaid" : parseInt(numberOfInstallmentsPaid),
                "numberOfInstallments" : parseInt(numberOfInstallments),
                "theSumOfTheInstallmentsThatTheCustomerHadToPay" : parseInt(theSumOfTheInstallmentsThatTheCustomerHadToPay),
                "customerProfit" : parseInt(customerProfit),
                "balanceOfTheDebt" : parseInt(balanceOfTheDebt),
                "currentInstallmentAmount" : parseInt(currentInstallmentAmount),
                "deceasedDocumentId" : parseInt(idTracking)
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {
                toast.success('اطلاعات شما با موفقیت ذخیره شد.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500
                })
                setLoading(false)
            }).catch(err => {
                if (err){
                    toast.error('فیلدها نباید خالی باشند.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000
                    })
                    setLoading(false)
                }
            });
    };

    const AddInstalment = async (e) => {
        e.preventDefault()

        await axios.post("/DebtBalance/AddInstalment", JSON.stringify({
                "numberOfInstallments" : parseInt(addNumberOfInstallments),
                "amountOfInstallment" : parseInt(addAmountOfInstallment),
                "deceasedDocumentId" : parseInt(idTracking),
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {
                toast.success('قسط موردنظر ثبت شد.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500
                })
                setAddNumberOfInstallments(0)
                setAddAmountOfInstallment(0)
                setLoading(false)
                DebtBalanceGet()
            }).catch(err => {
                if (err){
                    toast.error('قسط موردنظر موقع ثبت با مشکل مواجه شد.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2500
                    })
                }
            });
    };


    return (
        <Fragment>
            <Btn attrBtn={{ color: 'primary', size: 'sm', onClick: LargeModaltoggle }}>محاسبه مانده بدهی</Btn>
            <ModalSetupEditChat isOpen={Large} title="عملیات" toggler={LargeModaltoggle} size="xl">

                <CardBody>
                    <p className="text-center f-26">
                        محاسبه مانده بدهی
                    </p>


                    <div className="row mb-3">
                        <div className="col row">
                            <Label className="col-form-label f-18">تعداد اقساط پرداخت شده</Label>
                                <Input type="number" name="number" className="form-control input-air-primary" placeholder="اینجا وارد کنید..."
                                       onChange={e => setNumberOfInstallmentsPaid(e.target.value)}
                                       value={numberOfInstallmentsPaid}
                                       min={0}
                                />
                        </div>
                        <div className="col">
                            <Label className="col-form-label f-18">تعداد اقساطی که باید پرداخت می نمود</Label>
                                <Input type="number" name="number" className="form-control input-air-primary" placeholder="اینجا وارد کنید..."
                                       onChange={e => setNumberOfInstallments(e.target.value)}
                                       value={numberOfInstallments}
                                       min={0}
                                />
                        </div>
                    </div>


                    <div className="row mb-3">
                        <div className="col row">
                            <Label className="col-form-label f-18">مانده بدهی اعلام شده در بدهی فسخ</Label>
                                <Input type="number" name="number" className="form-control input-air-primary" placeholder="اینجا وارد کنید..."
                                       onChange={e => setBalanceOfTheDebt(e.target.value)}
                                       value={balanceOfTheDebt}
                                       min={0}
                                />
                            <span>
                                {balanceOfTheDebt && Converter.threeDigitSeparator(balanceOfTheDebt) + ' ریال '}
                            </span>
                        </div>
                        <div className="col">
                            <Label className="col-form-label f-18">مبلغ قسط جاری</Label>
                                <Input type="number" name="number" className="form-control input-air-primary" placeholder="اینجا وارد کنید..."
                                       onChange={e => setCurrentInstallmentAmount(e.target.value)}
                                       value={currentInstallmentAmount}
                                       min={0}
                                />
                            <span>
                                {currentInstallmentAmount && Converter.threeDigitSeparator(currentInstallmentAmount) + ' ریال '}
                            </span>
                        </div>
                    </div>


                    <div className="row mb-3">
                        {/*<div className="col row">*/}
                        {/*    <Label className="col-form-label f-18">جمع اقساطی که مشتری باید پرداخت می نمود</Label>*/}
                        {/*        <Input type="number" name="number" className="form-control input-air-primary" placeholder="اینجا وارد کنید..."*/}
                        {/*               onChange={e => setTheSumOfTheInstallmentsThatTheCustomerHadToPay(e.target.value)}*/}
                        {/*               value={theSumOfTheInstallmentsThatTheCustomerHadToPay}*/}
                        {/*               min={0}*/}
                        {/*        />*/}
                        {/*</div>*/}
                        <div className="col">
                            <Label className="col-form-label f-18">برگشت سود سهم مشتری</Label>
                            <Input type="number" name="number" className="form-control input-air-primary" placeholder="اینجا وارد کنید..."
                                   onChange={e => setCustomerProfit(e.target.value)}
                                   value={customerProfit}
                                   min={0}
                            />
                            <span>
                                {customerProfit && Converter.threeDigitSeparator(customerProfit) + ' ریال '}
                            </span>
                        </div>
                    </div>


                    <Row className="col-6 mt-3 mx-auto">
                        <Btn attrBtn={{ color: 'primary', className: 'col-5 mx-auto', disabled: loading ? loading : loading, onClick: (e) => AddOrUpdateDebtBalance(e) }} >{loading ? 'درحال ذخیره...' : 'ذخیره'}</Btn>
                    </Row>


                    <div className="row mx-auto mt-5">
                        <Label className="col-form-label f-22 text-center">افزودن اقساط</Label>
                    </div>
                    <div className="row mb-3">
                        <div className="col row">
                            <Label className="col-form-label f-18">تعداد اقساط</Label>
                            <Input type="number" name="number" className="form-control input-air-primary" placeholder="اینجا وارد کنید..."
                                   onChange={e => setAddNumberOfInstallments(e.target.value)}
                                   value={addNumberOfInstallments}
                                   min={0}
                            />
                        </div>
                        <div className="col">
                            <Label className="col-form-label f-18">مبلغ اقساط</Label>
                            <Input type="number" name="number" className="form-control input-air-primary" placeholder="اینجا وارد کنید..."
                                   onChange={e => setAddAmountOfInstallment(e.target.value)}
                                   value={addAmountOfInstallment}
                                   min={0}
                            />
                        </div>
                    </div>


                    <Row className="col-6 mt-3 mx-auto">
                        <Btn attrBtn={{ color: 'primary', className: 'col-5 mx-auto', disabled: loading ? loading : loading, onClick: (e) => AddInstalment(e) }} >{loading ? 'درحال ذخیره...' : 'افزودن قسط'}</Btn>
                    </Row>


                    <div className="row mx-auto mt-5 border border-primary pt-3">
                        <div className="row">
                            <Col className="mb-3">
                                جمع اقساط : {sumOfInstallmentss ? Converter.threeDigitSeparator(sumOfInstallmentss) : 0}
                            </Col>
                            <Col className="mb-3">
                                جمع اقساطی که مشتری باید پرداخت می نمود :
                                {calcField ? Converter.threeDigitSeparator(calcField) : 0}
                            </Col>
                        </div>
                        <div className="row">
                            <Col className="mb-3">
                                مبلغ مورد تایید بیمه : {sumOfInstallmentss && calcField && customerProfit ? Converter.threeDigitSeparator(sumOfInstallmentss - calcField - customerProfit) : 0}
                            </Col>
                            <Col className="mb-3">
                                جمع اقساط مانده : {sumOfInstallmentss && calcField ? Converter.threeDigitSeparator(sumOfInstallmentss - calcField) : 0}
                            </Col>
                        </div>
                        <div className="row">
                            <Col className="mb-3">
                                اختلاف مبلغ تاییدیه بیمه با بدهی فسخ : {(sumOfInstallmentss && calcField && customerProfit && balanceOfTheDebt) ? Converter.threeDigitSeparator(sumOfInstallmentss - calcField - customerProfit - balanceOfTheDebt) : 0}
                                {currentInstallmentAmount &&
                                    Math.abs(sumOfInstallmentss - calcField - customerProfit - balanceOfTheDebt) >= Math.abs(currentInstallmentAmount) &&
                                    <>
                                        <div className="alert alert-danger mt-2">میزان مغایرت می بایست کمتر یا
                                            مساوی یک قسط جاری باشد.
                                        </div>
                                    </>
                                }
                            </Col>
                        </div>
                    </div>


                    <div className="row mx-auto mt-5">
                        <Label className="col-form-label f-22 text-center">اقساط</Label>
                    </div>
                    <DebtBalanceTable isLoading={isLoading} showData={showData} />
                    <div className="mt-3"></div>
                </CardBody>

            </ModalSetupEditChat>
        </Fragment>
    );
};
export default DebtBalance;