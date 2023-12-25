import React, { Fragment } from 'react';
import { Col, Card, CardHeader, CardBody } from 'reactstrap';
import { Btn, H5 } from '../../../AbstractElements';
import { FlatButtonData } from '../../../Data/Buttons';

const FlatButtonContain = () => {
  return (
    <Fragment>
      <Col sm="12">
        {FlatButtonData.map((item, i) =>
          <Card key={i}>
            <CardHeader className='pb-0'>
              <H5>{item.title}</H5>
              <span>{item.span} <code>{item.code}</code> {item.detail}</span>
            </CardHeader>
            <CardBody>
              <div className="btn-showcase">
                {
                  item.btnSub.map((btnItem, i) =>
                    <Btn attrBtn={{
                      className: btnItem.btnClass,
                      color: btnItem.colorClass, size: btnItem.size && btnItem.size,
                      active: btnItem.active && true,
                      disabled: btnItem.disabled && true,
                      outline: btnItem.outline && true
                    }} key={i}
                    >
                      {btnItem.title}
                    </Btn>
                  )
                }
              </div>
            </CardBody>
          </Card>
        )}
      </Col>
    </Fragment>
  );
};

export default FlatButtonContain;