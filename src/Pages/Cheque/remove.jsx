import React, { Fragment, useState } from 'react';
import SweetAlert from 'sweetalert2';
import {Btn, ToolTip} from '../../AbstractElements';
import axios from "../../api/axios";

const RemoveCheque = ({IdCheque, getAllCheque}) => {
    const token = localStorage.getItem('token')

    const [basictooltip, setbasictooltip] = useState(false);
    const toggle = () => setbasictooltip(!basictooltip);

    const [alert, setAlert] = useState(false);
    const DisplayAlert = (name) => {
        setAlert(true);

            SweetAlert.fire({
                title: 'آیا اطمینان دارید از حذف این چک؟',
                text: 'در صورت حذف چک تمام پرداختی های این چک نیز حذف خواهد شد.',
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
                    try {
                        axios.post("/Cheque/Remove", parseInt(IdCheque),
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorize": token
                                },
                            })
                            .then(res => {
                                SweetAlert.fire(
                                    {title:`چک با آیدی ${IdCheque} با موفقیت حذف گردید`,
                                        icon : 'success',
                                        confirmButtonText: 'تایید'
                                    }
                                )
                                getAllCheque()
                            })
                    } catch (err) {
                        if (err) {
                            // console.log(`مشکلی پیش آمده!`);
                        }
                    }
                } else if (res.isDenied && res.isDismissed) {
                    // console.log(`کنسل شد`);
                }
            });

    };

    return (
        <Fragment>
            <a className="bg-danger mx-1 px-3 py-2 justify-content-center rounded-3 sweet" id={"DeleteCheque" + IdCheque} name='hasDeleteCheque' onClick={DisplayAlert} >
                <i className="icofont icofont-trash" ></i>
            </a>
            <ToolTip
                attrToolTip={{
                    placement: 'top',
                    isOpen: basictooltip,
                    target: 'DeleteCheque' + IdCheque,
                    toggle: toggle
                }} >
                حذف چک
            </ToolTip>
        </Fragment>
    );
};

export default RemoveCheque;