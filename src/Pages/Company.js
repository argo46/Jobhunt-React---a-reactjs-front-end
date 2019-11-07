import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import CompanyComponent from '../Components/CompanyComponent'

import {connect} from 'react-redux'
import {getCompanies} from '../redux/action/company'

class Company extends Component {
  constructor(props){
    super(props)
    this.state={
      data:[],
      isLoading:true
    }
  }

  componentDidMount(){
    this.getAllCompanies()
  }

  updateData = () => {
    this.getAllCompanies()
    // .then(data => {
    //   console.log(data)
    //   this.setState({data,
    //                 isLoading: false})
    // })
    // .catch(err=>{
    //   console.log(err)
    // })
  }

  deleteCompany = (id) => {
    this.deleteCompanyRequest(id)
    .then(data => {
      console.log(data)
      this.updateData()
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
    // const user = await axios({
    //   method:'GET',
    //   url:'http://localhost:3000/company/',
    // })
    // return user.data
    this.props.dispatch(getCompanies())
    this.setState(this.state)
  }

  render() {
    
    return(
 
      !this.props.companies.isLoading ? 
      <CompanyComponent state={this.state}
                        isLoading={this.props.companies.isLoading}
                        deleteCompany={this.deleteCompany}
                        data={this.props.companies.data}/> :
                        <h1>Loading...</h1>
     
    )
  }
}


const mapStateToProps = state => {
  return {
    companies: state.companies
  }
}
export default connect(mapStateToProps)(Company)