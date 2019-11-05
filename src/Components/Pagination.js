import React, { Component } from 'react'
import {Row, Col, Button} from 'reactstrap'

export default class Pagination extends Component {

  render() {
    return (
      <Row className='justify-content-center'>
          <Col>
          {
            !(this.props.prev)? <Button color='primary' disabled>Prev</Button> :
            <Button color='primary' onClick={()=>this.props.paginationButtonPressed(this.props.prev)}>Prev</Button>
          }
          {
            !(this.props.next)? <Button color='primary' disabled>Next</Button> :
            <Button color='primary' onClick={()=>this.props.paginationButtonPressed(this.props.next)}>Next</Button>
          }
        </Col>
      </Row>
    )
  }
}
