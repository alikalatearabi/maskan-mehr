import React, { Fragment } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { P } from '../../AbstractElements';

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md='12' className="footer-copyright text-center">
              <P attrPara={{ className: 'mb-0' }}>تمامی حقوق متعلق به شرکت خدمات بیمه ای مسکن میباشد.  </P>
            </Col>
          </Row>
        </Container>
      </footer>
    </Fragment>
  );
};
export default Footer;
