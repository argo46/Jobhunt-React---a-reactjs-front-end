import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import RegisterComponent from '../Components/RegisterComponent'

export default class Register extends Component {
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
    console.log(event.target.username.value)
    console.log(event.target.name.value)
    console.log(event.target.password.value)
    const dataRegister = {
      email: event.target.email.value,
      user_name: event.target.username.value,
      name:event.target.name.value,
      password: event.target.password.value
    }

    this.register(dataRegister)
      .then(data => {
        console.log(data)
        const dataLogin = {
          email: dataRegister.email,
          password: dataRegister.password
        }

        this.doLogin(dataLogin)

      })
      .catch(err => {
        console.log(err)
      })
  }

  register = async (dataRegister) => {
    const user = await axios.post('http://localhost:3000/user/signup', dataRegister ,{'Content-Type': 'application/x-www-form-urlencoded'})
    return user.data
  }

  doLogin = (dataLogin) => {
    this.login(dataLogin)
      .then(data => {

        this.setState({token: data.token, user: data.result.name, redirect: true})
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
      this.state.user !=='' ? <Redirect to="/" /> : <RegisterComponent 
                                  onSubmit={this.onSubmit}/>             
    )
  }
}