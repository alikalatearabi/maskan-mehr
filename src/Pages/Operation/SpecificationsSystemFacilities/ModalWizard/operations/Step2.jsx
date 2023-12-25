import React, {Fragment, useState} from "react";
import {Card, CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";
import axios, {axiosHandler} from "../../../../../api/axios";
import "./filed.css"
import {Alerts, Btn} from "../../../../../AbstractElements";
import {useEffectOnce} from "react-use";
import {DateInputSimple} from "react-hichestan-datetimepicker";
import * as shamsi from "shamsi-date-converter";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import BoxLoader from "../../../../../Layout/Loader/box-loader";
import {toast} from "react-toastify";

const Step2 = ({idTracking}) => {

    const token = localStorage.getItem('token');
    const UserChecked = localStorage.getItem('Role');

    const [options, setOptions] = useState([]);
    const [checkArrayPublic, setCheckArrayPublic] = useState([]);

    const [searchIsLoading, setSearchIsLoading] = useState(false);

    const [optionId, setOptionId] = useState();

    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [trueMsg, setTrueMsg] = useState('');

    const [placeOfDeath, setPlaceOfDeath] = useState();
    const [placeOfDeathShow, setPlaceOfDeathShow] = useState();
    const [placeOfDeathString, setPlaceOfDeathString] = useState();

    const [causeOfDeathString, setCauseOfDeathString] = useState();

    const [deathCauseType, setDeathCauseType] = useState();
    const [deathCauseTypeShow, setDeathCauseTypeShow] = useState();
    const [deathCauseTypeString, setDeathCauseTypeString] = useState();

    const [dateOfDeath, setDateOfDeath] = useState();

    const [deathCauseDetails, setDeathCauseDetails] = useState(null);

    const [stateOption, setStateOption] = useState(0)

    useEffectOnce(() => {
        axios.get("/DeceasedDocument/GetPlaceOfDeath",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setPlaceOfDeathShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>));
            });

        axios.get("/DeceasedDocument/GetTypeOfDeath",
            {headers: {
                    "Authorize": token
                },})
            .then(response => response.data)
            .then(res => {
                setDeathCauseTypeShow(res.map((item) => <option key={item.key} value={item.key}>{item.value}</option>
                ));

            });
        handleGetDeath()
    })

    const handleGetDeath = () => {

        axios.post("/DeceasedDocument/Find", idTracking,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            }).then(response => {

                setPlaceOfDeath(response.data.placeOfDeath)
                setPlaceOfDeathString(response.data.placeOfDeathName)
                setStateOption(response.data.causeOfDeathId)
                setCauseOfDeathString(response.data.causeOfDeathName)
                setDeathCauseType(response.data.typeOfDeath)
                setDeathCauseTypeString(response.data.typeOfDeathName)
                setDeathCauseDetails(response.data.detailOfDeath)
                setDateOfDeath(response.data.dateOfDeath)

        })
    }


    const handleEditDeath = (e) => {

        setLoading(true)

        if (!deathCauseDetails) {
            setDeathCauseDetails(null)
        }

        if (optionId) {
            axiosHandler.post("/DeceasedDocument/AddorEditDeathInformation", JSON.stringify(
                    {
                        "dateOfDeath": dateOfDeath,
                        "causeOfDeathId": optionId[0].id,
                        "typeOfDeath": parseInt(deathCauseType),
                        "placeOfDeath": parseInt(placeOfDeath),
                        "deceasedDocumentId": parseInt(idTracking),
                        "detailsOfDeath": deathCauseDetails,
                    }
                ),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorize": token
                    }
                }).then(response => {

                setTrueMsg("با موفقیت ذخیره گردید.")
                setErrMsg(null)
                setLoading(false)
                handleGetDeath()

            })
                .catch(err => {
                    setLoading(false)
                    setTrueMsg(null)
                    setErrMsg('لطفا فیلد هارا به درستی وارد کنید.')
                })
        } else {
            axiosHandler.post("/DeceasedDocument/AddorEditDeathInformation", JSON.stringify(
                    {
                        "dateOfDeath": dateOfDeath,
                        "causeOfDeathId": parseInt(stateOption),
                        "typeOfDeath": parseInt(deathCauseType),
                        "placeOfDeath": parseInt(placeOfDeath),
                        "deceasedDocumentId": parseInt(idTracking),
                        "detailsOfDeath": deathCauseDetails,
                    }
                ),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorize": token
                    }
                }).then(response => {

                setTrueMsg("با موفقیت ذخیره گردید.")
                setErrMsg(null)
                setLoading(false)
                handleGetDeath()

            })
                .catch(err => {
                    setLoading(false)
                    setTrueMsg(null)
                    setErrMsg('لطفا فیلد هارا به درستی وارد کنید.')
                })
        }

    }

    const [systemState, setSystemState] = useState();

    useEffectOnce(() => {
        axios.post("/DeceasedDocument/GetSystemState", idTracking,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {
                setSystemState(response.data)
            });
    });


    const addNewCauseOfDeath = (x) => {
        axios.post("/CauseOfDeath/IsTitleExist", JSON.stringify(x[0].title),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {
                if (response.data === false) {
                     axios.post("/CauseOfDeath/Add", JSON.stringify(x[0].title),
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorize": token
                            }
                        })
                        .then(res => {
                        })
                }
            })
    }

    return (
        <Fragment>
            <Card>
                <CardBody className="">
                    <p className="text-center f-26">مشخصات فوتی</p>
                    {deathCauseTypeShow ?
                        <>
                            {UserChecked === "BranchesManager" && systemState !== 1
                                ?

                                <Row className="mt-5 justify-content-between">
                                    <FormGroup className="row col-6" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col col-form-label f-20"> محل فوت: </Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">{placeOfDeathString ? placeOfDeathString : "- - -"}</Label>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-6" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col col-form-label f-20"> نوع فوت: </Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">{deathCauseTypeString ? deathCauseTypeString : "- - -"}</Label>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-6" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col col-form-label f-20"> علت دقیق فوت: </Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">{causeOfDeathString ? causeOfDeathString : "- - -"}</Label>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-6" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col col-form-label f-20">تاریخ فوت : </Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">{dateOfDeath ? shamsi.gregorianToJalali(dateOfDeath).join('/') : "- - -"}</Label>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-12 mx-auto" style={{border : "1px dashed #5655e5"}}>
                                        <Label className="col col-form-label f-20"> توضیحات فوت: </Label>
                                        <Col sm="12" className="">
                                            <Label className="f-20">{deathCauseDetails}</Label>
                                        </Col>
                                    </FormGroup>
                                </Row>

                                :
                                <Row className="mt-5">
                                    <FormGroup className="row col-6">
                                        <Label className="col col-form-label f-20"> محل فوت: </Label>
                                        <Col sm="8">
                                            <Input type="select" name="select" className="form-control input-air-primary"
                                                   onChange={e => setPlaceOfDeath(e.target.value)}
                                                   value={placeOfDeath}
                                            >
                                                <option key="55">انتخاب کنید</option>
                                                {placeOfDeathShow}
                                            </Input>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-6">
                                        <Label className="col col-form-label f-20"> نوع فوت: </Label>
                                        <Col sm="8">
                                            <Input type="select" name="select" className="form-control input-air-primary"
                                                   onChange={e => setDeathCauseType(e.target.value)}
                                                   value={deathCauseType}
                                            >
                                                <option key="55">انتخاب کنید</option>
                                                {deathCauseTypeShow}
                                            </Input>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-6">
                                        <Label className="col col-form-label f-20"> علت دقیق فوت: </Label>
                                        <Col sm="8" className="text-right">
                                            <AsyncTypeahead
                                                allowNew
                                                newSelectionPrefix="اضافه کنید : "
                                                id="basic-typeahead"
                                                labelKey="title"
                                                multiple={false}
                                                options={checkArrayPublic}
                                                isLoading={searchIsLoading}

                                                defaultInputValue={causeOfDeathString ? `${causeOfDeathString}` : ''}
                                                filterBy={['title']}
                                                onChange={(e) => {
                                                    setOptionId(e)
                                                    addNewCauseOfDeath(e)
                                                }}

                                                emptyLabel={"علت فوت مورد نظر یافت نشد."}
                                                promptText={"برای اضافه کردن بنویسید..."}
                                                searchText={"درحال جستجو..."}
                                                placeholder="علت فوت را بنویسید و انتخاب کنید..."

                                                onSearch={(query) => {
                                                    setSearchIsLoading(true)
                                                    axios.post("/CauseOfDeath/FindCauseOfDeath", query,
                                                        {
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                                "Authorize": token
                                                            },
                                                        })
                                                        .then(response =>
                                                            {
                                                                setCheckArrayPublic([])
                                                                setOptions([])
                                                                response.data.map((item) =>
                                                                    options.push({
                                                                        "id": item.id,
                                                                        "title": item.title,
                                                                    })
                                                                )
                                                                setCheckArrayPublic(options)
                                                                setSearchIsLoading(false)
                                                            }
                                                        );
                                                }}
                                            />
                                            {causeOfDeathString && <span> انتخاب قبلی : {causeOfDeathString}</span>}
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-6">
                                        <Label className="col col-form-label f-20">تاریخ فوت : </Label>
                                        <Col sm="8">
                                            <DateInputSimple
                                                className={"form-control input-air-primary"}
                                                value={dateOfDeath}
                                                name={'myDateTime'}
                                                onChange={e => setDateOfDeath(e.target.value)}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row col-12">
                                        <Label className="col col-form-label f-20"> توضیحات فوت: </Label>
                                        <Col sm="8">
                                            <Input type="text" name="text" className="form-control input-air-primary"
                                                   placeholder="اینجا بنویسید..."
                                                   onChange={e => setDeathCauseDetails(e.target.value)}
                                                   value={deathCauseDetails}
                                            />
                                        </Col>
                                    </FormGroup>

                                </Row>
                            }

                            <Row className="col-12">
                                {UserChecked === "BranchesManager" && systemState !== 1 ?
                                    ''
                                    :
                                    <Btn attrBtn={{
                                        color: 'primary',
                                        className: 'col-4 mx-auto',
                                        disabled: loading ? loading : loading,
                                        onClick: (e) => handleEditDeath(e)
                                    }}>{loading ? 'درحال ذخیره...' : 'ذخیره'}</Btn>
                                }
                            </Row>
                            <Col className='mt-3'>
                                {errMsg &&
                                    <Alerts attrAlert={{ color: 'danger' }}>
                                        {errMsg}
                                    </Alerts>
                                }
                                {trueMsg &&
                                    <Alerts attrAlert={{ color: 'success' }}>
                                        {trueMsg}
                                    </Alerts>
                                }
                            </Col>
                        </>
                    :
                        <BoxLoader />

                    }
                </CardBody>
            </Card>
        </Fragment>
    );
};
export default Step2;