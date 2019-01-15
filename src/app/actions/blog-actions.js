import Axios from 'axios';
import { setAppError, setAppLoading } from './app-actions';

export const fetchPosts = (requestId, query) =>
{
    return (dispatch) =>
    {
        dispatch(setAppLoading(true, requestId));
        dispatch(requestPosts(requestId));
            return Axios.get(`/api/blog/${query}`)
            .then((res) => dispatch(receivePosts(requestId, res.data)))
            .catch((err) => dispatch(setAppError(err.response.status)))
            .finally(() => dispatch(setAppLoading(false, requestId)));
    };
}

export const REQUEST_POSTS = 'REQUEST_POSTS';
const requestPosts = (requestId) =>
{
    return {
        type: REQUEST_POSTS,
        requestId: requestId,
    };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
const receivePosts = (requestId, data) =>
{
    return {
        type: RECEIVE_POSTS,
        requestId: requestId,
        data: data,
    };
}

export const INVALIDATE_POSTS = 'INVALIDATE_POSTS';
export const invalidatePosts = (requestId) =>
{
    return {
        type: INVALIDATE_POSTS,
        requestId: requestId,
    }
}