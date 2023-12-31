import React, { Fragment, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Input, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Btn, H5 } from '../../../../AbstractElements';

const DropdownTouchspin = () => {
  const [val, setVal] = useState(69);
  const Minus = () => {
    setVal(val - 0.25);
  };
  const Addition = () => {
    setVal(val + 0.25);
  };
  const onChangeHandle = (event) => {
    setVal(event.target.value);
  };
  return (
    <Fragment>
      <Col sm="12" md="6">
        <Card>
          <CardHeader className="pb-0">
            <H5 attrH5={{ className: 'card-title' }}>Touchspin With Dropdown</H5><span>Use <code>data-bts-prefix & data-bts-postfix</code>attribute to set Prefix and Postfix to touchspin input with button.</span>
          </CardHeader>
          <CardBody>
            <div className="input-group bootstrap-touchspin">
              <Btn attrBtn={{ color: 'primary', className: 'bootstrap-touchspin-down', onClick: Minus }}><i className="fa fa-minus"></i>
              </Btn>
              <InputGroupText>{'Pre'}</InputGroupText>
              <Input className="touchspin" type="text" value={val} onChange={e => onChangeHandle(e)} />
              <InputGroupText>{'Post'}</InputGroupText>
              <Btn attrBtn={{ color: 'primary btn-square', className: 'bootstrap-touchspin-up', onClick: Addition }}><i className="fa fa-plus"></i></Btn>
              <div className="dropdown-basic">
                <div className="dropdown">
                  <div className="btn-group mb-0 me-0">
                    <Btn attrBtn={{ className: 'dropbtn btn-light txt-dark', type: 'button' }}> Action < span > <i className="icofont icofont-arrow-down"></i></span></Btn>
                    <div className="dropdown-content"><a href="#javascript">Action</a><a href="#javascript">Another Action</a><a href="#javascript">Something Else Here</a>
                      <div className="dropdown-divider"></div><a href="#javascript">Separated Link </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col >
    </Fragment >
  );
};
export default DropdownTouchspin;