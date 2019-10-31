import React, { useState } from 'react';
import {Row, Col, Container, 
  Button, Input, InputGroup, 
  InputGroupAddon, Dropdown, 
  DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap'
import {Link} from 'react-router-dom'

function JobContents (props) {

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  let editButtonStyle = {
    position: 'absolute',
    top:'10px',
    right:'10px',
    fontSize:'0.5rem',
    // display: 'none'
  }

  let deleteButtonStyle = {
    position: 'absolute',
    top:'40px',
    right:'10px',
    fontSize:'0.3rem',
    // display: 'none'
  }

  return (
    <Row><Col className="d-flex justify-content-center">
    <Container style={{margin:'1rem', maxWidth: '700px'}}>
      <Row style={{margin:'0'}} key="namesearchhomepage">
        <InputGroup>
          <Input type="search"
                name="nameSearch"
                id="nameSearch"
                placeholder="Job's Name"
                // value={props.state.query.qname} 
                onChange={props.onChangeName}
                />
          <Input type="search"
                placeholder="Company Name"
                name="companySearch"
                onChange={props.onChangeCompany}
                // value={props.state.query.qcompany}
                 />
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={props.doSearch}>Search</Button>
        </InputGroupAddon>
      </InputGroup>
      </Row>
      <Row>
        <div className='col-sm-6'> 
        {
          props.state.data.total_result > 1 ? 
          <p style={{margin: '1rem 0 0 0'}}><strong>{props.state.data.total_result}</strong> jobs found.</p> :
          <p style={{margin: '1rem 0 0 0'}}><strong>{props.state.data.total_result}</strong> job found.</p>
        }
        </div>
        <div className='col-sm-6'>
        <Dropdown isOpen={isOpen} toggle={toggle} style={{position:'absolute', bottom:'0', right:'0', marginRight: '1rem'}}>
          <DropdownToggle className='btn btn-primary' caret style={{fontSize:'0.75rem'}}>
          urutkan
          </DropdownToggle>
            
          <DropdownMenu>
            <DropdownItem onClick={()=>props.sortBy('date_updated')} >Newest</DropdownItem>
            <DropdownItem onClick={()=>props.sortBy('name')}>Job's Name</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
      </Row>
      <Row className='justiy-content-md-center list-group' style={{padding:'0', margin: '0'}}>
        {props.state.isLoading&&(
          <p>Loading...</p>
        )}
        {!props.state.isLoading&&
          <React.Fragment>
            {props.state.data.result.map((v) => (
              <div key={v.id} className='list-group-item'>
              <Row>
              {
                props.state.user !== 'user' && props.state.isEdit ? 
                <Link to={'/update-job/'+v.id}><Button color='primary' style={editButtonStyle}>EDIT</Button></Link> : 
                <Button style={{display:'none'}}>edit</Button>
              }
              </Row>
              <Row>
              {
                props.state.user !== 'user' && props.state.isEdit ? 
                <Button color='danger' style={deleteButtonStyle} onClick={()=>{props.deleteJob(v.id)}}>DELETE</Button>: 
                <Button style={{display:'none'}}>DELETE</Button>
              }
              </Row>
              <Row className='row col-md-12'>
                <div className='col-md-3'><img src={v.company_logo} alt='Company Logo' style={{display:'block', maxWidth: '110px'}}/></div>
                <div className='col-md-9'>
                  <p style={{fontWeight: 'bold'}}>{v.name}</p> 
                  <p>{v.location} | {v.category}</p>
                  <p>{v.salary}</p> 
                  <p className='text-justify' style={{maxHeight: '150px', overflow:'hidden', textOverflow: 'ellipsis', marginBottom:'70px'}}>{v.description}</p>
                  <p style={{position:'absolute', right:'0px', bottom:'0px'}}>{(new Date(v.date_updated) + (new Date().getTimezoneOffset()/60)).slice(0,21)}</p>
                </div>
              </Row>
              </div>
            ))}
          </React.Fragment>
        }
      </Row>
      <Row className='justify-content-center'>
        <Col>
        {
          props.state.prev === '' ? <Button color='primary' disabled>Prev</Button> :
          <Button color='primary' onClick={()=>props.buttonPress(props.state.prev)}>Prev</Button>
        }
        <span>&nbsp;</span>
        {
          props.state.next === '' ? <Button color='primary' disabled>Next</Button> :
          <Button color='primary' onClick={()=>props.buttonPress(props.state.next)}>Next</Button>
        }
        </Col>
      </Row>
      </Container>
      </Col>
    </Row>
  )
}

export default JobContents