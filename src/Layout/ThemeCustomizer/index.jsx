import React, { Fragment, useState } from 'react';
import TabCustomizer from './TabCustomizer';

const Themecustomizer = () => {
  const [selected, setSelected] = useState('check-layout');
  const [openCus, setOpenCus] = useState(false);

  const callbackNav = ((select, open) => {
    setSelected(select);
    setOpenCus(open);
  });

  return (
    <Fragment>
      <div className={`customizer-links ${openCus && 'open'}`}>
        <div className={`customizer-contain ${openCus && 'open'}`}>
          <TabCustomizer selected={selected} callbackNav={callbackNav} />
        </div>
      </div>
    </Fragment>
  );
};

export default Themecustomizer;
