import React, { Component } from 'react'
import queryString from 'querystring'
import axios from 'axios'
import {Row, Container} from 'reactstrap'

import SearchBar from '../Components/SearchBar'
import Job from '../Components/Job'
import Pagination from '../Components/Pagination'


import {connect} from 'react-redux'

import {getJobs} from '../redux/action/jobs'



class JobList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query:{qname:'', qcompany:'', orderby:'date_updated', order:'asc'},
      user:''
    }
  }

  async componentDidMount(){
    console.log('USER '+ this.props.user)
    let user_name = await localStorage.getItem('user_name')
    if (!user_name) {user_name = 'user'}
    this.getData()
  }

  getData = (query) => {
    // if(url === undefined ){ 
    //   const jobs = await axios.get(this.state.page + queryString.stringify(this.state.query))
    //   console.log(`get ${this.state.page + queryString.stringify(this.state.query)}`)
    //   return jobs.data
    // } else {
    //   console.log(`get ${url}`)
    //   const jobs = await axios.get(url)
    //   return jobs.data
    // }
    if(query === undefined ){
      this.props.dispatch(getJobs(queryString.stringify(this.state.query)))
    } else {
      this.props.dispatch(getJobs(query.toString()))
      console.log(query)
    }
    console.log(this.props)
  }


  deleteJob = async (id) => {
    const token = await localStorage.getItem('token')
    await axios({
      method:'DELETE',
      url:'http://localhost:3000/job/' + id,
      headers:{
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': 'Bearer '+ String(token)
      }})
      .then(data => {
        console.log(data)
        this.updateData()
      })
      .catch(err => {
        console.log(err)
      }) 
  }

  
  doSearch = () => {
    this.getData()
  }

  onKeyDownSearch = (event) => {
    if(event.keyCode===13){
      this.doSearch()
    }

  }

  paginationButtonPressed = (url) => {
    this.getData(url.slice(32,url.length))
    
  }
  
  onChangeCompany = (event) => {
    let queryTemp = Object.assign({}, this.state.query)
    queryTemp.qcompany = event.target.value
    this.setState({query: queryTemp})
  }
  onChangeName = (event) => {
    let queryTemp = Object.assign({}, this.state.query)
    queryTemp.qname = event.target.value
    this.setState({query: queryTemp})
  }

  doSort= async (event) => {
    let queryTemp = Object.assign({}, this.state.query)
    queryTemp.orderby = event.target.value
    if(event.target.value === 'date_updated') {
      queryTemp.order = 'desc'
    } else {
      queryTemp.order = 'asc'
    }
    await this.setState({query: queryTemp})
    this.getData()
  }

  render() {
    return (
      <Container className="d-flex justify-content-center" style={{margin:'20px'}}>
        <Row className=' list-group' style={{padding:'0', margin: '0', maxWidth: '700px'}}>
          <SearchBar doSearch={this.doSearch}
                onChangeCompany={this.onChangeCompany}
                onChangeName={this.onChangeName}
                qcompany={this.state.query.qcompany}
                qname={this.state.query.qname}
                onKeyDownSearch={this.onKeyDownSearch} />

          {(!this.props.jobs.isLoading) ?
          <div>
            {console.log('sdfsd'+this.props.jobs.isLoading)}
              <Job data={this.props.jobs.data}
              isEdit={this.props.isEdit}
              user={this.state.user}
              doSort={this.doSort}
              deleteJob={this.deleteJob}
              />
            <Pagination prev={this.props.jobs.data.prev_page}
                        next={this.props.jobs.data.next_page}
                        paginationButtonPressed={this.paginationButtonPressed} />
          </div>
          : <h1>Loading...</h1>}
        </Row>
      </Container>
    )
  }
} 

const mapStateToProps = state => {
  return {
    jobs: state.jobs
  }
}

export default connect(mapStateToProps)(JobList)