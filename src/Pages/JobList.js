import React, { Component } from 'react'
import queryString from 'querystring'
import axios from 'axios'
import {Row, Container} from 'reactstrap'

import SearchBar from '../Components/SearchBar'
import Job from '../Components/Job'
import Pagination from '../Components/Pagination'



export default class JobList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query:{qname:'', qcompany:'', orderby:'date_updated', order:'asc'},
      data:{},
      next:'',
      prev:'',
      user:'',
      isLoading:true,
      page:'http://localhost:3000/job/jobs/?'
    }
  }

  async componentDidMount(){
    console.log('USER '+ this.props.user)
    let user_name = localStorage.getItem('user_name')
    if (!user_name) {user_name = 'user'}
    this.getData()
    .then(data => {
      console.table(data)
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
  updateData = (url) => {
    this.getData(url)
    .then(data => {
      console.table(data)
      this.setState({data,
                    next:data.next_page,
                    prev:data.prev_page,
                    isLoading:false,})
    })
    .catch(err=>{
      console.log(err)
    })
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
        this.setState({ state: this.state })
      })
      .catch(err => {
        console.log(err)
      }) 
  }

  
  doSearch = () => {
    this.updateData()
  }

  onKeyDownSearch = (event) => {
    if(event.keyCode===13){
      this.doSearch()
    }

  }

  paginationButtonPressed = (url) => {
    this.updateData(url)
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


  render() {
    return (
      <Container className="d-flex justify-content-center" style={{margin:'20px'}}>
        <Row className=' list-group' style={{padding:'0', margin: '0', maxWidth: '700px'}}>
          <SearchBar doSearch={this.doSearch}
                onChangeCompany={this.onChangeCompany}
                onChangeName={this.onChangeName}
                qcompany={this.state.query.qcompany}
                qname={this.state.query.qname}
                onKeyDownSearch={this.onKeyDownSearch}/>

          {!this.state.isLoading?
          <div>
            <Job data={this.state.data}
                isEdit={this.props.isEdit}
                user={this.state.user}
                />
            <Pagination prev={this.state.prev}
                        next={this.state.next}
                        paginationButtonPressed={this.paginationButtonPressed} />
          </div>
          : <h1>Loading...</h1>}
        </Row>
      </Container>
    )
  }
}