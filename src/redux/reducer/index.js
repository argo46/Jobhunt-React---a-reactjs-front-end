import {combineReducers} from 'redux'

import jobs from './jobs'
import user from './user';
import companies from './company'

const appReducer = combineReducers({
  jobs,
  user,
  companies
})

export default appReducer