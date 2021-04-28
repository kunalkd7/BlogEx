import { SIGNUP_START, SIGNUP_ERROR, SIGNUP_SUCCESS } from '../actions/ACTIONTYPES'
import { LOGIN_START, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_TOKEN } from '../actions/ACTIONTYPES'
import { LOGOUT } from '../actions/ACTIONTYPES'

import { useSelector } from 'react-redux'
import jwt_decode from "jwt-decode";


const initialstate = {
    loading: false,

    signuperrors: [],
    signupsucess: '',
    signedup: false,

    loginerrors: [],
    loginsuccess: '',
    logintoken: '',
    loginuser: '',
    loginid: ''
}


//reducer code renders in starting and refreshing of ur app // important
// console.log("initial render")
const token = localStorage.getItem('logintoken')

//once we refresh browser all the state value changed to starting stage so logintoken loginuser will gonna be empty
//cz of that user can go to login page  
//this code is for prevent user to go to login page once he logged in by setting logintoken loginuser values again
if (token) {
    const decode = jwt_decode(token);
    const expiredIn = new Date(decode.exp * 1000);
    if (new Date() > expiredIn) {
        localStorage.removeItem('logintoken')
    } else {
        initialstate.logintoken = token;
        initialstate.loginuser = decode.username;
        initialstate.loginid = decode.id;
    }
}


const authreducer = (state = initialstate, action) => {
    switch (action.type) {
        case SIGNUP_START: return {
            ...state,
            loading: true
        }

        case SIGNUP_SUCCESS: return {
            ...state,
            loading: false,
            signuperrors: [],
            signupsucess: action.payload,
            signedup: true

        }

        case SIGNUP_ERROR: return {
            ...state,
            loading: false,
            signuperrors: action.payload,
            signupsucess: ''
        }


        //login actions
        case LOGIN_START: return {
            ...state,
            loading: true
        }

        case LOGIN_SUCCESS: return {
            ...state,
            loading: false,
            loginsuccess: action.payload,
            loginerrors: []
        }

        case LOGIN_ERROR: return {
            ...state,
            loading: false,
            loginerrors: action.payload,
            loginsuccess: ''
        }

        case LOGIN_TOKEN:
            const decode = jwt_decode(action.payload);
            return {
                ...state,
                logintoken: action.payload,
                loginuser: decode.username,
                loginid: decode.id
            }

        //logout action
        case LOGOUT: return {
            ...state,
            logintoken: '',
            loginuser: '',
            loginid: '',
            loginsuccess: '',
            signupsucess: '',
            signedup: false,
            postblog_success: '',
            postblog_errors: ''
        }

        default: return state
    }
}

export default authreducer;
