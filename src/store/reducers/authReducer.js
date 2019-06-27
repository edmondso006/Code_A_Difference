const initState = {
  authError: null,  //Need to make this more specific to either login or signup
  //authErrorLogin: null,
  //autherErrorSignUp: null
  updateError: null
}

const authReducer = (state = initState, action) => {

  switch(action.type){
    case 'LOGIN_ERROR':
      console.log('Login Failed / Error');
      return {
        ...state,
        authError: 'Login Failed'
      }
    case 'LOGIN_SUCCESS':
      console.log('Login Success');
      return {
        ...state, 
        authError: null
      }
    case 'SIGNOUT_SUCCESS':
      console.log('Signout success');
      return {
        ...state
      }
    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      return {
        ...state,
        authError: null
      }
    case 'SIGNUP_ERROR':
      console.log('signup error');
      console.log(action.err.message);
      return {
        ...state,
        authError: action.err.message //Change the auth error type here
      }
    case 'UPDATE_SUCCESS':
      console.log('update success');
      return {
        ...state
      }
    case 'UPDATE_ERROR':
      return {
        ...state,
        updateError: action.err.message
      }
    default:
      return state
  }

}

export default authReducer;