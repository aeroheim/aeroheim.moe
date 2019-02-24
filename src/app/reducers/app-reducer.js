import { SET_SCROLLBAR_ENABLED, SET_APP_LOADING, SET_APP_ERROR, CLEAR_APP_ERROR } from '../actions/app-actions';

const initialState = {
  scrollbarEnabled: true,
  // activeLoading is stored as an object instead of set - must be serializable for SSR.
  activeLoading: {},
  loading: false,
  error: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCROLLBAR_ENABLED:
      return { ...state, scrollbarEnabled: action.enabled };
    case SET_APP_LOADING:
    {
      const activeLoading = Object.assign({}, state.activeLoading);
      const id = action.id ? action.id : 0;
      if (action.loading) {
        activeLoading[id] = true;
      } else {
        delete activeLoading[id];
      }
      return { ...state, activeLoading, loading: activeLoading.size > 0 };
    }
    case SET_APP_ERROR:
      return { ...state, error: action.error };
    case CLEAR_APP_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default appReducer;
