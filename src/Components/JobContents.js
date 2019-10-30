import React, { useState } from 'react';
import {Row, Col, Container, 
  Button, Input, InputGroup, 
  InputGroupAddon, Dropdown, 
  DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap'

function JobContents (props) {

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <Container style={{margin:'1rem', maxWidth: '40rem'}}>
      <Row style={{margin:'0'}}>
        <InputGroup>
          <Input type="search"
                placeholder="Nama Pekerjaan"
                onChange={props.onChangeName}
                value={props.state.qname} />
          <Input type="search"
                placeholder="Nama Perusahaan"
                onChange={props.onChangeCompany}
                value={props.state.qcompany} />
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={()=>props.doSearch()}>Cari</Button>
        </InputGroupAddon>
      </InputGroup>
      </Row>
      <Row>
        <div className='col-sm-6'>
          <p style={{margin: '1rem 0 0 0'}}><strong>{props.state.data.total_result}</strong> pekerjaan ditemukan</p>
        </div>
        <div className='col-sm-6'>
        <Dropdown isOpen={isOpen} toggle={toggle} style={{position:'absolute', bottom:'0', right:'0', marginRight: '1rem'}}>
          <DropdownToggle className='btn btn-primary' caret style={{fontSize:'0.75rem'}}>
          urutkan
          </DropdownToggle>
            
          <DropdownMenu>
            <DropdownItem onClick={()=>props.sortBy('date_updated')} >Tanggal diperbarui</DropdownItem>
            <DropdownItem onClick={()=>props.sortBy('name')}>Nama Pekerjaan</DropdownItem>
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
              <div className='list-group-item'>
              <Row key={v.id} className='row col-md-12' >
                <div className='col-md-3'><img onClick={()=>this.goToDetail(v.id)} src={v.company_logo} alt='Company Logo' style={{display:'block', maxWidth: '110px'}}/></div>
                <div className='col-md-9'>
                  <p style={{fontWeight: 'bold'}}>{v.name}</p> 
                  <p>{v.location} | {v.category}</p>
                  <p>{v.salary}</p> 
                  <p className='text-justify' style={{maxHeight: '150px', overflow:'hidden', textOverflow: 'ellipsis'}}>{v.description}</p>
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
  )
}

export default JobContents