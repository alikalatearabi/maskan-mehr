import React, { Fragment, useEffect, useContext, useState } from 'react';
import ConfigDB from '../../../../Config/Theme-Config';
import CustomizerContext from '../../../../_helper/customizer/index';

const MixLayoutComponent = () => {
  const { addMixBackgroundLayout, setMixLayout } = useContext(CustomizerContext);
  const mixLayout = localStorage.getItem('mix_background_layout') || ConfigDB.data.color.mix_background_layout;
  const [isActive, setIsActive] = useState(1);
  useEffect(() => {
    if (mixLayout !== 'light-only') {
      setMixLayout(false);
    } else {
      setMixLayout(true);
    }
    ConfigDB.data.color.mix_background_layout = mixLayout;
    document.body.classList.add(mixLayout);
  }, [mixLayout, setMixLayout]);

  const handleCustomizerMix_Background = (value, num) => {
    addMixBackgroundLayout(value);
    if (value === 'light-only') {
      document.body.classList.add('light-only');
      document.body.classList.remove('dark-sidebar');
      document.body.classList.remove('dark-only');
      setIsActive(num);
    } else if (value === 'dark-sidebar') {
      document.body.classList.remove('light-only');
      document.body.classList.add('dark-sidebar');
      document.body.classList.remove('dark-only');
      setIsActive(num);
    } else if (value === 'dark-only') {
      document.body.classList.remove('light-only');
      document.body.classList.remove('dark-sidebar');
      document.body.classList.add('dark-only');
      setIsActive(num);
    }

  };
  return (
    <Fragment>
    </Fragment>
  );
};

export default MixLayoutComponent;
