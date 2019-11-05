import React, { Component } from 'react'
import {BrowserRouter,Route,Switch, Redirect} from 'react-router-dom'

import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Register from './Pages/Register'
import AddJob from './Pages/AddJob'
import UpdateJob from './Pages/UpdateJob'
import Company from './Pages/Company'
import AddCompany from './Pages/AddCompany'
import UpdateCompany from './Pages/UpdateCompany'

import JobList from './Pages/JobList'
import DrawerComponent from './Components/DrawerComponent'

import store from './redux/store.js'
import {Provider} from 'react-redux'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:{},
      next:'',
      prev:'',
      logo:'',
      user: '',
      token: '',
      homeRedirect:false,
      isEdit: false,
      query:{qname:'', qcompany:'', orderby:'date_updated', order:'asc'},
      isLoading: true,
      page:'http://localhost:3000/job/jobs/?'
    }
  }

  componentWillMount(){
    this.setState({homeRedirect:false})
  }

  componentDidMount(){
    let user_name = localStorage.getItem('user_name')
    if (!user_name) {user_name = 'user'}
    this.setState({user:user_name})
  }

  logout = async () => {
    await localStorage.clear()
    this.setState({user:''})
  }

  setUserState = (user) =>{
    this.setState({user: user})
  }

  toogleIsEdit = () => {
    const isEditvalue = !(this.state.isEdit)
    if(window.location.href !== 'http://localhost:8000/'){
      this.setState({homeRedirect: true})
    } else {
      this.setState ({isEdit: isEditvalue})
    }
    console.log(window.location.href)
  }


  render() {
    return (
      <div>
        <BrowserRouter>
        <Provider store={store}>
        {/* {!this.state.homeRedirect ? <></> : <Redirect to="/" />} */}
          <div style={{display: 'flex', alignItems: 'stretch', backgroundColor:'transparent'}}>
            {/* <DrawerComponent/> */}
            <div style={{flexGrow: '1', backgroundColor:'transparent'}}>
              <div>
            <Navbar user={this.state.user}
                      logout={this.logout}
                      toogleIsEdit={this.toogleIsEdit}
                      isEdit={this.state.isEdit}/>
              </div>
              <div>
              <Switch>
                <Route path='/' exact 
                        component={() => <JobList isEdit={this.state.isEdit}/>}/>
                  <Route path='/login' component={() => <Login setUserState={this.setUserState}/>}/>
                  <Route path='/register' component={() => <Register setUserState={this.setUserState}/>}/>
                  <Route path='/add-job' component={AddJob}/>
                  <Route path='/update-job/:id' component={UpdateJob}/>
                  <Route path='/company' component={Company} exact/>
                  <Route path='/company/new' component={AddCompany} />
                  <Route path='/company/:id' component={UpdateCompany} />
              </Switch>
              </div>
            </div>
          </div>
          </Provider>
        </BrowserRouter>
        
      </div>
      
    )
  }
}