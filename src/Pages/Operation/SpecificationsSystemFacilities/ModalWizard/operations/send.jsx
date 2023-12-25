import React, { Fragment, useState } from 'react';
import SweetAlert from 'sweetalert2';
import { Btn } from '../../../../../AbstractElements';
import axios from "../../../../../api/axios";
import {toast} from "react-toastify";
import Alerts from "../../../../../CommonElements/Alert";

const SendToInsurer = ({idTracking}) => {
    const token = localStorage.getItem('token');

    const [alert, setAlert] = useState(false);
    const [errSendToExport, setErrSendToExport] = useState('');
    const DisplayAlert = (name) => {
        setAlert(true);

        if (name === 'advanceDanger') {
            SweetAlert.fire({
                title: 'آیا اطمینان دارید؟',
                text: 'درصورت تایید این پرونده به بیمه گر ارسال میشود و شما دیگر نمیتوانید این پرونده را ویرایش کنید.',
                cancelButtonText: 'لغو',
                confirmButtonText: 'تایید',
                reverseButtons: true,
                showCancelButton: true,
                showConfirmButton: true,
                showLoading: 'صبر کنید...',
                showLoaderOnConfirm: true,
                isTimerRunning: 1000,
            }).then((res) => {

                if (res.isConfirmed) {
                    axios.post("/DeceasedDocument/SendToExport", parseInt(idTracking),
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorize": token
                            },
                        })
                        .then(res => {
                            if (res.data.result) {
                                SweetAlert.fire(
                                    {title:`این پرونده با موفقیت به بیمه گر ارسال گردید.`,
                                        icon : 'success',
                                        confirmButtonText: 'تایید',
                                        didClose() {
                                            window.location.reload()
                                        }
                                    }
                                )
                            } else {
                                setErrSendToExport(
                                    res.data.dontHaveFiles.map((item, i) =>
                                        <div className="col-6 mb-1">
                                            <Alerts attrAlert={{ color: 'danger' }}>
                                                { i+1 } - {item}
                                            </Alerts>
                                        </div>
                                    )
                                )
                            }

                        })
                        .catch(err => {
                            toast.error('خطا! لطفا دوباره امتحان کنید.', {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 1000
                            })
                        })
                }
            });

        }
    };

    return (
        <Fragment>
            <div>
                {errSendToExport &&
                    <div className="row mb-2">
                        <div className="mb-3 f-18 mx-auto text-center">لطفا قبل از ارسال به بیمه گر موارد زیر را کامل کنید.</div>
                        { errSendToExport }
                    </div>
                }
                <Btn attrBtn={{ color: 'primary', size: 'sm', name: 'advanceDanger',className: 'pull-right sweet', onClick: (e) => DisplayAlert(e.target.name) }}>ارسال به بیمه گر</Btn>
            </div>
        </Fragment>
    );
};

export default SendToInsurer;