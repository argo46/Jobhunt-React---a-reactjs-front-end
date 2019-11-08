import React from 'react'

import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Chip, InputBase, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import {InputLabel, FormControl, Select } from '@material-ui/core/'
import SearchIcon from '@material-ui/icons/Search';

export default function FilterComponent(props) {
  const classes = useStyles();

  const [chipData, setChipData] = React.useState([])
  const [sortBy, setSortBy] = React.useState({label: 'date updated', value:'date_updated'})
  const [dropdownState, setDropdownState] = React.useState({company:'',  sort:''})

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
    if(chipToDelete.key === 'qcompany'){
      setDropdownState({...dropdownState, company:''})
      updateState({qcompany:''})
    } else if(chipToDelete.key === 'qname') {
      updateState({qname:''})
    }
  }

  const onCompanyFilterChange = (event) =>{
    setDropdownState({...dropdownState, company:event.target.value})
    let companyArr = props.companyData.filter(companyData => companyData.id === event.target.value)
    let newDataArr = []
    let chipDataTemp = chipData.filter(chipData => chipData.key !== 'qcompany')
    newDataArr= [{key:'qcompany', label:'Company: '+companyArr[0].name}]
    setChipData(chips => [...chipDataTemp,...newDataArr])
    updateState({qcompany:companyArr[0].name})
  }

  const onSortChange = (event) => {
    setDropdownState({...dropdownState, sort:event.target.value})
    let a = {}
    if (event.target.value === 'date_updated'){
      a = {label: 'Newest', value:'date_updated'}
      updateState({orderby:'date_updated', order:'desc'})
    } else {
      a = {label: 'Job\'s name', value:'name'}
      updateState({orderby:'name', order:'asc'})
    }
    setSortBy(sortBy => a)
  }

  const searchKeyDown =(event) => {
    if(event.keyCode===13){
      let newDataArr = []
      let chipDataTemp = chipData.filter(chipData => chipData.key !== 'qname')
      newDataArr= [{key:'qname', label:'Job: '+event.target.value}]
      setChipData(chips => [...chipDataTemp,...newDataArr])
      updateState({qname:event.target.value})
    }
  }

  const updateState = (query) =>{
    let newQuery = {...props.query, ...query}
    props.setQueryState(newQuery)
  }
  return (
    <div>
    <ExpansionPanel className= {classes.root}>
      <ExpansionPanelSummary
          aria-controls="panel1c-content"
          id="panel1c-header"
          classsName= {classes.expansionPanel}>
           <IconButton className={classes.iconButton} aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase onKeyDown={searchKeyDown}
              className={classes.input}
              placeholder="Search Job's Name"
              // inputProps={{ 'aria-label': 'search google maps' }}
           />
            
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Company</InputLabel>
        <Select
          native
          value={dropdownState.company}
          onChange={onCompanyFilterChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option value=''></option>
          {props.companyData.map((e, key) => {
                  return <option key={e.id} value={e.id}
                  >{e.name}</option>})}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Sort by</InputLabel>
        <Select
          native
          value={dropdownState.sort}
          onChange={onSortChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option value=''></option>
          <option value='date_updated'>Newest</option>
          <option value='name'>Job's Name</option>
        </Select>
      </FormControl>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    <div style={{display:'flex', flexDirection:'row'}}>
    {chipData.length > 0? chipData.map(data => {
              console.log('true')
              
              let icon
              return (
                <Chip
                  key={data.key}
                  icon={icon}
                  label={data.label}
                  className={classes.chip}
                  onDelete={handleDelete(data)}
                />
              )
            }) : () => {console.log('false'); return <></>}}
    <Typography variant="subtitle1" gutterBottom className={classes.typography}>
        Sort by {sortBy.label}, order A - Z
    </Typography>
    </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: '16px',
    width: '100%',
  },
  details: {
    alignItems: 'center',
  },
  chip: {
    margin: theme.spacing(1),
    backgroundColor: '#2196f3',
    color: 'white'
  },
  divider: {
    height: 28,
    marginLeft: 'auto',
    marginRight: '20px'
  },
  expansionPanel: {
    display: 'flex',
    flexDirection: 'row',
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
  },
  typography: {
    marginLeft:'auto'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))