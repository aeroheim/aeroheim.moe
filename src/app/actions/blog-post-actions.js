import Axios from 'axios';
import parseBlogPost from '../util/blog-post-parser';
import { setAppError, setAppLoading } from './app-actions';

export const fetchPost = (id) =>
{
    return (dispatch) =>
    {
        dispatch(setAppLoading(true));
        dispatch(requestPost(id));
        return Axios.get(`/api/blog/${id}`)
            .then((res) => 
            {
                var date = new Date(res.data.date);
                res.data.date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                res.data.content = parseBlogPost(res.data.content);
                
                dispatch(receivePost(id, res.data))
            })
            .catch((err) => dispatch(setAppError(err.response.status)))
            .finally(() => dispatch(setAppLoading(false)));
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

export const INVALIDATE_POST = 'INVALIDATE_POST';
export const invalidatePost = () =>
{
    return {
        type: INVALIDATE_POST,
    }
}