import {combineReducers} from 'redux'

import jobs from './jobs'
import user from "./user";

const appReducer = combineReducers({
  jobs,
  user
})

export default appReducer