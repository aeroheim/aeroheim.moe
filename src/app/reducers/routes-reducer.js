import { MATCH_ROUTE, UNMATCH_ROUTE } from '../actions/routes-actions';

const initialState = {
  activeRoutes: new Set(),
};

const routesReducer = (state = initialState, action) => {
  let activeRoutes;
  switch (action.type) {
    case MATCH_ROUTE:
      activeRoutes = new Set(state.activeRoutes);
      activeRoutes.add(action.path);
      return { ...state, activeRoutes };
    case UNMATCH_ROUTE:
      activeRoutes = new Set(state.activeRoutes);
      activeRoutes.delete(action.path);
      return { ...state, activeRoutes };
    default:
      return state;
  }
};

export default routesReducer;
