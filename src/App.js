import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddJob from "./Pages/AddJob";
import UpdateJob from "./Pages/UpdateJob";
import Company from "./Pages/Company";
import AddCompany from "./Pages/AddCompany";
import UpdateCompany from "./Pages/UpdateCompany";

import JobList from "./Pages/JobList";
import DrawerComponent from "./Components/DrawerComponent";

import store from "./redux/store.js";
import { Provider } from "react-redux";

import { keepLogin, logout } from "./redux/action/user";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: "",
      homeRedirect: false,
      isEdit: false,
      isLoading: true
    };
  }

  componentWillMount() {
    this.setState({ homeRedirect: false });
  }

  async componentDidMount() {
    let user_name = await localStorage.getItem("user_name");
    let token = await localStorage.getItem("token");
    if (user_name) {
      store.dispatch(keepLogin(user_name, token));
    }
  }

  logout = () => {
    localStorage.clear();
    store.dispatch(logout());
  };

  setUserState = user => {
    this.setState({ user: user });
  };

  toogleIsEdit = () => {
    const isEditvalue = !this.state.isEdit;
    if (window.location.href !== "http://localhost:8000/") {
      this.setState({ homeRedirect: true });
    } else {
      this.setState({ isEdit: isEditvalue });
    }
    console.log(window.location.href);
  };

  render() {
    return (
      <div
        style={{
          height: "100%",
          minHeight: "400px",
          // display: "flex",
          flex: 1
        }}
      >
        <BrowserRouter>
          <Provider store={store}>
            {!this.state.homeRedirect ? <></> : <Redirect to="/" />}
            <div
              style={{
                display: "flex",
                flex: 1
                // alignItems: "stretch",
                // height: "100%"
                // justifyContent: "center"
              }}
            >
              <DrawerComponent
                logout={this.logout}
                toogleIsEdit={this.toogleIsEdit}
                isEdit={this.state.isEdit}
              />
              <div
                style={{
                  flexGrow: "1",
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <div>
                  {/* <Navbar user={this.state.user}
                      logout={this.logout}
                      toogleIsEdit={this.toogleIsEdit}
                      isEdit={this.state.isEdit}/> */}
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Switch>
                    <Route
                      path="/"
                      exact
                      component={() => <JobList isEdit={this.state.isEdit} />}
                    />
                    <Route
                      path="/login"
                      component={() => (
                        <Login setUserState={this.setUserState} />
                      )}
                    />
                    <Route
                      path="/register"
                      component={() => (
                        <Register setUserState={this.setUserState} />
                      )}
                    />
                    <Route path="/add-job" component={AddJob} />
                    <Route path="/update-job/:id" component={UpdateJob} />
                    <Route path="/company" component={Company} exact />
                    <Route path="/company/new" component={AddCompany} />
                    <Route path="/company/:id" component={UpdateCompany} />
                  </Switch>
                </div>
              </div>
            </div>
          </Provider>
        </BrowserRouter>
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     user: state.user
//   }
// }

// export default connect(mapStateToProps)(App)
