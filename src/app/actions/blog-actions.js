import Axios from 'axios';
import { setAppError, setAppLoading } from './app-actions';

export const REQUEST_POSTS = 'REQUEST_POSTS';
const requestPosts = requestId => ({
  type: REQUEST_POSTS,
  requestId,
});

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
const receivePosts = (requestId, data) => ({
  type: RECEIVE_POSTS,
  requestId,
  data,
});

export const INVALIDATE_POSTS = 'INVALIDATE_POSTS';
export const invalidatePosts = requestId => ({
  type: INVALIDATE_POSTS,
  requestId,
});

export const fetchPosts = (requestId, query) => (dispatch) => {
  dispatch(setAppLoading(true, requestId));
  dispatch(requestPosts(requestId));
  return Axios.get(`/api/blog/${query}`)
    .then(res => dispatch(receivePosts(requestId, res.data)))
    .catch(err => dispatch(setAppError(err.response.status)))
    .finally(() => dispatch(setAppLoading(false, requestId)));
};
