export const ADD_GALLERY_IMAGE = 'ADD_GALLERY_IMAGE';
export const addGalleryImage = image => ({
  type: ADD_GALLERY_IMAGE,
  image,
});

export const SET_GALLERY_IMAGES = 'SET_GALLERY_IMAGES';
export const setGalleryImages = images => ({
  type: SET_GALLERY_IMAGES,
  images,
});

export const SET_GALLERY_ACTIVE_IMAGE_INDEX = 'SET_GALLERY_ACTIVE_IMAGE_INDEX';
export const setGalleryActiveImageIndex = index => ({
  type: SET_GALLERY_ACTIVE_IMAGE_INDEX,
  index,
});

export const SET_GALLERY_VISIBILITY = 'SET_GALLERY_VISIBILITY';
export const setGalleryVisibility = visible => ({
  type: SET_GALLERY_VISIBILITY,
  visible,
});
