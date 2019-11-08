import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    padding: theme.spacing(3, 2),
    height: '100%',
    width: 'auto',
    display:'flex',
    overflow: 'auto'
  },
  container: {
    display: 'flex',
    flexDirection: "column",
    flexGrow:1,
    padding:'10px',
    
  }
}))

function DetailJobComponent(props) {
  let job = {}
  if(!props.jobs.isLoading && !props.jobs.isError){
    job = props.jobs.data.result[props.jobIndexSelected]
  }
  const classes = useStyles()
  return (
      <>
        {job ? 
        <Paper className={classes.root}>
          <div className={classes.container}>
          <img src={job.company_logo} alt='Company Logo' style={{maxWidth: '220px', alignSelf: 'center'}}/>
          <Typography variant="h5" component="h3" style={{alignSelf: 'center', marginTop: '20px', textAlign:'center'}}>
           {job.name}
          </Typography>
          <Typography variant="caption" style={{alignSelf: 'center'}}>
            {job.company}
          </Typography>
          <Typography variant="subtitle1" style={{alignSelf: 'center', textAlign:'justify', margin: '20px 0'}}>
            {job.description}
          </Typography>
          </div>
          {/* <Typography variant="h5" component="h3">
            This gonna be a job detail of {props.jobIndexSelected}.
          </Typography>
          <Typography component="p">
            some text ang logo of job detail.
          </Typography> */}
        </Paper> : <></>}
      </>
    
  )
}

const mapStateToProps = state => ({
  jobs: state.jobs
})
export default connect(mapStateToProps)(DetailJobComponent)