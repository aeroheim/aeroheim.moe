export const SET_SCROLLBAR_ENABLED = 'SET_SCROLLBAR_ENABLED';
export const setScrollbarEnabled = enabled => ({
  type: SET_SCROLLBAR_ENABLED,
  enabled,
});

export const SET_APP_LOADING = 'SET_APP_LOADING';
export const setAppLoading = (loading, id) => ({
  type: SET_APP_LOADING,
  loading,
  id,
});

export const NotFoundError = 404;
export const NotImplementedError = -1;

export const SET_APP_ERROR = 'SET_APP_ERROR';
export const setAppError = error => ({
  type: SET_APP_ERROR,
  error,
});

export const CLEAR_APP_ERROR = 'CLEAR_APP_ERROR';
export const clearAppError = () => ({
  type: CLEAR_APP_ERROR,
});
