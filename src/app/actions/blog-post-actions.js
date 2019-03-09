import Axios from 'axios';
import { setAppError, setAppLoading } from './app-actions';
import { queueSsrRequest } from './ssr-actions';

export const REQUEST_POST = 'REQUEST_POST';
const requestPost = requestId => ({
  type: REQUEST_POST,
  requestId,
});

export const RECEIVE_POST = 'RECEIVE_POST';
const receivePost = (requestId, data) => ({
  type: RECEIVE_POST,
  requestId,
  data,
});

export const INVALIDATE_POST = 'INVALIDATE_POST';
export const invalidatePost = requestId => ({
  type: INVALIDATE_POST,
  requestId,
});

export const fetchPost = (requestId, postId, query) => (dispatch) => {
  dispatch(setAppLoading(true, requestId));
  dispatch(requestPost(requestId));

  const requestConfig = global.__SERVER__
    ? { baseURL: global.__SERVER_URL__ }
    : {};

  const request = Axios.get(`/api/blog/${postId}/${query}`, requestConfig)
    .then(res => dispatch(receivePost(requestId, res.data)))
    .catch(err => dispatch(setAppError(err.response.status)))
    .finally(() => dispatch(setAppLoading(false, requestId)));

  if (global.__SERVER__) {
    dispatch(queueSsrRequest(request));
  }
};
