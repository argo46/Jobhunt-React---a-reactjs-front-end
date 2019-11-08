import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import LoginComponent from '../Components/LoginComponent'

import {connect} from 'react-redux'

import {login} from '../redux/action/user'

class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      isDone: false,
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
    this.props.dispatch(login(dataLogin))

    // this.login(dataLogin)
    //   .then(data => {
    //     this.setState({token: data.token, user: data.result.name, redirect: true})
    //     localStorage.setItem('user_name', data.result.name)
    //     localStorage.setItem('user_id', data.result.id)
    //     localStorage.setItem('token', data.token)
    //     this.props.setUserState(data.result.name)
    //     console.log(data)
    //     console.log(this.props)
    //   })
    //   .catch(err => {
    //     this.setState({isError: true, errorObject: err.response.data})
    //     console.log(err.response.data)
    //   })
  }

  render(){
    console.log(this.props);
    if(this.props.user.isLogin) {
      localStorage.setItem('user_name', this.props.user.username)
      localStorage.setItem('token', this.props.user.token)
      this.setState({isDone:true})
    }
    
    return(
      this.state.isDone? <Redirect to="/" /> : <LoginComponent 
                                  onSubmit={this.onSubmit}
                                  isError={this.state.isError}
                                  errorMessage={this.state.errorMessage}/>                   
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Login)