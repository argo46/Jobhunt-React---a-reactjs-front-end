import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import CompanyComponent from '../Components/CompanyComponent'

export default class Company extends Component {
  constructor(props){
    super(props)
    this.state={
      data:[],
      isLoading:true
    }
  }

  componentDidMount(){
    this.getAllCompanies()
    .then(data => {
      console.log(data)
      this.setState({data,
                    isLoading: false})
    })
    .catch(err=>{
      console.log(err)
    })
  }

  deleteCompany = (id) => {
    this.deleteCompanyRequest(id)
    .then(data => {
      console.log(data)
      window.location.reload();
    })
    .catch(err => {
      console.log(err)
    }) 
  }

  deleteCompanyRequest = async (id) => {
    const response = await axios({
      method:'DELETE',
      url:'http://localhost:3000/company/' + id,
      headers:{
        'content-type': 'application/x-www-form-urlencoded',
      }
    })
    return response.data
  }

  getAllCompanies = async () => {
    const user = await axios({
      method:'GET',
      url:'http://localhost:3000/company/',
    })
    return user.data
  }

  render() {
    
    return(
      <CompanyComponent state={this.state}
                        deleteCompany={this.deleteCompany}/>
    )
  }
}