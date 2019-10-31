import React, { Component } from 'react'
import axios from 'axios'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Navbar from './Components/Navbar'
import JobContents from './Components/JobContents'
import Login from './Pages/Login'
import Register from './Pages/Register'
import AddJob from './Pages/AddJob'

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
    console.log('USER '+ this.props.user)
    let user_name = localStorage.getItem('user_name')
    if (!user_name) {user_name = 'user'}
    this.getData()
    .then(data => {
      console.log(data)
      this.setState({data,
                    next:data.next_page,
                    prev:data.prev_page,
                    isLoading:false,
                    user: user_name})
    })
    .catch(err=>{
      console.log(err)
    })
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

  logout = async () => {
    await localStorage.clear();
    window.location.reload();
  }

  doSearch = async () => {
    this.getData()
      .then(data => {
        this.setState({data,
                      next:data.next_page,
                      prev:data.prev_page,
                      qname:'',
                      query: {qname:'', qcompany:'', orderby:''},
                      isLoading: false })
      })
      .catch(err => {
        console.log(err)
      })
  }
  onChangeName = (event) => {
    this.state.query.qname = event.target.value
    // let newQuery = Object.assign({}, this.state.query)
    // newQuery.qname = event.target.value
    // this.setState({query:newQuery})
  }

  onChangeCompany = (event) => {
    this.state.query.qcompany = event.target.value
    // let newQuery = Object.assign({}, this.state.query)
    // newQuery.qcompany = event.target.value
    // this.setState({query:newQuery})
  }

  sortBy = (queryOrder) => {
    console.log(`SORT ${queryOrder} = ${this.state.page}`)
    this.state.query.orderby = queryOrder
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

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar user={this.state.user}
                  logout={this.logout}/>
          <Switch>
            <Route path='/' exact 
              component={() => <JobContents state={this.state} 
                                  buttonPress={this.buttonPress} 
                                  doSearch={this.doSearch}
                                  onChangeName={this.onChangeName}
                                  onChangeCompany={this.onChangeCompany}
                                  sortBy={this.sortBy}/>} />
              <Route path='/login' component={() => <Login setUserState={this.setUserState}/>}/>
              <Route path='/register' component={() => <Register setUserState={this.setUserState}/>}/>
              <Route path='/add-job' component={AddJob}/>
            
          </Switch>
          
        </BrowserRouter>
        
      </div>
      
    )
  }
}