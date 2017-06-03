import { ADD_GALLERY_IMAGE, SET_GALLERY_IMAGES, SET_GALLERY_ACTIVE_IMAGE_INDEX } from '../actions/blog-post-image-gallery-actions';

const initialState =
{
    images: [],
    activeImageIndex: -1,
}

const blogPostImageGalleryReducer = (state = initialState, action) =>
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
        default:
            return state;
    }
}

export default blogPostImageGalleryReducer;