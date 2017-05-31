import Axios from 'axios';

export const fetchPosts = () =>
{
    return (dispatch) => 
    {
        dispatch(requestPosts());
        return Axios.get('/api/blog')
            .then((res) => dispatch(receivePosts(res.data)))
            .catch((err) => dispatch(errorPosts(err)));
    };
}

export const REQUEST_POSTS = 'REQUEST_POSTS';
const requestPosts = () =>
{
    return {
        type: REQUEST_POSTS,
    };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
const receivePosts = (posts) =>
{
    return {
        type: RECEIVE_POSTS,
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