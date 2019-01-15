import { REQUEST_POSTS, RECEIVE_POSTS, INVALIDATE_POSTS } from '../actions/blog-actions';

const initialState =
{
    requestId: null,
    posts: null,
    pages: null,
    page: null,
    loaded: false,
}

const blogReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case REQUEST_POSTS:
            return { ...state, requestId: action.requestId };
        case RECEIVE_POSTS:
            // only accept the receive from the latest request.
            return action.requestId === state.requestId 
            ? { 
                ...state,
                posts: action.data.posts,
                limit: action.data.limit,
                pages: action.data.pages,
                page: action.data.page,
                loaded: true,
            }
            : state;
        case INVALIDATE_POSTS:
            // only invalidate the state if the requestId matches or none is specified.
            return action.requestId === undefined || action.requestId === null || action.requestId === state.requestId ? initialState : state;
        default:
            return state;
    }
}

export default blogReducer;