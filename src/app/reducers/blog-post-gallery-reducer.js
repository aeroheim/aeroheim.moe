import { ADD_GALLERY_IMAGE, SET_GALLERY_IMAGES, SET_GALLERY_ACTIVE_IMAGE_INDEX, SET_GALLERY_VISIBILITY } from '../actions/blog-post-gallery-actions';

const initialState =
{
    images: [],
    activeImageIndex: -1,
    visible: false,
}

const BlogPostGalleryReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case ADD_GALLERY_IMAGE:
            const images = state.images.slice();
            images.push(action.image);
            return { ...state, images: images };
        case SET_GALLERY_IMAGES:
            return { ...state, images: action.images, activeImageIndex: -1 };
        case SET_GALLERY_ACTIVE_IMAGE_INDEX:
            return { ...state, activeImageIndex: action.index };
        case SET_GALLERY_VISIBILITY:
            return { ...state, visible: action.visible };
        default:
            return state;
    }
}

export default BlogPostGalleryReducer;