import React, { useContext, useState } from 'react';
import { Image } from '../../AbstractElements';
import CheckContext from '../../_helper/customizer/index';
import logo from '../../assets/img/logo.jpg';
import {Col} from "reactstrap";

const SidebarIcon = () => {
  const { toggleSidebar } = useContext(CheckContext);
  const [toggle, setToggle] = useState(false);
  const openCloseSidebar = () => {
    setToggle(!toggle);
    toggleSidebar(toggle);
  };
  return (
    <div className="logo-wrapper text-center mx-auto">
      <a href="/dashboard/operations/SpecificationsMaskanMehr/">
          <Col>
            <Image attrImage={{ className: 'img-fluid', src: `${logo}`, alt: 'لوگو' }} />
          </Col>
          <Col className="text-black f-20 mt-2">
              خسارت مسکن مهر
          </Col>
      </a>
      <div className='back-btn' onClick={() => openCloseSidebar()}><i className='fa fa-angle-left'></i></div>
    </div>
  );
};
export default SidebarIcon;