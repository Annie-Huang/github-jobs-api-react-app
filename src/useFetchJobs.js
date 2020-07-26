import {useEffect, useReducer} from "react";
import axios from 'axios';

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}

// const BASE_ULR = 'https://jobs.github.com/positions.json';
const BASE_ULR = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

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


// params will be description, location, lat, long, full_time, etc
export default function useFetchJobs(params, page) {
    // useReducer{fn, <initialState>}
    const [state, dispatch] = useReducer(reducer, {jobs: [], loading: true});

    // Search params changes or page number changes
    useEffect(() => {
        dispatch({type: ACTIONS.MAKE_REQUEST})
        axios.get(BASE_ULR, {
            params: {markdown: true, page: page, ...params}
        }).then(res => {
            dispatch({type: ACTIONS.GET_DATA, payload: {jobs: res.data}})
        }).catch(e => {
            dispatch({type: ACTIONS.ERROR, payload: {error: e}})
        });
    }, [params, page])

    return state;
}
