import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, InputBase, Divider, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '24px',
    backgroundColor: '#2196f3',
    alignSelf:'stretch'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: 'white'
  },
  iconButton: {
    padding: 10,
    color: 'white'
  },
  divider: {
    height: 28,
    margin: 4,
    color: 'white'
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Job's Name"
        // inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
  );
}