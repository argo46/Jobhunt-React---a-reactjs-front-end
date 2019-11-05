import axios from 'axios'

export const getJobs =  (query) => {
  console.log('GET --> http://localhost:3000/job/jobs/?'+query)
  return {
    type: 'GET_JOBS',
    payload: axios.get('http://localhost:3000/job/jobs/?'+query)
  }
}