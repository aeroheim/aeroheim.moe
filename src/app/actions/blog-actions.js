import Axios from 'axios';
import { setAppError, setAppLoading } from './app-actions';

export const fetchPosts = (stateId, limit, page) =>
{
    return (dispatch) => 
    {
        dispatch(setAppLoading(true));
        dispatch(requestPosts(stateId));
        return Axios.get('/api/blog', {params: { limit: limit, page: page }})
            .then((res) => dispatch(receivePosts(stateId, res.data)))
            .catch((err) => dispatch(setAppError(err.response.status)))
            .finally(() => dispatch(setAppLoading(false)));
    };
}

export const REQUEST_POSTS = 'REQUEST_POSTS';
const requestPosts = (stateId) =>
{
    return {
        type: REQUEST_POSTS,
        stateId: stateId,
    };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
const receivePosts = (stateId, data) =>
{
    return {
        type: RECEIVE_POSTS,
        stateId: stateId,
        data: data,
    };
}

export const INVALIDATE_POSTS = 'INVALIDATE_POSTS';
export const invalidatePosts = (stateId) =>
{
    return {
        type: INVALIDATE_POSTS,
        stateId: stateId,
    }
}