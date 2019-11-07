import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import '../App.css'

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
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
            {
              props.isEdit? 
                <NavItem>
                  <Button color="success" onClick={props.toogleIsEdit}>Done Edit</Button>
                </NavItem> : <span></span>
            }
            
            <NavItem>
            <Link to='/' className='nav-link'  style={navLinkStyle}>Jobs</Link>
            </NavItem>
           {
             props.user === '' || props.user === 'user' ?
                <React.Fragment>  
                  <NavItem>
                  <Link to='/register' className='nav-link'  style={navLinkStyle}>Register</Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/login' className='nav-link'  style={navLinkStyle}>Login</Link>
                  </NavItem>
                </React.Fragment> : <span></span>
           }
          
          {
            props.user !== '' && props.user !== 'user' ?

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={navLinkStyle}>
                {props.user!=='' ? props.user : 'user'}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <Link to='/add-job/new' style={{textDecoration: 'none'}}>Add Job</Link>
                </DropdownItem>
                <DropdownItem>
                <Link style={{textDecoration: 'none'}} onClick={props.toogleIsEdit}>Edit Job</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <Link to='/company' style={{textDecoration: 'none'}}>Company List</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <Link to='#' style={{textDecoration: 'none'}} onClick={props.logout}>Logout</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> :<></>
          }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;