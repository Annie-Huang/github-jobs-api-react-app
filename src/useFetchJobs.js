import {useEffect, useReducer} from "react";
import axios from 'axios';

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
  UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
}

// const BASE_ULR = 'https://jobs.github.com/positions.json';
const BASE_ULR = '/positions.json';
// const BASE_ULR = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';
// const BASE_ULR = 'https://api.allorigins.win/raw?url=https://jobs.github.com/positions.json';  // Another URL will work according to youtube comment

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
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return {...state, hasNextPage: action.payload.hasNextPage}
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

    // Make a axios call to fetch the current page data.
    const cancelToken1 = axios.CancelToken.source();
    axios.get(BASE_ULR, {
      cancelToken: cancelToken1.token,
      params: {markdown: true, page: page, ...params}

    }).then(res => {
      dispatch({type: ACTIONS.GET_DATA, payload: {jobs: res.data}})

    }).catch(e => {
      // Whenever there is manual cancel on the axios call, it throws an error.
      if (axios.isCancel(e)) return;
      dispatch({type: ACTIONS.ERROR, payload: {error: e}})
    });



    // Make another axios call to see if the next page exists
    const cancelToken2 = axios.CancelToken.source();
    axios.get(BASE_ULR, {
      cancelToken: cancelToken2.token,
      params: {markdown: true, page: page + 1, ...params}

    }).then(res => {
      dispatch({type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: {hasNextPage: res.data.length !== 0}})

    }).catch(e => {
      // Whenever there is manual cancel on the axios call, it throws an error.
      if (axios.isCancel(e)) return;
      dispatch({type: ACTIONS.ERROR, payload: {error: e}})
    });


    return () => {
      cancelToken1.cancel()
      cancelToken2.cancel()
    }

  }, [params, page])

  return state;
}
