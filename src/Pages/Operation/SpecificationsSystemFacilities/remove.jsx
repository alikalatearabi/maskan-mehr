import React, { Fragment, useState } from 'react';
import SweetAlert from 'sweetalert2';
import axios from "../../../api/axios";

const RemoveChat = ({idTracking}) => {
    const token = localStorage.getItem('token')

    const [alert, setAlert] = useState(false);
    const DisplayAlert = (name) => {
        setAlert(true);

        if (name === 'advanceDanger') {
            SweetAlert.fire({
                title: 'آیا اطمینان دارید از حذف این پرونده؟',
                cancelButtonText: 'لغو',
                confirmButtonText: 'تایید',
                reverseButtons: true,
                showCancelButton: true,
                showConfirmButton: true,
                showLoading: ('صبر کنید...')
            }).then((res) => {

                if (res.isConfirmed) {
                    try {
                        axios.post("/DeceasedDocument/Remove", parseInt(idTracking),
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorize": token
                                },
                            })
                            .then(res => {
                                SweetAlert.fire(
                                    {title:`پرونده با آیدی ${idTracking} با موفقیت حذف گردید`,
                                        icon : 'success',
                                        confirmButtonText: 'تایید',
                                        didClose() {
                                            window.location.reload()
                                        }
                                    }
                                )
                            })
                    } catch (err) {
                        if (err) {
                            SweetAlert.fire(
                                {title:`مشکلی پیش آمده، حذف انجام نشد.`,
                                    icon : 'danger',
                                    confirmButtonText: 'تایید'
                                }
                            )
                        }
                    }
                } else {

                }
            });

        }
    };

    return (
        <a name="advanceDanger" onClick={(e) => DisplayAlert(e.target.name)} className="mx-2 text-danger sweet icofont icofont-ui-delete"></a>
    );
};

export default RemoveChat;