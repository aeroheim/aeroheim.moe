import { REQUEST_POST, RECEIVE_POST, INVALIDATE_POST } from '../actions/blog-post-actions';

const initialState =
{
    stateId: null,
    postId: null,
    title: null,
    description: null,
    date: null,
    content: null,
    prevPost: null,
    nextPost: null,
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
                    postId: action.data._id,
                    title: action.data.title,
                    description: action.data.description,
                    date: action.data.date,
                    tags: action.data.tags,
                    content: action.data.content,
                    prevPost: action.data.prevPost,
                    nextPost: action.data.nextPost,
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


