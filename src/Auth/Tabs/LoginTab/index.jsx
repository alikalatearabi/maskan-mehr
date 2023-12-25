import React, { Fragment, useState, useEffect } from 'react';
import {Form, FormGroup, Input, InputGroup, InputGroupText, Label} from 'reactstrap';
import {Alerts, Btn} from '../../../AbstractElements';
import FormHeader from './FormHeader';
import FormPassword from './FormPassword';
import axios from "../../../api/axios";
import { useLocation } from "react-router-dom";
import "./index.css"

const LoginTab = ({ selected }) => {
    const [errMsg, setErrMsg] = useState('')

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/Account/Login", JSON.stringify(
                {
                    'username': username,
                    'password': password,
                }),
                {
                    headers: {"Content-Type": "application/json"},
                })
                .then(response => {
                    const token = response.data.jwtToken;
                    const fullName = response.data.fullName;
                    const Role = response.data.role;
                    const managerName = response.data.managerName;
                    const managerId = response.data.managerId;

                    localStorage.setItem("token", token);
                    localStorage.setItem("Name", fullName);
                    localStorage.setItem("Role", Role);
                    localStorage.setItem("Manager", managerName);
                    localStorage.setItem("managerId", managerId);

                    setName(fullName);

                    window.location.href = from;

                })
        } catch(err){
            if (err.response.status === 404) {
                setErrMsg("نام کاربری و رمز عبور همخوانی ندارند.");
                setLoading(false)
            } else {
                setErrMsg("خطایی در هنگام ورود رخ داد.");
                setLoading(false)
            }
        }
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);

    const [name, setName] = useState(
        localStorage.getItem('Name')
    );

    useEffect(() => {
        localStorage.setItem('Name', name);
    }, [name]);


    return (
        <Fragment>
            <Form className="theme-form login-form">
                <FormHeader selected={selected} />
                <FormGroup>
                    <Label>نام کاربری</Label>
                    <InputGroup>
                        <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                        <Input className="form-control form-control-login input100" type="username" required="" onChange={e => setUsername(e.target.value)} value={username} />
                        <span className="focus-input100"></span>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label>رمزعبور</Label>
                    <InputGroup>
                        <InputGroupText><i className="fa fa-key"></i></InputGroupText>
                        <Input className="form-control form-control-login input100" type={togglePassword ? 'text' : 'password'} onChange={e => setPassword(e.target.value)} value={password} required="" />
                        <span className="focus-input100"></span>
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? '' : 'show'}></span></div>
                    </InputGroup>
                </FormGroup>
                <FormPassword />
                <FormGroup>
                    <Btn attrBtn={{ color: 'primary', className: 'btn-block', disabled: loading ? loading : loading, onClick: (e) => handleSubmit(e) }} >{loading ? 'درحال ورود...' : 'ورود'}</Btn>
                </FormGroup>
                {errMsg &&
                    <Alerts attrAlert={{ color: 'danger' }}>
                        {errMsg}
                    </Alerts>
                }
            </Form>
        </Fragment>
    );
};

export default LoginTab;