import axios from "axios"
import {toast} from "react-toastify";

const BASE_URL = "https://mehrapi.maskanins.ir/";

export default axios.create({
    baseURL: BASE_URL
})

export const axiosHandler = axios.create(
    {
        baseURL: BASE_URL
    }
);


axiosHandler.interceptors.response.use((res) => {
    return res;
},(err) => {
    if (err.request.status === 400) {
        toast.error('خطا در ورود اطلاعات!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })

    } else if (err.request.status === 401) {
        localStorage.removeItem('profileURL');
        localStorage.removeItem('Name');
        localStorage.removeItem('token');
        localStorage.removeItem('Role');
        localStorage.removeItem('Manager');
        localStorage.removeItem('managerId');
        setTimeout(window.location.reload.bind(window.location), 4000)
        toast.error('دسترسی شما منقضی شده لطفا دوباره وارد شوید(تا چند ثانیه دیگر به صفحه ورود منتقل میشوید)', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000
        })

    } else if (err.response.status === 404) {
        toast.error('موردی یافت نشد!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })

    } else if (err.response.status === 403) {
        localStorage.removeItem('profileURL');
        localStorage.removeItem('Name');
        localStorage.removeItem('token');
        localStorage.removeItem('Role');
        localStorage.removeItem('Manager');
        localStorage.removeItem('managerId');
        setTimeout(window.location.reload.bind(window.location), 1000)
        toast.error('شما دسترسی ندارید!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })

    } else if (err.request.status === 500) {
        toast.error('مشکلی از سمت سرور رخ داده است!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })

    } else if (err.request.status === 503) {
        toast.error('سرویس در دسترس نیست!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })

    } else {
        toast.error('به خطای غیر منتظره ای برخورد کردید.', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })

    }
    return Promise.reject(err);
});
