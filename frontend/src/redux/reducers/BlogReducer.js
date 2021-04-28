import { POSTBLOG_ERROR, POSTBLOG_SUCCESS, REDIRECT_FALSE, CLEAR_MSGERR } from '../actions/ACTIONTYPES'
import { GETBLOGS_SUCCESS, GETUSERBLOGS_SUCCESS, CLEARBLOGSTATE } from '../actions/ACTIONTYPES'
import { SLUGBLOG,DELETEBLOG_SUCCESS,CLEARDELETESTATE } from '../actions/ACTIONTYPES'

const initstate = {

    postblog_success: '',
    postblog_errors: [],
    redirectaftersuccess: false,

    //getblogstates   allblogs userblogs(individual user blogs)
    blogs_success: [],
    userblogs_success: [],

    slugblog: [],
    deleteblog_success : false,
}

const blogreducer = (state = initstate, action) => {
    switch (action.type) {

        case POSTBLOG_SUCCESS: return {
            ...state,
            postblog_errors: '',
            postblog_success: action.payload,
            redirectaftersuccess: true
        }
        case POSTBLOG_ERROR: return {
            ...state,
            postblog_success: '',
            postblog_errors: action.payload
        }
        case REDIRECT_FALSE: return {
            ...state, //redirecting and empty success msg
            redirectaftersuccess: false,
        }
        case CLEAR_MSGERR: return {
            ...state,
            postblog_success: '',
            postblog_errors: '',
        }
        case GETBLOGS_SUCCESS: return {
            ...state,
            blogs_success: action.payload
        }

        case GETUSERBLOGS_SUCCESS: return {
            ...state,
            userblogs_success: action.payload,
        }

        case CLEARBLOGSTATE: return {
            ...state,
            userblogs_success: [],
            // blogs_success : []
        }

        case SLUGBLOG: return {
            ...state,
            slugblog: action.payload
        }

        case DELETEBLOG_SUCCESS : return {
            ...state,
            deleteblog_success : true
        }

        case CLEARDELETESTATE : return {
            ...state,
            deleteblog_success : false
        }

        default: return state
    }
}

export default blogreducer