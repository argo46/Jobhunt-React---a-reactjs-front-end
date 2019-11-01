import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import UpdateCompanyComponent from '../Components/UpdateCompanyComponent'

export default class AddJob extends Component {
  constructor(props){
    super(props)
    this.state={
      done:false,
      user:'',
      companyData:{},
      token:'',
      isLoading:'true',
      categoriesOption:[]
    }
  }

  submitCompany =async (event) => {
    event.preventDefault()
    let fd = new FormData()
     fd.append('name', event.target.companyName.value)
     fd.append('location', event.target.companyLocation.value)
     fd.append('description', event.target.companyDescription.value)
    if(event.target.companyLogo.files[0]){
       fd.append('logo',event.target.companyLogo.files[0])
      console.log(true)
    }

    this.updateCompany(fd)
      .then(data => {
          console.log(data)
          this.setState({done:true})
      })
      .catch(err => {
        console.log(err)
    })    
  }

  updateCompany = async (dataRegister) => {
    console.log('http://localhost:3000/company/' + this.props.match.params.id)
    const user = await axios({
      method:'PATCH',
      url:'http://localhost:3000/company/' + this.props.match.params.id,
      data:dataRegister,
      headers:{
        'content-type': 'application/x-www-form-urlencoded',
      }
    })
    return user.data
  }

  async componentWillMount () {
    this.getSingleCompanyData(this.props.match.params.id)
    .then(data => {
      console.log(data)
      this.setState({companyData: data[0]})
      console.log(data[0])
    })
    .catch(err => {
      console.log(err)
    }) 
  }

  getSingleCompanyData = async (id) => {
    const user = await axios({
      method:'GET',
      url:'http://localhost:3000/company/' + id,
    })
    return user.data
  }

  render() {
    
    return(
      // this.state.user !=='' ? <Redirect to="/" /> : <LoginComponent 
      //                             onSubmit={this.onSubmit}/>  
      this.state.done ? <Redirect to="/company" /> :
          <UpdateCompanyComponent submitCompany={this.submitCompany}
                    companyData={this.state.companyData}
                          />
      //TODO redirect to detail job after 
    )
  }
}