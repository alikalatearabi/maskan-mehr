import React, { Fragment, useContext, useState } from 'react';
import { Users } from 'react-feather';
import { Row, Col, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, Form } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { NewContacts, AddContacts, Name, Mobile, Save, Cancel, Email, Phone, LastName } from '../../../Constant';
import defaultuser from '../../../assets/images/user/user.png';
import { Btn } from '../../../AbstractElements';
import ContactAppContext from '../../../_helper/Contact/index';

const CreateContact = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser } = useContext(ContactAppContext);
  const AddContact = data => {
    if (data !== undefined) {
      createUser(data, defaultuser);
      setModal(false);
    } else {
      errors.showMessages();
    }
  };
  return (
    <Fragment>
      <Btn attrBtn={{ className: 'badge-light btn-block btn-mail w-100', color: 'primary', onClick: toggle }} >
        <Users className="me-2" />
        {NewContacts}
      </Btn>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader>{AddContacts}
          <Btn attrBtn={{ color: 'transprant', className: 'btn-close', onClick: toggle, type: 'button' }}></Btn>
        </ModalHeader>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(AddContact)}>
            <div className="form-row">
              <FormGroup className="col-md-12">
                <Row>
                  <Col sm="6">
                    <Label>{Name}</Label>
                    <input className="form-control input-air-primary" name="name" type="text"
                      {...register('name', { required: true })} />
                    <span style={{ color: 'red' }}>{errors.name && 'First name is required'}</span>
                  </Col>
                  <Col sm="6">
                    <Label>{LastName}</Label>
                    <input className="form-control input-air-primary" name="surname" type="text"
                      {...register('surname', { required: true })} />
                    <span style={{ color: 'red' }}>{errors.surname && 'Last name is required'}</span>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className="col-md-12">
                <Label>{Email}</Label>
                <input className="form-control input-air-primary" name="email" type="text" {...register('email', { required: true })} />
                <span style={{ color: 'red' }}>{errors.email && 'Please enter email.'}</span>
              </FormGroup>
              <FormGroup className="col-md-12">
                <Row>
                  <Col sm="6">
                    <Label>{Phone}</Label>
                    <input className="form-control input-air-primary" name="mobile" type="number" {...register('mobile', { pattern: /\d+/, minlength: 0, maxlength: 9 })} />
                    <span style={{ color: 'red' }}>{errors.mobile && 'Please enter number max 9 digit'}</span>
                  </Col>
                  <Col sm="6">
                    <Label>{Mobile}</Label>
                    <Input type="select" className="form-control input-air-primary" >
                      <option value="1">Mobile</option>
                      <option value="2">Work</option>
                      <option value="3">Other</option>
                    </Input>
                    <span style={{ color: 'red' }}>{errors.mobile && 'Please enter number max 9 digit'}</span>
                  </Col>
                </Row>
              </FormGroup>
            </div>
            <Btn attrBtn={{ color: 'secondary', className: 'me-1' }} type="submit">{Save}</Btn>&nbsp;
            <Btn attrBtn={{ color: 'primary', onClick: toggle }} >{Cancel}</Btn>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default CreateContact;