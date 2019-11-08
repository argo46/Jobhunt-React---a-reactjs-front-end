import React, { Component } from 'react'
import {Row, Col, Button} from 'reactstrap'

export default class Pagination extends Component {

  render() {
    return (
      <Row className='justify-content-center' style={{display: 'flex', flexDirection:'Row', alignItems:'center'}}>
          {
            !(this.props.prev)? <Button color='primary' disabled style={{margin:'auto'}}>Prev</Button> :
            <Button color='primary' onClick={()=>this.props.paginationButtonPressed(this.props.prev)} style={{margin:'auto'}}>Prev</Button>
          }
          {
            !(this.props.next)? <Button color='primary' disabled style={{margin:'auto'}}>Next</Button> :
            <Button color='primary' onClick={()=>this.props.paginationButtonPressed(this.props.next)} style={{margin:'auto'}}>Next</Button>
          }
      </Row>
    )
  }
}
