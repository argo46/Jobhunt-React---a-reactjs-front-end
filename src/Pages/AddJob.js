import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import AddJobComponent from '../Components/AddJobComponent'
import {connect} from 'react-redux'
import {getCompanies} from '../redux/action/company'
import { addJob } from '../redux/action/jobs'

class AddJob extends Component {
  constructor(props){
    super(props)
    this.state={
      done:false,
      user:'',
      jobData:{},
      token:'',
      isLoading:'true'
    }
  }

  componentWillMount(){
    if (this.props.companies.data.length < 1) {
      this.props.dispatch(getCompanies())
    }
  }

  submitJob = (event) => {
    event.preventDefault()
    const dataRegister = {
      name: event.target.jobName.value,
      description: event.target.jobDescription.value,
      category: event.target.jobCategory.value,
      salary:event.target.jobSalary.value,
      location: event.target.jobLocation.value,
      company: event.target.companyID.value
   }
    console.log(dataRegister)
    let token = this.props.user.token
    this.props.dispatch(addJob(dataRegister, token))
    if(!this.props.jobs.isError && !this.props.jobs.isLoading){
      this.setState({done: true})
    }

  //   this.addJob(dataRegister)
  //     .then(data => {
  //       this.setState({done: true})
  //       console.log(data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  // addJob = async (dataRegister) => {
  //   const token = await localStorage.getItem('token')
  //   // const user = await axios.post('http://localhost:3000/job', dataRegister, {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':token}})
  //   const user = await axios({
  //     method:'POST',
  //     url:'http://localhost:3000/job',
  //     data:qs.stringify(dataRegister),
  //     headers:{
  //       'content-type': 'application/x-www-form-urlencoded',
  //       'authorization': 'Bearer '+ String(token)
  //     }
  //   })
  //   return user.data
  }

  render(){
    
    return(
      // this.state.user !=='' ? <Redirect to="/" /> : <LoginComponent 
      //                             onSubmit={this.onSubmit}/>
      this.state.done ? <Redirect to="/" /> :
      <AddJobComponent submitJob={this.submitJob}/>
    //<></>
    )
  }
}
const mapStateToProps = state => {
  return {
    companies: state.companies,
    user: state.user,
    jobs: state.jobs
  }
}

export default connect(mapStateToProps)(AddJob)