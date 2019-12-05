import React, { Component } from "react";
import queryString from "querystring";
import axios from "axios";
import { Row } from "reactstrap";

import SearchBar from "../Components/SearchBar";
import SearchBarMaterial from "../Components/SearchBarMaterial";
import FilterComponent from "../Components/FilterComponent";
import Job from "../Components/Job";
import Pagination from "../Components/Pagination";
import DetailJobComponent from "../Components/DetailJobComponent";
import { Container, Grid } from "@material-ui/core/";
import ConfirmationDialog from "../Components/ConfirmationDialog";

import { connect } from "react-redux";
import { getJobs, deleteJob } from "../redux/action/jobs";

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: { qname: "", qcompany: "", orderby: "date_updated", order: "asc" },
      user: "",
      companyData: [],
      jobIndexSelected: 0,
      isEdit: false,
      isDialogOpen: false,
      idToDelete: ""
    };
  }

  async componentDidMount() {
    console.log("USER " + this.props.user);
    let user_name = await localStorage.getItem("user_name");
    if (!user_name) {
      user_name = "user";
    }
    this.getCompanies()
      .then(data => {
        this.setState({ companyData: data });
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
    this.getData();
  }

  getData = query => {
    if (query === undefined) {
      this.props.dispatch(getJobs(queryString.stringify(this.state.query)));
      console.log(query);
    } else {
      this.props.dispatch(getJobs(query.toString()));
      console.log(query);
    }
    console.log(this.props);
  };

  getCompanies = async id => {
    const user = await axios({
      method: "GET",
      url: "http://localhost:3000/company"
    });
    return user.data;
  };

  deleteJob = async id => {
    const token = this.props.user.token;
    this.props.dispatch(deleteJob(id, token));
  };

  showConfirmationDialog = id => {
    this.setState({ isDialogOpen: true, idToDelete: id });
  };

  onDialogOnClick = () => {
    this.deleteJob(this.state.idToDelete);
    this.setState({ isDialogOpen: false });
  };

  closeConfirmationDialog = () => {
    this.setState({ isDialogOpen: false });
  };

  doSearch = () => {
    this.getData();
  };

  onKeyDownSearch = event => {
    if (event.keyCode === 13) {
      this.doSearch();
    }
  };

  paginationButtonPressed = url => {
    //slice the base url because they already defined in action redux
    this.getData(url.slice(32, url.length));
  };

  onChangeCompany = event => {
    let queryTemp = Object.assign({}, this.state.query);
    queryTemp.qcompany = event.target.value;
    this.setState({ query: queryTemp });
  };
  onChangeName = event => {
    let queryTemp = Object.assign({}, this.state.query);
    queryTemp.qname = event.target.value;
    this.setState({ query: queryTemp });
  };

  doSort = async event => {
    let queryTemp = Object.assign({}, this.state.query);
    queryTemp.orderby = event.target.value;
    if (event.target.value === "date_updated") {
      queryTemp.order = "desc";
    } else {
      queryTemp.order = "asc";
    }
    await this.setState({ query: queryTemp });
    this.getData();
  };

  setQueryState = query => {
    this.setState({ query: query });
    this.getData(queryString.stringify(query));
  };

  setJobIndexSelected = index => {
    console.log(index);
    this.setState({ jobIndexSelected: index });
  };

  setIsEditState = () => {
    this.setState({ isEdit: !this.state.isEit });
    console.log(this.state.isEdit);
  };
  render() {
    return (
      <Grid container spacing={3} style={{ marginLeft: "18px" }}>
        <Grid item xs={8}>
          <FilterComponent
            companyData={this.state.companyData}
            query={this.state.query}
            setQueryState={this.setQueryState}
          />
          <ConfirmationDialog
            open={this.state.isDialogOpen}
            closeDialog={this.closeConfirmationDialog}
            label={"Confirmation"}
            description={"Are you sure want to delete this Job?"}
            yesOnClick={this.onDialogOnClick}
          />
          {/* </div> */}
          {!this.props.jobs.isLoading && !this.props.jobs.isError ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Job
                data={this.props.jobs.data}
                isEdit={this.props.isEdit}
                user={this.state.user}
                doSort={this.doSort}
                deleteJob={this.showConfirmationDialog}
                setJobIndexSelected={this.setJobIndexSelected}
              />
              <Pagination
                prev={this.props.jobs.data.prev_page}
                next={this.props.jobs.data.next_page}
                paginationButtonPressed={this.paginationButtonPressed}
              />
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </Grid>
        <Grid item xs={4}>
          {/* </div> */}
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              minWidth: "400px",
              width: "100%"
            }}
          >
            <DetailJobComponent
              jobIndexSelected={this.state.jobIndexSelected}
            />
          </div>
        </Grid>
      </Grid>
      //  {/* </div> */}
    );
  }
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs,
    user: state.user
  };
};

export default connect(mapStateToProps)(JobList);
