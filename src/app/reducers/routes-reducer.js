import { MATCH_ROUTE, UNMATCH_ROUTE } from '../actions/routes-actions';

const initialState =
{
    activeRoutes: {},
}

const routesReducer = (state = initialState, action) =>
{
    let activeRoutes;
    switch(action.type)
    {
        case MATCH_ROUTE:
            activeRoutes = Object.assign({}, state.activeRoutes);
            activeRoutes[action.path] = true;
            return { ...state, activeRoutes: activeRoutes };
        case UNMATCH_ROUTE:
            activeRoutes = Object.assign({}, state.activeRoutes);
            delete activeRoutes[action.path];
            return { ...state, activeRoutes: activeRoutes };
        default:
            return state;
    }
}

export default routesReducer;