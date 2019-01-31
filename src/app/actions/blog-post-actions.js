import Axios from 'axios';
import compileBlogPost from '../util/blog-post-parser';
import { setAppError, setAppLoading } from './app-actions';

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

export const fetchPost = (requestId, postId, query, markdownContext) => (dispatch) => {
  dispatch(setAppLoading(true, requestId));
  dispatch(requestPost(requestId));
  return Axios.get(`/api/blog/${postId}/${query}`)
    .then((res) => {
      const date = new Date(res.data.date);
      res.data.date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

      const post = compileBlogPost(res.data.content, markdownContext);
      res.data.content = post.content;
      res.data.images = post.images;

      dispatch(receivePost(requestId, res.data));
    })
    // eslint-disable-next-line no-console
    .catch((err) => { console.log(err); dispatch(setAppError(err.response.status)); })
    .finally(() => dispatch(setAppLoading(false, requestId)));
};
