import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles'
import {Card, CardActions, CardContent, Button, Typography, IconButton } from '@material-ui/core/'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import {connect} from 'react-redux'


const useStyles = {
  card: {
    minWidth: 275,
    margin: '1rem'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
}

// const ReactCSSTransitionGroup = require('react-addons-css-transition-group');


class Job extends Component {
  constructor(props){
    super(props)
    console.log(this.props.data)
    this.state={
      dropdownOpen: false,
      cardSelected: '',
    }
    if(this.props.data.result.length > 0) {
      this.setState({cardSelected: this.props.data.result[0].id})
    }
  }

  cardStyle = (id) => {
    console.log()
    if(id){
      if (id == this.state.cardSelected) {
        const style = {
          // transitionDuration: '1s',
          transition: 'width 1s',
          alignSelf:'center',
          width: '98%',
          minWidth: '700px',
          
        }
        return style
      } else {
        const style = {
          maxWidth: '90%',
          minWidth: '700px',
          transition: 'width 1s',
          backgroundColor: 'white'
        }
        return style
    }
    }
  }
  
  
  dropdownToggle = () =>{
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  onSelectCard = (id, i) =>{
    this.setState({cardSelected:id})
    this.props.setJobIndexSelected(i)
  }

  render() { 
    const { classes } = this.props
   
    
    return (
        <div>
          {
            this.props.data.result.map((v, i) => (
            <Card className={classes.card} key={v.id} onClick={()=> this.onSelectCard(v.id, i)} style={this.cardStyle(v.id)}>
            <CardContent>
              <div style={{display:'flex'}}>
              <img src={v.company_logo} alt='Company Logo' style={{display:'block', maxWidth: '110px', margin: '20px'}}/>
                <div style={{display: 'flex', flexDirection: 'column', flexGrow:'1'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignSelf:'stretch'}}>
                <Typography variant="h6" style={{marginTop:'auto'}}>
                  {v.name}
                </Typography>
                {this.props.isEdit ?
                <>
                  <Link to={'/update-job/'+v.id} style={{marginLeft:'auto'}}>
                  <IconButton>
                    <EditOutlinedIcon/>
                  </IconButton>
                  </Link>
                  <IconButton style={{color: 'red'}} onClick={() => this.props.deleteJob(v.id)}>
                    <DeleteOutlineOutlinedIcon/>
                  </IconButton>
                </> : <></>
                }
                
                </div>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {v.company}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {v.location} | {v.category}
                </Typography>
                </div>
              </div>
              {/* <Typography variant="body2" component="p">
                {v.description}
              </Typography> */}
            </CardContent>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
          )) }
        </div>
        // <div>
          //  {this.props.jobs.data.result.map((v) => (
            
          //   <Card className={classes.card} key={v.id} onClick={()=> this.onSelectCard(v.id)} style={this.cardStyle(v.id)}>
          //   <CardContent>
          //     <div style={{display:'flex'}}>
          //     <img src={v.company_logo} alt='Company Logo' style={{display:'block', maxWidth: '110px', margin: '20px'}}/>
          //       <div>
          //       <Typography variant="h6">
          //         {v.name}
          //       </Typography>
          //       <Typography className={classes.title} color="textSecondary" gutterBottom>
          //         {v.company}
          //       </Typography>
          //       <Typography className={classes.pos} color="textSecondary">
          //         {v.location} | {v.category}
          //       </Typography>
          //       </div>
          //     </div>
          //     <Typography variant="body2" component="p">
          //       {v.description}
          //     </Typography>
          //   </CardContent>
          //   <CardActions>
          //     <Button size="small">Learn More</Button>
          //   </CardActions>
          // </Card>
          // ))}
        // </div>
    )
  }
} 

Job.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  jobs: state.jobs
})
export default withStyles(useStyles)(Job)

// const editButtonStyle = {
//   position: 'absolute',
//   top:'10px',
//   right:'10px',
//   fontSize:'0.5rem',
// }

// const deleteButtonStyle = {
//   position: 'absolute',
//   top:'40px',
//   right:'10px',
//   fontSize:'0.3rem',
//   // display: 'none'
// }
