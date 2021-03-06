import React from 'react';
import {Row, Col, Container, 
  Button} from 'reactstrap'
import {Link} from 'react-router-dom'

function JobContents (props) {

  return (
    <Row><Col className="d-flex justify-content-center">
    <Container style={{margin:'1rem', maxWidth: '700px'}}>
      <Row>
      <Link to="/company/new"><Button>Add Company</Button></Link>  
      </Row>
      <Row className='justiy-content-md-center list-group' style={{padding:'0', margin: '0'}}>
        {props.isLoading&&(
          <p>Loading...</p>
        )}
        {!props.isLoading&&
          <React.Fragment>
            {props.data.map((v) => (
              <div key={v.id} className='list-group-item'>
              <Row className='row col-md-12'>
                <div className='col-md-3'><img src={v.logo} alt='Company Logo' style={{display:'block', maxWidth: '110px'}}/></div>
                <div className='col-md-9'>
                  <p style={{fontWeight: 'bold'}}>{v.name}</p> 
                  <p>Location  : {v.location}</p>
                  <p>Company id: {v.id}</p> 
                  <p>description :</p>
                  <p className='text-justify' style={{maxHeight: '150px', overflow:'hidden', textOverflow: 'ellipsis'}}>{v.description}</p>
                </div>
                <div>
                  <Button color='danger' onClick={()=>{props.deleteCompany(v.id)}}>Delete</Button>
                  <Link to = {"/company/"+v.id}><Button color='primary'>Update</Button></Link>
                  </div>
              </Row>
              </div>
            ))}
          </React.Fragment>
        }
      </Row>
    </Container>

    </Col></Row>
  )
}

export default JobContents