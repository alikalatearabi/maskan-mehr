import React, { Fragment } from 'react';
import { FormGroup, Input } from 'reactstrap';

const FormPassword = () => {
    return (
        <Fragment>
            <FormGroup className="login-btn">
                <div className="checkbox">
                    <Input id="checkbox1" type="checkbox" />
                </div>
            </FormGroup>
        </Fragment>
    );
};
export default FormPassword;