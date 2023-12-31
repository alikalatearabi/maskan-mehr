import { Btn } from '../../../../AbstractElements';
import { Cancel, EmailAddress, ExampleMultipleSelect, ExampleSelect, ExampleTextarea, Password, Submit } from '../../../../Constant';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { CardBody, CardFooter, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const BasicForm = () => {
  const { handleSubmit } = useForm();
  const onSubmit = data => { };
  return (
    <Fragment>
      <Form className="form theme-form" onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="exampleFormControlInput1">{EmailAddress}</Label>
                <Input className="form-control input-air-primary" type="email" placeholder="name@example.com" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="exampleInputPassword2">{Password}</Label>
                <Input className="form-control input-air-primary" type="password" placeholder="Password" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="exampleFormControlSelect9">{ExampleSelect}</Label>
                <Input type="select" name="select" className="form-control digits" defaultValue="1">
                  <option>{'1'}</option>
                  <option>{'2'}</option>
                  <option>{'3'}</option>
                  <option>{'4'}</option>
                  <option>{'5'}</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="exampleFormControlSelect3">{ExampleMultipleSelect}</Label>
                <Input type="select" name="select" className="form-control digits" multiple="" defaultValue="1">
                  <option>{'1'}</option>
                  <option>{'2'}</option>
                  <option>{'3'}</option>
                  <option>{'4'}</option>
                  <option>{'5'}</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup className="mb-0">
                <Label>{ExampleTextarea}</Label>
                <Input type="textarea" className="form-control input-air-primary" rows="3" />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="text-end">
          <Btn attrBtn={{ color: 'primary', type: 'submit', className: 'me-2' }}>{Submit}</Btn>
          <Btn attrBtn={{ color: 'light', type: 'reset' }}>{Cancel}</Btn>
        </CardFooter>
      </Form>
    </Fragment>
  );
};
export default BasicForm;