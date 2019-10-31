import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import LoginComponent from '../Components/LoginComponent'

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      user:'',
      userData:{},
      token:'',
      isLoading:'true'
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.email.value)
    console.log(event.target.password.value)
    const dataLogin = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    this.login(dataLogin)
      .then(data => {
        this.setState({token: data.token, user: data.result.name, redirect: true})
        localStorage.setItem('user_name', data.result.name)
        localStorage.setItem('user_id', data.result.id)
        localStorage.setItem('token', data.token)
        this.props.setUserState(data.result.name)
        console.log(data)
        console.log(this.props)
      })
      .catch(err => {
        console.log(err)
      })
  }

  login = async (dataLogin) => {
    const user = await axios.post('http://localhost:3000/user/login', dataLogin ,{'Content-Type': 'application/x-www-form-urlencoded'})
    return user.data
  }

  render(){
    
    return(
      this.state.user !=='' ? <Redirect to="/" /> : <LoginComponent 
                                  onSubmit={this.onSubmit}/>                   
    )
  }
}