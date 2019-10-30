import React, { Component } from 'react'
import axios from 'axios'
import {BrowserRouter,Route,Switch, Redirect} from 'react-router-dom'

import Navbar from './Components/Navbar'
import JobContents from './Components/JobContents'
import Login from './Components/Login'

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
      query:{qname:'', qcompany:'', orderby:''},
      isLoading: true,
      page:'http://localhost:3000/job/jobs/?'
    }
  }

  async componentDidMount(){
    this.getData()
    .then(data => {
      console.log(data)
      this.setState({data,
                    next:data.next_page,
                    prev:data.prev_page,
                    isLoading:false})
    })
    .catch(err=>{
      console.log(err)
    })
  }

  getData = async (url) => {
    if(url === undefined ){ 
      const jobs = await axios.get(this.state.page + queryString.stringify(this.state.query))
      console.log(`get ${this.state.page}`)
      return jobs.data
    } else {
      console.log(`get ${url}`)
      const jobs = await axios.get(url)
      return jobs.data
    }
    
  }
  buttonPress = async (url) => {
    this.setState({isLoading:true})
    console.log(`url btn ${url}`)
    this.getData(url)
    .then(data => {
      this.setState({data,
                    next:data.next_page,
                    prev:data.prev_page,
                    isLoading: false })
    })
    .catch(err => {
      console.log(err)
    })
  }
  goToDetail = (id) => {
    // this.props.history.push('/character'+id)
    // TODO : go to detail jobs
  }

  doSearch = async () => {
    this.getData()
      .then(data => {
        this.setState({data,
                      next:data.next_page,
                      prev:data.prev_page,
                      isLoading: false })
      })
      .catch(err => {
        console.log(err)
      })
      console.log(`http://localhost:3000/job/jobs/?qname=${this.state.qname}&qcompany=${this.state.qcompany}`)
  }
  onChangeName = (event) => {
    this.state.query.qname = event.target.value
  }

  onChangeCompany = (event) => {
    this.state.query.qcompany = event.target.value
  }

  sortBy = (queryOrder) => {
    console.log(`SORT ${queryOrder} = ${this.state.page}`)
    this.state.query.orderby = queryOrder
    // this.state.page = this.state.page + `orderby=${query}&order=asc`
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

  render() {
    console.log('RENDER')
    return (
      <div>
        <BrowserRouter>
          <Navbar user={this.state.user}/>
          <Switch>
            <Route path='/' exact 
              component={() => <JobContents state={this.state} 
                                  buttonPress={this.buttonPress} 
                                  doSearch={this.doSearch}
                                  onChangeName={this.onChangeName}
                                  onChangeCompany={this.onChangeCompany}
                                  sortBy={this.sortBy}/>} />
              <Route path='/login'> {this.state.user !=='' ? <Redirect to="/" /> : <Login 
                                  onSubmit={this.onSubmit}/>}</Route>
            
          </Switch>
          
        </BrowserRouter>
        
      </div>
      
    )
  }
}