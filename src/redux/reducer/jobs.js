const initialState = {
  isLoading: true,
  isError: false,
  data: {},
  errorMessage: ''
}

const jobs = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_JOBS_PENDING' :
    return {
      ...state,
      isLoading:true,
    }
    case 'GET_JOBS_REJECTED':
      return {
        ...state,
        isLoading:false,
        isError: true,
        errorMessage:action.payload.message
      }
    case 'GET_JOBS_FULFILLED':
      return {
        ...state,
        isLoading:false,
        isError:false,
        data:action.payload.data
      }
    case 'ADD_JOB_PENDING' :
      return {
      ...state,
      isLoading:true,
    }
    case 'ADD_JOB_REJECTED':
      return {
        ...state,
        isLoading:false,
        isError: true,
        errorMessage:action.payload.message
      }
    case 'ADD_JOB_FULFILLED':
      return {
        ...state,
        isLoading:false,
        isError:false,
        // data:action.payload.data
      }
      case 'DELETE_JOB_PENDING' :
      return {
        ...state,
        isLoading:true,
      }
      case 'DELETE_JOB_REJECTED':
        return {
          ...state,
          isLoading:false,
          isError: true,
          errorMessage:action.payload.message
        }
      case 'DELETE_JOB_FULFILLED':
        let dataTemp = {...state.data}
        let resultTemp = dataTemp.result.filter(job => job.id !== action.payload.data.id);
        dataTemp.result = resultTemp
        return {
          ...state,
          isLoading:false,
          isError:false,
          data:dataTemp
        }
        case 'UPDATE_JOB_PENDING' :
        return {
        ...state,
        isLoading:true,
      }
      case 'UPDATE_JOB_REJECTED':
        return {
          ...state,
          isLoading:false,
          isError: true,
          errorMessage:action.payload.message
        }
      case 'UPDATE_JOB_FULFILLED':
        return {
          ...state,
          isLoading:false,
          isError:false,
          // data:dataTempUpdate
        }
    default:
      return state
  }
} 
export default jobs