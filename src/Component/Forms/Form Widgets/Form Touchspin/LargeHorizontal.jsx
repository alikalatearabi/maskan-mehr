import React, { Fragment, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Input } from 'reactstrap';
import { Btn, H5 } from '../../../../AbstractElements';

const LargeHorizontal = () => {
  const [val, setVal] = useState(10);
  const onChangeHandle = (event) => {
    setVal(event.target.value);
  };
  const Minus = () => {
    setVal(val - 1);
  };
  const Addition = () => {
    setVal(val + 1);
  };
  return (
    <Fragment>
      <Col sm="12" md="6">
        <Card>
          <CardHeader className="pb-0">
            <H5 attrH5={{ className: 'card-title' }}>Large Horizontal Touchspin</H5><span>Add <code>.input-group-lg</code>class to input-group.</span>
          </CardHeader>
          <CardBody>
            <div className="input-group bootstrap-touchspin">
              <Btn attrBtn={{ color: 'primary', className: 'bootstrap-touchspin-down', onClick: Minus }}><i className="fa fa-minus"></i>
              </Btn>
              <Input className="touchspin" type="text" value={val} onChange={e => onChangeHandle(e)} />
              <Btn attrBtn={{ color: 'primary btn-square', className: 'bootstrap-touchspin-up', onClick: Addition }}><i className="fa fa-plus"></i></Btn>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};
export default LargeHorizontal;