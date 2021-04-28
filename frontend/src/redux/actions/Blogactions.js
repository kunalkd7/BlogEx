import { POSTBLOG_ERROR, POSTBLOG_SUCCESS, REDIRECT_FALSE, CLEAR_MSGERR } from './ACTIONTYPES'
import { GETBLOGS_SUCCESS, GETUSERBLOGS_SUCCESS, CLEARBLOGSTATE } from './ACTIONTYPES'
import { SLUGBLOG, DELETEBLOG_SUCCESS,CLEARDELETESTATE} from './ACTIONTYPES'
import axios from 'axios'

export const createblog = (formdata) => {
  const token = localStorage.getItem('logintoken')

  return function (dispatch) {

    var config = {
      method: 'post',
      url: 'http://localhost:5000/blogapi/createblog',
      headers: {

        'token': `Bearer ${token}`,
      },
      data: formdata
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(postblogsuccess(response.data.msg))
      })
      .catch(function (error) {
        console.log(error.response);
        dispatch(postblogerror(error.response.data.errors))
      });
  }
}

const postblogsuccess = (successmsg) => {
  return {
    type: POSTBLOG_SUCCESS,
    payload: successmsg
  }
}
const postblogerror = (errors) => {
  return {
    type: POSTBLOG_ERROR,
    payload: errors
  }
}



export const redirectfalse = () => {
  return {
    type: REDIRECT_FALSE
  }
}
//clearmessageserrors
export const clearmsgerr = () => {
  return {
    type: CLEAR_MSGERR
  }
}




export const getallblogs = (username) => {
  return function (dispatch) {

    var config = {
      method: 'get',
      url: `http://localhost:5000/blogapi/getallblogs`,
      headers: {},

    };
    axios(config)
      .then(function (response) {
        // console.log(response);
        dispatch(allblogssuccess(response.data.blogs))
      })
      .catch(function (error) {
        //console.log(error.response);
        // dispatch(userblogserror())
      });
  }
}

function allblogssuccess(blogs) {
  return {
    type: GETBLOGS_SUCCESS,
    payload: blogs
  }
}




export const getuserblogs = (username) => {
  return function (dispatch) {

    var config = {
      method: 'get',
      url: `http://localhost:5000/blogapi/getuserblogs/${username}`,
      headers: {},

    };
    axios(config)
      .then(function (response) {
        console.log(response);
        dispatch(userblogssuccess(response.data.blogs))
      })
      .catch(function (error) {
        //console.log(error.response);
        // dispatch(userblogserror())
      });
  }
}

function userblogssuccess(blogs) {
  return {
    type: GETUSERBLOGS_SUCCESS,
    payload: blogs
  }
}




export const clearblogsfromstate = () => {
  return {
    type: CLEARBLOGSTATE
  }
}


export const getslugblog = (slug) => {
  return function (dispatch) {

    var config = {
      method: 'get',
      url: `http://localhost:5000/blogapi/blogview/${slug}`,
      headers: {},

    };
    axios(config)
      .then(function (response) {
        // console.log(response);
        dispatch(slugblog(response.data.blogs))
      })
      .catch(function (error) {
        //console.log(error.response);
        // dispatch(userblogserror())
      });
  }
}

const slugblog = (blog) => {
  return {
    type: SLUGBLOG,
    payload: blog
  }
}

export const deleteblog = (id, username) => {

  return function (dispatch) {
    var config = {
      method: 'delete',
      url: `http://localhost:5000/blogapi/deleteblog/${id}`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(deleteblogsuccess())
        dispatch(getuserblogs(username))
      })
      .catch(function (error) {
        console.log(error);
      });

  }
}

const deleteblogsuccess = () => {
  return {
    type: DELETEBLOG_SUCCESS
  }
}

export const cleardeletestate = () => {
return {
  type : CLEARDELETESTATE,
}
}