import React, { Component } from 'react'
import axios from 'axios'
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

const queryString = require('querystring')

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


  getData = async (url) => {
    if(url === undefined ){ 
      const jobs = await axios.get(this.state.page + queryString.stringify(this.state.query))
      console.log(`get ${this.state.page + queryString.stringify(this.state.query)}`)
      return jobs.data
    } else {
      console.log(`get ${url}`)
      const jobs = await axios.get(url)
      return jobs.data
    }
    
  }

  logout = async () => {
    await localStorage.clear()
    this.setState({user:''})
    window.location.reload()
  }

  sortBy = (queryOrder) => {
    console.log(`SORT ${queryOrder} = ${this.state.page}`)
    this.state.query.orderby = queryOrder
    if(queryOrder === 'date_updated'){
      this.state.query.order = 'desc'
    } else {
      this.state.query.order = 'asc'
    }
    this.getData()
      .then(data => {
        console.log(this.state.page)
        this.setState({data,
                      next:data.next_page,
                      prev:data.prev_page,
                      isLoading: false })
      })
      .catch(err => {
        console.log(err)
      })
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
        {!this.state.homeRedirect ? <span></span> : <Redirect to="/" />}
          <Navbar user={this.state.user}
                  logout={this.logout}
                  toogleIsEdit={this.toogleIsEdit}
                  isEdit={this.state.isEdit}/>
          <Switch>
            <Route path='/' exact 
                    component={() => <JobList isEdit={this.state.isEdit}
                                              user={this.state.user}/>}/>
              <Route path='/login' component={() => <Login setUserState={this.setUserState}/>}/>
              <Route path='/register' component={() => <Register setUserState={this.setUserState}/>}/>
              <Route path='/add-job' component={AddJob}/>
              <Route path='/update-job/:id' component={UpdateJob}/>
              <Route path='/company' component={Company} exact/>
              <Route path='/company/new' component={AddCompany} />
              <Route path='/company/:id' component={UpdateCompany} />
            
          </Switch>
          
        </BrowserRouter>
        
      </div>
      
    )
  }
}