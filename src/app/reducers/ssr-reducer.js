import { QUEUE_SSR_REQUEST } from '../actions/ssr-actions';

const initialState = {
  requests: [],
};

// TODO: remove store from memory for non-SSR case.
const SsrReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUEUE_SSR_REQUEST:
      return { ...state, requests: [...state.requests, action.request] };
    default:
      return state;
  }
};

export default SsrReducer;
