import { SET_SCROLLBAR_VISIBILITY } from '../actions/app-actions';

const initialState =
{
    scrollbarVisibility: true,
}

const appReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case SET_SCROLLBAR_VISIBILITY:
            return { ...state, scrollbarVisibility: action.visible };
        default:
            return state;
    }
}

export default appReducer;

