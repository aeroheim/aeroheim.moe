import { REQUEST_POSTS, RECEIVE_POSTS, INVALIDATE_POSTS } from '../actions/blog-actions';

const initialState =
{
    stateId: null,
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
            return { ...state, stateId: action.stateId };
        case RECEIVE_POSTS:
            // only accept the receive if the state it's intended for matches.
            return action.stateId === state.stateId 
            ? { 
                ...state,
                posts: action.data.posts,
                pages: action.data.pages,
                page: action.data.page,
                loaded: true,
            }
            : state;
        case INVALIDATE_POSTS:
            // only invalidate the state if it's intended for the current state or regardless of state.
            return action.stateId === undefined || action.stateId === null || action.stateId === state.stateId ? initialState : state;
        default:
            return state;
    }
}

export default blogReducer;