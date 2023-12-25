import React, { Fragment, useEffect, useState } from 'react';

const Loader = (props) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);
  return (
    <Fragment>
      <div className={`loader-wrapper ${show ? '' : 'loaderhide'}`}>
        <div className="loader">
          <div className="loader-box">
            <div className="loader-17"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Loader;