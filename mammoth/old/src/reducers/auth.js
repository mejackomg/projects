'use strict';
const LOAD = 'LOAD';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAIL = 'LOAD_FAIL';
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

const UPDATEUSER = 'UPDATEUSER';
const UPDATEUSER_SUCCESS = 'UPDATEUSER_SUCCESS';
const UPDATEUSER_FAIL = 'UPDATEUSER_FAIL';
const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'LOGOUT_FAIL';

const SIGNUP = 'SIGNUP';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'SIGNUP_FAIL';

const UPDATE = 'UPDATE';
const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
const UPDATE_FAIL = 'UPDATE_FAIL';

const initialState = {
  loaded: false
};

export function authReducer(state = initialState, action = {}) {
  // console.log(action.result,action);
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case UPDATEUSER_SUCCESS:
      return {
        user: action.result
      };

    case SIGNUP:
      return Object.assign({}, state, {
        signingUp: true
      });
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        signingUp: false,
        user: action.result
      });
    case SIGNUP_FAIL:
      return Object.assign({}, state, {
        signingUp: false,
        user: null,
        signupError: action.error
      });
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case UPDATE:
      return Object.assign({}, state, {
        updating: true
      });
    case UPDATE_SUCCESS:
      return Object.assign({}, state, {
        updating: false,
        user: action.result
      });
    case UPDATE_FAIL:
      return Object.assign({}, state, {
        updating: false,
        user: null,
        updateError: action.error
      });
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.authReducer && globalState.authReducer.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/auth/loadAuth')
  };
}

export function login(name,password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/auth/login', {
      data: {
        accountName: name,
        accountPassword:password
      }
    })
  };
}
export function Update_User(name) {
  return {
    types: [UPDATEUSER, UPDATEUSER_SUCCESS, UPDATEUSER_FAIL],
    promise: (client) => client.post('/auth/Update_User', {
      data: {
        accountName: name
      }
    })
  };
}

export function signup(name,password) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post('/auth/signup', {
      data: {
        accountName: name,
        accountPassword:password
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/auth/logout')
  };
}

export function updatePwd(userInfo) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.post('/auth/updatePwd', {
      data: userInfo
    })
  };
}
