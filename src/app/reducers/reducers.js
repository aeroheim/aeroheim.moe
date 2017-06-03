import { combineReducers } from 'redux';
import routesReducer from './routes-reducer';
import blogReducer from './blog-reducer';
import blogPostReducer from './blog-post-reducer';
import blogPostImageGalleryReducer from './blog-post-image-gallery-reducer';

const rootReducer = combineReducers(
{
    routes: routesReducer,
    blog: blogReducer,
    blogPost: blogPostReducer,
    blogPostImageGallery: blogPostImageGalleryReducer,
});

export default rootReducer;