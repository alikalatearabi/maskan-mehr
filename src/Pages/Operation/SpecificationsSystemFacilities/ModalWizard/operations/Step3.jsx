import React, {Fragment, useState} from "react";
import {Card, CardBody, Row} from "reactstrap";
import UploadFilePersonal from "./Upload/UploadFilePersonal";
import axios from "../../../../../api/axios";
import BoxLoader from "../../../../../Layout/Loader/box-loader";
import {useEffectOnce} from "react-use";

const Step3 = ({idTracking}) => {
    const token = localStorage.getItem("token");

    const [filedUpload, setFiledUpload] = useState();


    const loadData = () => {
         axios.get("/DeceasedDocument/GetUploadedFilePersonalDocumentsDescription",
            {
                headers:{
                    "Authorize": token,
                    "Content-Type": "application/json",
                }
            })
            .then(res =>
                setFiledUpload(
                    res.data.map((item) =>
                        <UploadFilePersonal idTracking={idTracking} loadData={loadData} itemId={idTracking} uploadedFilePersonalDocumentsDescription={item.key ? item.key : 0} key={item.key ? item.key : 0} keyOp={item.key} title={item.value} />
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
                        <p className="text-center f-26">مدارک شخصی</p>
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
export default Step3;