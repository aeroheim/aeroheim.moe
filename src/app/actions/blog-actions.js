import Axios from 'axios';
import { setAppError, setAppLoading } from './app-actions';

export const fetchPosts = (id) =>
{
    return (dispatch) => 
    {
        dispatch(setAppLoading(true));
        dispatch(requestPosts(id));
        return Axios.get('/api/blog')
            .then((res) => dispatch(receivePosts(id, res.data)))
            .catch((err) => dispatch(setAppError(err.response.status)))
            .finally(() => dispatch(setAppLoading(false)));
    };
}

export const REQUEST_POSTS = 'REQUEST_POSTS';
const requestPosts = (id) =>
{
    return {
        type: REQUEST_POSTS,
        id: id,
    };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
const receivePosts = (id, posts) =>
{
    return {
        type: RECEIVE_POSTS,
        id: id,
        posts: posts,
    };
}

export const INVALIDATE_POSTS = 'INVALIDATE_POSTS';
export const invalidatePosts = () =>
{
    return {
        type: INVALIDATE_POSTS,
    }
}