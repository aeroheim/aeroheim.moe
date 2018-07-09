import { REQUEST_POSTS, RECEIVE_POSTS, ERROR_POSTS, INVALIDATE_POSTS } from '../actions/blog-actions';

const initialState =
{
    id: null,
    posts: null,
    loaded: false,
    err: null,
}

const blogReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case REQUEST_POSTS:
            return { ...state, id: action.id };
        case RECEIVE_POSTS:
            // only accept the receive if it's for the latest request.
            return action.id === state.id 
            ? { 
                ...state,
                posts: action.posts, 
                loaded: true,
                err: null,
            }
            : state;
        case ERROR_POSTS:
            return { ...state, err: action.err };
        case INVALIDATE_POSTS:
            return { ...state, id: null, loaded: false, err: null };
        default:
            return state;
    }
}

export default blogReducer;