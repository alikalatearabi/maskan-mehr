import { H3, H5, P } from '../../../AbstractElements';
import React, { useState, Fragment } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import SimpleMDE from 'react-simplemde-editor';

const SmallEditor = () => {
    const [value, setValue] = useState();
    const handleChange = (e) => {
        setValue(e);
    };
    return (
      <Fragment>
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <H5>Second Example</H5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <SimpleMDE
                                            id="editor_container"
                                            options={{
                                                autofocus: true,
                                                spellChecker: false
                                            }}
                                            onChange={handleChange} />
                    </Col>
                    <div className="col-md-6 reader">
                      <H3>Instructions</H3>
                      <P>{'Enter text in the area on the left. For more info, click the ? (help) icon in the menu.'}</P><br />
                      {value}
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
};
export default SmallEditor;