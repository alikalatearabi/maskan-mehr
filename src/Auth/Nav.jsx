import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';


const NavAuth = ({ callbackNav, selected }) => {
    return (
        <Nav className="border-tab flex-column" tabs>
            <NavItem>
                <NavLink className={selected === 'jwt' ? 'active' : ''} onClick={() => callbackNav('jwt')}>
                    <span>ورود</span>
                </NavLink>
            </NavItem>
        </Nav>
    );
};

export default NavAuth;