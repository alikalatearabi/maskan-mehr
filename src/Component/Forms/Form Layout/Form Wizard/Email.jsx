import { Email, Password, ConfirmPassword } from '../../../../Constant';
import React, { Fragment } from 'react';
import { Row, Col, Form, Label, Input } from 'reactstrap';

const Emails = () => {
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Form className="needs-validation" noValidate>
            <Row>
              <Col md="12 mb-3">
                <Label htmlFor="exampleFormControlInput1">{Email}</Label>
                <Input className="form-control input-air-primary" type="email" placeholder="name@example.com" />
                <div className="valid-feedback">{'Looks good!'}</div>
              </Col>
              <Col md="12 mb-3">
                <Label htmlFor="exampleInputPassword2">{Password}</Label>
                <Input className="form-control input-air-primary" type="password" placeholder="Password" />
                <div className="valid-feedback">{'Looks good!'}</div>
              </Col>
              <Col md="12 mb-3">
                <Label htmlFor="exampleInputPassword2">{ConfirmPassword}</Label>
                <Input className="form-control input-air-primary" type="password" placeholder="Password" />
                <div className="valid-feedback">{'Looks good!'}</div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Emails;