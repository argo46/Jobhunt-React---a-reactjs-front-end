import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import LoginComponent from "../Components/LoginComponent";

import { connect } from "react-redux";

import { login } from "../redux/action/user";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false
    };
  }

  onSubmit = event => {
    event.preventDefault();
    console.log(event.target.email.value);
    console.log(event.target.password.value);
    const dataLogin = {
      email: event.target.email.value,
      password: event.target.password.value
    };
    this.props.dispatch(login(dataLogin));
  };

  render() {
    console.log(this.props);
    if (this.props.user.isLogin) {
      localStorage.setItem("user_name", this.props.user.username);
      localStorage.setItem("token", this.props.user.token);
      this.setState({ isDone: true });
    }

    return this.state.isDone ? (
      <Redirect to="/" />
    ) : (
      <LoginComponent
        onSubmit={this.onSubmit}
        isError={this.props.user.isError}
        isLoading={this.props.user.isLoading}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Login);
