import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import AddCompanyComponent from '../Components/AddCompanyComponent'

export default class AddCompany extends Component {
  constructor(props){
    super(props)
    this.state={
      done: false,
      user:'',
      userData:{},
      token:'',
      isError:false,
      errorMessage: '',
      isLoading:'true'
    }
  }

  submitCompany = (event) => {
    event.preventDefault()
    const fd = new FormData()
    fd.append('name', event.target.companyName.value)
    fd.append('location', event.target.companyLocation.value)
    fd.append('description', event.target.companyDescription.value)
    fd.append('logo',event.target.companyLogo.files[0])

  //   const dataRegister = {
  //     name: event.target.companyName.value,
  //     location: event.target.companyLocation.value,
  //     description: event.target.companyDescription.value,
  //     logo:event.target.companyLogo.files[0],
  //  }
    console.log(fd)

    this.addCompany(fd)
      .then(data => {
        this.setState({done: true})
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  addCompany = async (dataRegister) => {
    // const user = await axios.post('http://localhost:3000/job', dataRegister, {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':token}})
    const user = await axios({
      method:'POST',
      url:'http://localhost:3000/company/',
      data:dataRegister,
      headers:{
        'content-type': 'application/x-www-form-urlencoded',
      }
    })
    return user.data
  }

  render(){
    return(     
      this.state.done ?     
      <Redirect to="/company" /> : <AddCompanyComponent 
       submitCompany={this.submitCompany}/>
    )
  }
}