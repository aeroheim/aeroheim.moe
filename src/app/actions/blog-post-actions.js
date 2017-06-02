import Axios from 'axios';
import BlogPostParser from '../util/blog-post-parser';

export const fetchPost = (id) =>
{
    return (dispatch) =>
    {
        dispatch(requestPost(id));
        return Axios.get(`/api/blog/${id}`)
            .then((res) => 
            {
                res.data.date = new Date(res.data.date);
                res.data.content = BlogPostParser(res.data.content).tree;
                dispatch(receivePost(id, res.data))
            })
            .catch((err) => dispatch(errorPost(err)));
    };
}

export const REQUEST_POST = 'REQUEST_POST';
const requestPost = (id) =>
{
    return {
        type: REQUEST_POST,
        id: id,
    };
}

export const RECEIVE_POST = 'RECEIVE_POST';
const receivePost = (id, post) =>
{
    return {
        type: RECEIVE_POST,
        id: id,
        post: post,
    };
}

export const ERROR_POST = 'ERROR_POST';
const errorPost = (err) =>
{
    return {
        type: ERROR_POST,
        err: err,
    }
}

export const INVALIDATE_POST = 'INVALIDATE_POST';
export const invalidatePost = (err) =>
{
    return {
        type: INVALIDATE_POST,
    }
}