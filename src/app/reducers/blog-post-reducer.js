import { FETCH_POST, REQUEST_POST, RECEIVE_POST, ERROR_POST } from '../actions/blog-post-actions';

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
        case FETCH_POST:
            return state;
        case REQUEST_POST:
            return state;
        case RECEIVE_POST:
            return { 
                id: action.id,
                title: action.post.title,
                description: action.post.description,
                date: action.post.date,
                content: action.post.content,
                loaded: true,
                err: null,
            };
        case ERROR_POST:
            return { ...state, err: action.err };
        default:
            return state;
    }
}

export default blogPostReducer;


