import {useReducer} from "react";

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}


function reducer(state, action) {
    // e.g. if you have dispatch({type: 'hello', payload: {x:3}})
    // then action.payload.x is 3.

    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:

        case ACTIONS.GET_DATA:

        case ACTIONS.ERROR:

        default:
            return state
    }
}

export default function useFetchJobs(params, page) {
    // useReducer{fn, <initialState>}
    const [state, dispatch] = useReducer(reducer, {jobs: [], loading: true});

    return {
        jobs: [],
        loading: false,
        error: false
    }
}
