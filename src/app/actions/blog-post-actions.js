import Axios from 'axios';
import compileBlogPost from '../util/blog-post-parser';
import { setAppError, setAppLoading } from './app-actions';

export const fetchPost = (requestId, postId, query, markdownContext) =>
{
    return (dispatch) =>
    {
        dispatch(setAppLoading(true, requestId));
        dispatch(requestPost(requestId));
        return Axios.get(`/api/blog/${postId}/${query}`)
            .then(res =>
            {
                var date = new Date(res.data.date);
                res.data.date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

                const post = compileBlogPost(res.data.content, markdownContext);
                res.data.content = post.content;
                res.data.images = post.images;

                dispatch(receivePost(requestId, res.data))
            })
            .catch(err => { console.log(err); dispatch(setAppError(err.response.status)); })
            .finally(() => dispatch(setAppLoading(false, requestId)));
    };
}

export const REQUEST_POST = 'REQUEST_POST';
const requestPost = (requestId) =>
{
    return {
        type: REQUEST_POST,
        requestId: requestId,
    };
}

export const RECEIVE_POST = 'RECEIVE_POST';
const receivePost = (requestId, data) =>
{
    return {
        type: RECEIVE_POST,
        requestId: requestId,
        data: data,
    };
}

export const INVALIDATE_POST = 'INVALIDATE_POST';
export const invalidatePost = (requestId) =>
{
    return {
        type: INVALIDATE_POST,
        requestId: requestId,
    }
}