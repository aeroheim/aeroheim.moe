export const SET_SCROLLBAR_ENABLED = 'SET_SCROLLBAR_ENABLED';
export const setScrollbarEnabled = (enabled) =>
{
    return {
        type: SET_SCROLLBAR_ENABLED,
        enabled: enabled,
    }
}

export const SET_APP_LOADING = 'SET_APP_LOADING';
export const setAppLoading = (loading, id) =>
{
    return {
        type: SET_APP_LOADING,
        loading: loading,
        id: id,
    }
}

export const NotFoundError = 404;
export const NotImplementedError = -1;

export const SET_APP_ERROR = 'SET_APP_ERROR';
export const setAppError = (error) =>
{
    return {
        type: SET_APP_ERROR,
        error: error,
    }
}

export const CLEAR_APP_ERROR = 'CLEAR_APP_ERROR';
export const clearAppError = () =>
{
    return {
        type: CLEAR_APP_ERROR,
    }
}
