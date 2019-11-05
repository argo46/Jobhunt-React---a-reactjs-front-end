const initialState = {
  isLoading: true,
  isError: false,
  jobData: {}
}

const jobs = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_JOBS_PENDING' :
    return {
      isLoading:true,
    }
    case 'GET_JOBS_REJECTED':
      return {
        isLoading:false,
        isError: true
      }
    case 'GET_JOBS_FULFILLED':
      return {
        isLoading:false,
        isError:false,
        data:action.payload.data
      }
    default:
      return state
  }
} 
export default jobs