export const ADD_GALLERY_IMAGE = 'ADD_GALLERY_IMAGE';
export const addGalleryImage = (image) =>
{
    return {
        type: ADD_GALLERY_IMAGE,
        image: image,
    };
}

export const SET_GALLERY_IMAGES = 'SET_GALLERY_IMAGES';
export const setGalleryImages = (images) =>
{
    return {
        type: SET_GALLERY_IMAGES,
        images: images,
    };
}

export const SET_GALLERY_ACTIVE_IMAGE_INDEX = 'SET_GALLERY_ACTIVE_IMAGE_INDEX';
export const setGalleryActiveImageIndex = (index) =>
{
    return {
        type: SET_GALLERY_ACTIVE_IMAGE_INDEX,
        index: index,
    };
}

export const SET_GALLERY_VISIBILITY = 'SET_GALLERY_VISIBILITY';
export const setGalleryVisibility = (visible) =>
{
    return {
        type: SET_GALLERY_VISIBILITY,
        visible: visible,
    };
}