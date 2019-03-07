import { combineReducers } from 'redux';
import AppReducer from './app-reducer';
import RoutesReducer from './routes-reducer';
import BlogReducer from './blog-reducer';
import BlogPostReducer from './blog-post-reducer';
import BlogPostGalleryReducer from './blog-post-gallery-reducer';
import SsrReducer from './ssr-reducer';

const rootReducer = combineReducers({
  app: AppReducer,
  routes: RoutesReducer,
  blog: BlogReducer,
  blogPost: BlogPostReducer,
  blogPostGallery: BlogPostGalleryReducer,
  ssr: SsrReducer,
});

export default rootReducer;
