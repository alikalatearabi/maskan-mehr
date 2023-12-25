import React, {Fragment, useState} from "react";
import {Card, CardBody, Row} from "reactstrap";
import axios from "../../../../../api/axios";
import UploadFileContract from "./Upload/UploadFileContract";
import {useEffectOnce} from "react-use";
import BoxLoader from "../../../../../Layout/Loader/box-loader";

const Step4 = ({idTracking}) => {
    const token = localStorage.getItem("token");

    const [filedUpload, setFiledUpload] = useState();

    const loadData = () => {
        axios.get("/DeceasedDocument/GetUploadedFileAppointmentDocument",
            {
                headers:{
                    "Authorize": token,
                    "Content-Type": "application/json",
                }
            })
            .then(res =>
                setFiledUpload(
                    res.data.map((item) =>
                        <UploadFileContract idTracking={idTracking} loadData={loadData} itemId={idTracking} UploadedFileAppointmentDocument={item.key ? item.key : 0} key={item.key ? item.key : 0} keyOp={item.key} title={item.value} />
                    )
                )
            )
    }

    useEffectOnce(() => {
        loadData()
    })

    return (
        <Fragment>
            {filedUpload ?
                <Card>
                    <CardBody className="">
                        <p className="text-center f-26">مدارک قرارداد</p>
                        <Row className="mt-5">
                            <div className="col">
                                <Card>
                                    <Row className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">

                                        {filedUpload}

                                    </Row>
                                </Card>
                            </div>
                        </Row>
                    </CardBody>
                </Card>
                :
                <BoxLoader />
            }
        </Fragment>
    );
};
export default Step4;