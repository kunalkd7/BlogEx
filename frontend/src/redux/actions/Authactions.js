import { SIGNUP_START, SIGNUP_ERROR, SIGNUP_SUCCESS } from './ACTIONTYPES';
import { LOGIN_START, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_TOKEN } from './ACTIONTYPES';
import { LOGOUT } from './ACTIONTYPES';

import axios from 'axios'


export const signup = (user) => {
    // console.log(user)

    return function (dispatch) {

        dispatch(signupstart())
        var config = {
            method: 'post',
            url: 'http://localhost:5000/userapi/signup',
            headers: {
                'Content-Type': 'application/json'
            },
            data: user
        };

        axios(config)
            .then(function (response) {
                //  console.log((response));
                dispatch(signupsucess(response.data.msg))
            })
            .catch(function (error) {
                // console.log(error.response); //writing response is important for errors
                dispatch(signuperror(error.response.data.errors))
            });
    }
}

const signupstart = () => {
    return {
        type: SIGNUP_START
    }
}

const signupsucess = (successmsg) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: successmsg
    }
}

const signuperror = (errors) => {
    return {
        type: SIGNUP_ERROR,
        payload: errors
    }
}






export const login = (user) => {
    // console.log(user)

    return function (dispatch) {

        dispatch(loginstart())
        var config = {
            method: 'post',
            url: 'http://localhost:5000/userapi/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: user
        };

        axios(config)
            .then(function (res) {
                //   console.log((res));
                dispatch(loginsucess(res.data.msg))
                localStorage.setItem('logintoken', res.data.token)
                dispatch(logintoken(res.data.token))
            })
            .catch(function (error) {
                // console.log(error.response); //writing response is important for errors
                dispatch(loginerror(error.response.data.errors))
            });
    }
}

const loginstart = () => {
    return {
        type: LOGIN_START
    }
}

const loginsucess = (successmsg) => {
    return {
        type: LOGIN_SUCCESS,
        payload: successmsg
    }
}

const loginerror = (errors) => {
    return {
        type: LOGIN_ERROR,
        payload: errors
    }
}

const logintoken = (token) => {
    return {
        type: LOGIN_TOKEN,
        payload: token
    }
}

export const logout = () => {
    localStorage.removeItem('logintoken');
    return {
        type: LOGOUT
    }
}