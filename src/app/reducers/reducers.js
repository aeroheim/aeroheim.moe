import { combineReducers } from 'redux';
import blogReducer from './blog-reducer';
import blogPostReducer from './blog-post-reducer';

const rootReducer = combineReducers(
{
    blog: blogReducer,
    blogPost: blogPostReducer,
});

export default rootReducer;