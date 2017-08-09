import { REQUEST_POST, RECEIVE_POST, ERROR_POST, INVALIDATE_POST } from '../actions/blog-post-actions';

const initialState =
{
    id: null,
    title: null,
    description: null,
    date: null,
    content: null,
    loaded: false,
    err: null,
}

const blogPostReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case REQUEST_POST:
            return { ...state, id: action.id };
        case RECEIVE_POST:
            // only accept the receive if it's for the latest request.
            return action.id === state.id 
                ? { 
                    ...state,
                    title: action.post.title,
                    description: action.post.description,
                    date: action.post.date,
                    tags: action.post.tags,
                    content: action.post.content,
                    loaded: true,
                    err: null,
                }
                : state;
        case ERROR_POST:
            return { ...state, err: action.err };
        case INVALIDATE_POST:
            return { ...state, id: null, loaded: false, err: null };
        default:
            return state;
    }
}

export default blogPostReducer;


