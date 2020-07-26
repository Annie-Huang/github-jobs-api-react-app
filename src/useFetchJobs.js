import {useEffect, useReducer} from "react";

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
            return {loading: true, jobs: []}
        case ACTIONS.GET_DATA:
            return {...state, loading: false, jobs: action.payload.jobs}
        case ACTIONS.ERROR:
            return {...state, loading: false, jobs: [], error: action.payload.error}
        default:
            return state
    }
}

export default function useFetchJobs(params, page) {
    // useReducer{fn, <initialState>}
    const [state, dispatch] = useReducer(reducer, {jobs: [], loading: true});

    // Search params changes or page number changes
    useEffect(() => {
        dispatch({type: ACTIONS.MAKE_REQUEST})
    }, [params, page])

    return {
        jobs: [],
        loading: false,
        error: false
    }
}
