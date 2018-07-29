import { REQUEST_POST, RECEIVE_POST, INVALIDATE_POST } from '../actions/blog-post-actions';

const initialState =
{
    stateId: null,
    postId: null,
    title: null,
    description: null,
    date: null,
    content: null,
    loaded: false,
}

const blogPostReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case REQUEST_POST:
            return { ...state, stateId: action.stateId};
        case RECEIVE_POST:
            // only accept the receive if the state it's intended for matches.
            return action.stateId === state.stateId 
                ? {
                    ...state,
                    postId: action.postId,
                    title: action.post.title,
                    description: action.post.description,
                    date: action.post.date,
                    tags: action.post.tags,
                    content: action.post.content,
                    loaded: true,
                }
                : state;
        case INVALIDATE_POST:
            // only invalidate the state if it's intended for the current state or regardless of state.
            return action.stateId === undefined || action.stateId === null || action.stateId === state.stateId ? initialState : state;
        default:
            return state;
    }
}

export default blogPostReducer;


