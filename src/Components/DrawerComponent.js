import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import {Drawer, CssBaseline, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Button, Typography} from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import {logout} from '../redux/action/user'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'flex-start'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  avatar: {
    margin: 10,
    backgroundColor: '#2196f3'
    
  },
  button: {
    margin: theme.spacing(1),
    alignSelf: 'stretch',
    marginTop: 'auto',
    marginBottom: '20px'
  },
  buttonMain: {
    margin: theme.spacing(1),
  },
  accountLoginGroup: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonAndUser: {
    marginTop: 'auto',
    marginBottom: 'auto'
  }
}));

const DrawerComponent = (props) => {
const classes = useStyles()

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
        <div className={classes.toolbar} ></div>
        <div className={classes.accountLoginGroup}>
          {props.user.isLogin? 
          <Avatar className={classes.avatar}><AccountCircleRoundedIcon/></Avatar> : <></>
          }
          {props.user.isLogin? <Typography className={classes.buttonAndUser} variant="h6" component="h5">{props.user.username}</Typography>:
            <>
            <Link to='/login' className={classes.buttonAndUser}>
            <Button size="small" variant="contained" color="primary" className={classes.buttonMain}>
              Log In
            </Button>
            </Link>
            <Link to='/register' className={classes.buttonAndUser}>
            <Button size="small" variant="contained" color="primary" className={classes.buttonMain}>
              Register
            </Button>
            </Link>
            </>
          }
        </div>
        <Divider />
        <Divider />
        <List>
          <Link to='/' style={{textDecoration: 'none', color:'black'}}>
          <ListItem button>
            <ListItemIcon> <HomeOutlinedIcon /> </ListItemIcon>
            <ListItemText primary='Home'/>
          </ListItem>
          </Link>
        </List>
        <Divider />

        {props.user.isLogin? 
        <List>
          <Link to='/add-job' style={{textDecoration: 'none', color:'black'}}>
          <ListItem button>
            <ListItemIcon> <AddCircleOutlineOutlinedIcon /> </ListItemIcon>
            <ListItemText primary='Add Job' />
          </ListItem>
          </Link>
          <ListItem button onClick={props.toogleIsEdit}>
            <ListItemIcon> <EditOutlinedIcon /> </ListItemIcon>
            <ListItemText primary='Edit Job' />
          </ListItem>
        </List>
        :<></>}
        <Divider />

        {props.user.isLogin? 
        <List>
        <Link to='/company' style={{textDecoration: 'none', color:'black'}}>
        <ListItem button>
            <ListItemIcon> <AddCircleOutlineOutlinedIcon /> </ListItemIcon>
            <ListItemText primary='Companies' />
        </ListItem>
        </Link>
          {/* <ListItem button>
            <ListItemIcon> <EditOutlinedIcon /> </ListItemIcon>
            <ListItemText primary='Edit Company' />
          </ListItem> */}
        </List>
        :<></>}

        {props.user.isLogin? 
        <Button color="secondary" className={classes.button} onClick={()=> props.dispatch(logout())}>
          <strong>Log out</strong>
        </Button> 
        : <></>}
      </Drawer>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DrawerComponent)