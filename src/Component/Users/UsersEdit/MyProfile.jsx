import React, { Fragment } from 'react';
import { Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Media, Row } from 'reactstrap';
import { Btn, H3, H4, H6, Image, P } from '../../../AbstractElements';
import { MyProfile, Bio, Password, Website, Save, EmailAddress } from '../../../Constant';
import user from '../../../assets/images/user/7.jpg';
import { Link } from 'react-router-dom';

const MyProfileEdit = () => {
  return (
    <Fragment>
      <Card>
        <CardHeader className="pb-0">
          <H4 attrH4={{ className: 'card-title mb-0' }}>{MyProfile}</H4>
          <div className="card-options">
            <a className="card-options-collapse" href="#javascript">
              <i className="fe fe-chevron-up"></i>
            </a>
            <a className="card-options-remove" href="#javascript">
              <i className="fe fe-x"></i>
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="mb-2">
              <div className="profile-title">
                <Media>
                  <Image attrImage={{ className: 'img-70 rounded-circle', alt: '', src: `${user}` }} />
                  <Media body>
                    <H3 attrH3={{ className: 'mb-1 f-20 txt-primary' }}>
                      <Link to={`${process.env.PUBLIC_URL}/users/userprofile`}>MARK JECNO</Link>
                    </H3>
                    <P>DESIGNER</P>
                  </Media>
                </Media>
              </div>
            </Row>
            <FormGroup className="mb-3">
              <H6 attrH6={{ className: 'form-label' }}>{Bio}</H6>
              <Input type="textarea" className="form-control input-air-primary" rows="5" defaultValue="On the other hand, we denounce with righteous indignation" />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label className="form-label">{EmailAddress}</Label>
              <Input className="form-control input-air-primary" placeholder="your-email@domain.com" />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label className="form-label">{Password}</Label>
              <Input className="form-control input-air-primary" type="password" defaultValue="password" />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label className="form-label">{Website}</Label>
              <Input className="form-control input-air-primary" placeholder="http://Uplor .com" />
            </FormGroup>
            <div className="form-footer">
              <Btn attrBtn={{ className: 'btn-block', color: 'primary', type: 'button' }}>{Save}</Btn>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default MyProfileEdit;