import Axios from 'axios';

export const fetchPosts = (id) =>
{
    return (dispatch) => 
    {
        dispatch(requestPosts(id));
        return Axios.get('/api/blog')
            .then((res) => dispatch(receivePosts(id, res.data)))
            .catch((err) => dispatch(errorPosts(err)));
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

export const ERROR_POSTS = 'ERROR_POSTS';
const errorPosts = (err) =>
{
    return {
        type: ERROR_POSTS,
        err: err,
    }
}

export const INVALIDATE_POSTS = 'INVALIDATE_POSTS';
export const invalidatePosts = () =>
{
    return {
        type: INVALIDATE_POSTS,
    }
}