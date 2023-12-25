import React, {Fragment, useEffect} from 'react';
import axios from "../../api/axios";

const SidebarSection = () => {
    const token = localStorage.getItem("token");
    const UserChecked = localStorage.getItem('Role');

    useEffect(() => {
        axios.get("/Account/IsApiAlive",
            {headers: {
                    "Authorize": token
                },})
            .then(res => {
                if (res.data !== UserChecked) {
                    localStorage.removeItem('profileURL');
                    localStorage.removeItem('Name');
                    localStorage.removeItem('token');
                    localStorage.removeItem('Role');
                    localStorage.removeItem('Manager');
                    localStorage.removeItem('managerId');
                    setTimeout(window.location.reload.bind(window.location), 1000)
                }
            })
            .catch(err => {
                localStorage.removeItem('profileURL');
                localStorage.removeItem('Name');
                localStorage.removeItem('token');
                localStorage.removeItem('Role');
                localStorage.removeItem('Manager');
                localStorage.removeItem('managerId');
                setTimeout(window.location.reload.bind(window.location), 1000)
            });
    }, [])
    return (
        <Fragment>
            {/*<div className="sidebar-img-section">*/}
                {/*<div className="sidebar-img-content pt-3">*/}
                {/*    <H4>با پنل جدید آشنا نیستید؟</H4>*/}
                {/*    <Link to={'#'} className="btn btn-secondary">*/}
                {/*        کلیک کنید*/}
                {/*    </Link>*/}
                {/*</div>*/}
            {/*</div>*/}
        </Fragment>
    );
};
export default SidebarSection;