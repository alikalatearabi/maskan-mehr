import React, { Fragment, useState, useEffect } from 'react';
import ConfigDB from '../../../../Config/Theme-Config';

const ColorsComponent = () => {
  const default_color = localStorage.getItem('default_color') || ConfigDB.data.color.primary_color;
  const secondary_color = localStorage.getItem('secondary_color') || ConfigDB.data.color.secondary_color;
  const [colorBackground1, setColorBackground1] = useState(default_color);
  const [colorBackground2, setColorBackground2] = useState(secondary_color);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--theme-default',
      colorBackground1
    );
    document.documentElement.style.setProperty(
      '--theme-secondary',
      colorBackground2
    );
  }, [colorBackground1, colorBackground2]);


  const handleUnlimatedColor1Change = (e) => {
    const { value } = e.target;
    setColorBackground1(value);
  };
  const handleUnlimatedColor2Change = (e) => {
    const { value } = e.target;
    setColorBackground2(value);
  };
  const OnUnlimatedColorClick = () => {
    window.location.reload();
    document.documentElement.style.setProperty('--theme-default', colorBackground1);
    document.documentElement.style.setProperty('--theme-secondary', colorBackground2);
  };


  return (
    <Fragment>
    </Fragment>
  );
};

export default ColorsComponent;
