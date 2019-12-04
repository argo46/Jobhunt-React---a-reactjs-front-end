import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import RegisterComponent from '../Components/RegisterComponent'

import {connect} from 'react-redux'

import {login} from '../redux/action/user'

class Register extends Component {
  constructor(props){
    super(props)
    this.state={
      isDone:false,
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
    this.props.dispatch(login(dataLogin))
  }

  

  render(){
    if(this.props.user.isLogin) {
      localStorage.setItem('user_name', this.props.user.username)
      localStorage.setItem('token', this.props.user.token)
      this.setState({isDone:true})
    }
    return(
      this.props.user.isLogin? <Redirect to="/" /> : <RegisterComponent 
                                  onSubmit={this.onSubmit}/>             
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Register)