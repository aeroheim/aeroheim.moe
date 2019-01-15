import { REQUEST_POST, RECEIVE_POST, INVALIDATE_POST } from '../actions/blog-post-actions';

const initialState =
{
    requestId: null,
    postId: null,
    title: null,
    description: null,
    date: null,
    content: null,
    images: [],
    prevPost: null,
    nextPost: null,
    loaded: false,
}

const blogPostReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case REQUEST_POST:
            return { ...state, requestId: action.requestId};
        case RECEIVE_POST:
            // only accept the receive from the latest request.
            return action.requestId === state.requestId 
                ? {
                    ...state,
                    postId: action.data._id,
                    title: action.data.title,
                    description: action.data.description,
                    date: action.data.date,
                    tags: action.data.tags,
                    content: action.data.content,
                    images: action.data.images,
                    prevPost: action.data.prevPost,
                    nextPost: action.data.nextPost,
                    limit: action.data.limit,
                    page: action.data.page,
                    loaded: true,
                }
                : state;
        case INVALIDATE_POST:
            // only invalidate the state if the requestId matches or none is specified.
            return action.requestId === undefined || action.requestId === null || action.requestId === state.requestId ? initialState : state;
        default:
            return state;
    }
}

export default blogPostReducer;


