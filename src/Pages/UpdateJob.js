import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import UpdateJobComponent from '../Components/UpdateJobComponent'
import {connect} from 'react-redux'
import {updateJob} from '../redux/action/jobs'

class UpdateJob extends Component {
  constructor(props){
    super(props)
    this.state={
      done:false,
      user:'',
      jobData:{},
      token:'',
      isLoading:'true',
      categoriesOption:[]
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
    this.props.dispatch(updateJob())
    if(!this.jobs.isLoading && !this.jobs.isError){
      this.setState({done:true})
    }
    // this.updateJob(dataRegister)
    //   .then(data => {
    //       console.log(data)
    //       this.setState({done:true})
    //   })
    //   .catch(err => {
    //     console.log(err)
    // })    
  }

  componentWillMount () {
    this.getSingleJobData(this.props.match.params.id)
    .then(data => {
      this.setState({jobData: data[0]})
      console.log(data[0])
    })
    .catch(err => {
      console.log(err)
    }) 

    this.getAllCategories()
      .then(data => {
        this.setState({categoriesOption: data})
      })
      .catch(err=> {
        console.log(err)
      })
  }

  getAllCategories = async () => {
    const user = await axios({
      method:'GET',
      url:'http://localhost:3000/category/',
    })
    return user.data
  }

  getSingleJobData = async (id) => {
    const user = await axios({
      method:'GET',
      url:'http://localhost:3000/job/id/' + id,
    })
    return user.data
  }

  render() {
    
    return(
      // this.state.user !=='' ? <Redirect to="/" /> : <LoginComponent 
      //                             onSubmit={this.onSubmit}/>  
      this.state.done ? <Redirect to="/" /> :
          <UpdateJobComponent submitJob={this.submitJob}
                          jobData={this.state.jobData}
                          categoriesOption={this.state.categoriesOption}/>
    )
  }
} 
const mapStateToProps = state => {
  return {
    jobs: state.jobs,
    user: state.user
  }
}

export default connect(mapStateToProps)(UpdateJob)