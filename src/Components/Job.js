import React, { Component } from 'react'
import {Row, Button} from 'reactstrap'
import {Link} from 'react-router-dom'

export default class Job extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  render() {
    return (
         <div>
         {this.props.data.result.map((v) => (
               <div key={v.id} className='list-group-item'>
               <Row>
               {
                 this.props.user !== 'user' && this.props.isEdit ? 
                 <Link to={'/update-job/'+v.id}><Button color='primary' style={editButtonStyle}>EDIT</Button></Link> : 
                 <Button style={{display:'none'}}>edit</Button>
               }
               </Row>
               <Row>
               {
                 this.props.user !== 'user' && this.props.isEdit ? 
                 <Button color='danger' style={deleteButtonStyle} onClick={()=>{this.props.deleteJob(v.id)}}>DELETE</Button>: 
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
       </div> 
    )
  }
}

const editButtonStyle = {
  position: 'absolute',
  top:'10px',
  right:'10px',
  fontSize:'0.5rem',
}

const deleteButtonStyle = {
  position: 'absolute',
  top:'40px',
  right:'10px',
  fontSize:'0.3rem',
  // display: 'none'
}
