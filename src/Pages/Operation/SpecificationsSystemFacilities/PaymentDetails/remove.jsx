import React, { useState } from 'react';
import SweetAlert from 'sweetalert2';
import axios from "../../../../api/axios";

const RemovePayment = ({idItem, loadData}) => {
    const token = localStorage.getItem('token')

    const [alert, setAlert] = useState(false);
    const DisplayAlert = (name) => {
        setAlert(true);

        if (name === 'advanceDanger') {
            SweetAlert.fire({
                title: 'آیا اطمینان دارید از حذف این پرداختی؟',
                cancelButtonText: 'لغو',
                confirmButtonText: 'تایید',
                reverseButtons: true,
                showCancelButton: true,
                showConfirmButton: true,
                showLoading: ('صبر کنید...'),
            }).then((res) => {

                if (res.isConfirmed) {
                    try {
                        axios.post("/DeceasedDocument/RemovePay", parseInt(idItem),
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorize": token
                                },
                            })
                            .then(res => {
                                loadData()
                                SweetAlert.fire(
                                    {title:"پرداختی حذف گردید",
                                        icon : 'success',
                                        confirmButtonText: 'تایید'
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
        <a name="advanceDanger" onClick={(e) => DisplayAlert(e.target.name)} className="text-danger sweet icofont icofont-ui-delete me-3"></a>
    );
};

export default RemovePayment;