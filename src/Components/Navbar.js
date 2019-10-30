import React, { useState } from 'react';
import {BrowserRouter,Link} from 'react-router-dom'
import '../App.css'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none'
  }

  return (
    <div>
      <Navbar style={{backgroundColor: '#0275d8', }} light expand="md">
        <Link to='/' className='nav-bar-brand' style={navLinkStyle}>JobHunt</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#" style={navLinkStyle}>Components</NavLink>
            </NavItem>
            <NavItem>
              <Link to='/login' className='nav-link'  style={navLinkStyle}>Login</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={navLinkStyle}>
                {props.user!=='' ? props.user : 'user'}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;