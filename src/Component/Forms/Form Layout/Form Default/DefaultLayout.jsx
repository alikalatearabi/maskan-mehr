import { Btn } from '../../../../AbstractElements';
import { Cancel, EmailAddress, Password, Submit } from '../../../../Constant';
import React, { Fragment } from 'react';
import { Input, Label, FormGroup, Form, CardBody, CardFooter } from 'reactstrap';

const DefaultLayout = () => {
  return (
    <Fragment>
      <CardBody>
        <Form className="theme-form">
          <FormGroup>
            <Label className="col-form-label pt-0" >{EmailAddress}</Label>
            <Input className="form-control input-air-primary" type="email" placeholder="Enter email" />
            <small className="form-text text-muted">{'We\'ll never share your email with anyone else.'}</small>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="exampleInputPassword1">{Password}</Label>
            <Input className="form-control input-air-primary" type="password" placeholder="Password" />
          </FormGroup>
          <div className="checkbox p-0">
            <Input id="default-checkbox" type="checkbox" data-original-title="" title="" />
            <Label className="mb-0" for="default-checkbox">{'Remember my preference'}</Label>
          </div>
        </Form>
      </CardBody>
      <CardFooter>
        <Btn attrBtn={{ color: 'primary', className: 'me-2' }}>{Submit}</Btn>
        <Btn attrBtn={{ color: 'secondary' }}>{Cancel}</Btn>
      </CardFooter>
    </Fragment>
  );
};
export default DefaultLayout;