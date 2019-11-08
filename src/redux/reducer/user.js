const initialState = {
  isLoading: false,
  isError: false,
  username: '',
  isLogin: false,
  token: ''
}

const user = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_PENDING' :
    return {
      ...state,
      isLoading:true,
    }
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isLoading:false,
        isError: true
      }
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isLoading:false,
        isError:false,
        username:action.payload.data.result.name,
        token: action.payload.data.token,
        isLogin:true
      }
      case 'LOGOUT' :
      return {
        ...state,
          isLoading:false,
          isError:false,
          username:'',
          token:'',
          isLogin:false
      }
    case 'KEEP_LOGIN' :
      return {
        isLoading: false,
        isError: false,
        username: action.userName,
        isLogin: true,
        token: action.token
      }
    default:
      return state
  }
} 
export default user