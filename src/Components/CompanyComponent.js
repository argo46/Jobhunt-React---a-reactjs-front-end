import React from 'react';
import {Row, Col, Container, 
  Button} from 'reactstrap'

function JobContents (props) {

  return (
    <Row><Col className="d-flex justify-content-center">
    <Container style={{margin:'1rem', maxWidth: '700px'}}>
      <Row className='justiy-content-md-center list-group' style={{padding:'0', margin: '0'}}>
        {props.state.isLoading&&(
          <p>Loading...</p>
        )}
        {!props.state.isLoading&&
          <React.Fragment>
            {props.state.data.map((v) => (
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