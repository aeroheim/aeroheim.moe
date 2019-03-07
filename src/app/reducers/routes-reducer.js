import { MATCH_ROUTE, UNMATCH_ROUTE } from '../actions/routes-actions';

const initialState = {
  // routes is stored as an object instead of set - must be serializable for SSR.
  activeRoutes: {},
};

const RoutesReducer = (state = initialState, action) => {
  let activeRoutes;
  switch (action.type) {
    case MATCH_ROUTE:
      activeRoutes = Object.assign({}, state.activeRoutes);
      activeRoutes[action.path] = true;
      return { ...state, activeRoutes };
    case UNMATCH_ROUTE:
      activeRoutes = Object.assign({}, state.activeRoutes);
      delete activeRoutes[action.path];
      return { ...state, activeRoutes };
    default:
      return state;
  }
};

export default RoutesReducer;
