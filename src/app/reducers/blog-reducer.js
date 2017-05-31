import { FETCH_POSTS, REQUEST_POSTS, RECEIVE_POSTS, ERROR_POSTS } from '../actions/blog-actions';

const initialState =
{
    posts: null,
    loaded: false,
    err: null,
}

const blogReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case REQUEST_POSTS:
            return state;
        case RECEIVE_POSTS:
            return { ...state, posts: action.posts, loaded: true };
        case ERROR_POSTS:
            return { ...state, err: action.err };
        default:
            return state;
    }
}

export default blogReducer;