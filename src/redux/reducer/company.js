const initialState = {
  isLoading: true,
  isError: false,
  data: []
}

const companies = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_COMPANIES_PENDING' :
    return {
      ...state,
      isLoading:true,
    }
    case 'GET_COMPANIES_REJECTED':
      return {
        ...state,
        isLoading:false,
        isError: true
      }
    case 'GET_COMPANIES_FULFILLED':
      return {
        ...state,
        isLoading:false,
        isError:false,
        data:action.payload.data
      }
    default:
      return state
  }
} 
export default companies