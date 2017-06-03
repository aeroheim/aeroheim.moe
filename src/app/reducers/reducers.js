import { combineReducers } from 'redux';
import routesReducer from './routes-reducer';
import blogReducer from './blog-reducer';
import blogPostReducer from './blog-post-reducer';

const rootReducer = combineReducers(
{
    routes: routesReducer,
    blog: blogReducer,
    blogPost: blogPostReducer,
});

export default rootReducer;