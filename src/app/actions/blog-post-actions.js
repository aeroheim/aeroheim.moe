import Axios from 'axios';
import parseBlogPost from '../util/blog-post-parser';
import { setAppError, setAppLoading } from './app-actions';

export const fetchPost = (stateId, postId) =>
{
    return (dispatch) =>
    {
        dispatch(setAppLoading(true));
        dispatch(requestPost(stateId));
        return Axios.get(`/api/blog/${postId}`)
            .then((res) => 
            {
                var date = new Date(res.data.date);
                res.data.date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                res.data.content = parseBlogPost(res.data.content);

                dispatch(receivePost(stateId, res.data))
            })
            .catch((err) => dispatch(setAppError(err.response.status)))
            .finally(() => dispatch(setAppLoading(false)));
    };
}

export const REQUEST_POST = 'REQUEST_POST';
const requestPost = (stateId) =>
{
    return {
        type: REQUEST_POST,
        stateId: stateId,
    };
}

export const RECEIVE_POST = 'RECEIVE_POST';
const receivePost = (stateId, data) =>
{
    return {
        type: RECEIVE_POST,
        stateId: stateId,
        data: data,
    };
}

export const INVALIDATE_POST = 'INVALIDATE_POST';
export const invalidatePost = (stateId) =>
{
    return {
        type: INVALIDATE_POST,
        stateId: stateId,
    }
}