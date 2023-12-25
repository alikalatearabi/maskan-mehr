import React, { Fragment, useEffect, useState } from 'react';
import {GitBranch, LogIn, Settings} from 'react-feather';
import { Media } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LI, UL } from '../../AbstractElements';
import MaxMiniSize from './MaxMiniSize';
import MoonLight from './MoonLight';

const HeaderContain = () => {
  const [name, setName] = useState('');
  useEffect(() => {
    setName(localStorage.getItem('Name'));
  }, []);
  const authenticated = JSON.parse(localStorage.getItem('authenticated'));
  const auth0_profile = JSON.parse(localStorage.getItem('auth0_profile'));
  const history = useNavigate();
  const Logout = () => {
    localStorage.removeItem('profileURL');
    localStorage.removeItem('Name');
    localStorage.removeItem('token');
    localStorage.removeItem('Role');
    localStorage.removeItem('Manager');
    localStorage.removeItem('managerId');
    history(`${process.env.PUBLIC_URL}/login`);
  };

  const manager = localStorage.getItem('Manager')

  return (
    <Fragment>
      <div className="nav-right col-10 col-sm-6 pull-right right-header p-0 dash-76">
        <UL attrUL={{ className: `simple-list flex-row nav-menus` }}>
          <MoonLight />
          <MaxMiniSize />
          <LI attrLI={{ className: 'profile-nav pb-0 onhover-dropdown pe-0 pt-0 me-0' }} >
            <Media className="profile-media">
              <Media body>
                <span>{authenticated ? auth0_profile.name : name}</span>
              </Media>
            </Media>
            <UL attrUL={{ className: `simple-list profile-dropdown onhover-show-div` }}>
              {manager !== "null" && <LI><i><GitBranch /></i><span>{manager}</span></LI> }
              <LI><Link to={`${process.env.PUBLIC_URL}/changePassword/`}><i><Settings /></i><span>تغییر رمزعبور</span></Link></LI>
              <LI attrLI={{ onClick: Logout }}>
                <Link to={`${process.env.PUBLIC_URL}/login`}>
                  <LogIn /><span>خروج</span>
                </Link>
              </LI>
            </UL>
          </LI>
        </UL>
      </div >
    </Fragment >
  );
};
export default HeaderContain;
