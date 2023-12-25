import React, {Fragment, useState} from 'react';
import SweetAlert from 'sweetalert2';
import axios from "../../../api/axios";

const RemoveFile = ({idItem, nationalCode}) => {
    const token = localStorage.getItem('token');

    const [alert, setAlert] = useState(false);

    const DisplayAlert = (e) => {
        setAlert(true);

        axios.post("/DeceasedDocument/FindByNationalCode", JSON.stringify(nationalCode),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorize": token
                }
            })
            .then(response => {
                SweetAlert.fire(
                    {title:"این قرارداد دارای پرونده میباشد. لطفا ابتدا پرونده آن را حذف کنید.",
                        icon : 'warning',
                        confirmButtonText: 'تایید'
                    }
                )
            })
            .catch(err => {
                if (e.target.name === 'advanceDanger') {
                    SweetAlert.fire({
                        title: 'آیا اطمینان دارید از حذف این قرارداد؟',
                        cancelButtonText: 'لغو',
                        confirmButtonText: 'تایید',
                        reverseButtons: true,
                        showCancelButton: true,
                        showConfirmButton: true,
                        showLoading: ('صبر کنید...')
                    }).then((res) => {

                        if (res.isConfirmed) {
                            try {
                                axios.post("/MaskanMehrInsuranceContract/Remove", parseInt(idItem),
                                    {
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorize": token
                                        },
                                    })
                                    .then(res => {
                                        SweetAlert.fire(
                                            {title:"قرارداد حذف گردید.",
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
            })
    };

    return (
        <Fragment>
            <a name="advanceDanger" onClick={(e) => DisplayAlert(e)} className="mx-2 text-danger sweet icofont icofont-ui-delete ms-3"></a>
        </Fragment>
    );
};

export default RemoveFile;