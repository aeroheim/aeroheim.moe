import { SET_SCROLLBAR_ENABLED, SET_APP_LOADING, SET_APP_ERROR, CLEAR_APP_ERROR } from '../actions/app-actions';

const initialState =
{
    scrollbarEnabled: true,
    loading: false,
    error: null,
}

const appReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case SET_SCROLLBAR_ENABLED:
            return { ...state, scrollbarEnabled: action.enabled };
        case SET_APP_LOADING:
            return { ...state, loading: action.loading };
        case SET_APP_ERROR:
            return { ...state, error: action.error };
        case CLEAR_APP_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
}

export default appReducer;

