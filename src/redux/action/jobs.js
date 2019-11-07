import axios from 'axios'
import qs from 'qs'

export const getJobs =  (query) => {
  console.log('GET --> http://localhost:3000/job/jobs/?'+query)
  return {
    type: 'GET_JOBS',
    payload: axios.get('http://localhost:3000/job/jobs/?'+query)
  }
}

export const addJob =  (jobData, token) => {
  return {
    type: 'ADD_JOB',
    payload: axios({
                    method:'POST',
                    url:'http://localhost:3000/job',
                    data:qs.stringify(jobData),
                    headers:{
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': 'Bearer '+ String(token)
                    }  
                  })
  }
}

export const deleteJob =  (id, token) => {
  return {
    type: 'DELETE_JOB',
    payload: axios({
            method:'DELETE',
            url:'http://localhost:3000/job/' + id,
            headers:{
              'content-type': 'application/x-www-form-urlencoded',
              'authorization': 'Bearer '+ String(token)
            }})
  }
}

export const updateJob =  (id, dataJob, token) => {
  return {
    type: 'UPDATE_JOB',
    payload: axios({
      method:'PATCH',
      url:'http://localhost:3000/job/' + id,
      data:qs.stringify(dataJob),
      headers:{
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': 'Bearer '+ String(token)
      }
    })
  }
}