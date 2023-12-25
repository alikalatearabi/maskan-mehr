import React, { Fragment, useEffect } from 'react';
import ConfigDB from '../../../../Config/Theme-Config';

const LayoutType = () => {
  const localStorageLayout = localStorage.getItem('layout_type') || ConfigDB.data.settings.layout_type;

  useEffect(() => {
    localStorageLayout && document.body.classList.add(localStorageLayout);
    ConfigDB.data.settings.layout_type = localStorageLayout;
    // document.body.classList.add(localStorageLayout);
    if (localStorageLayout === 'box-layout') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = localStorageLayout;
    }
  }, [localStorageLayout]);


  return (
    <Fragment>
    </Fragment>
  );
};

export default LayoutType;
