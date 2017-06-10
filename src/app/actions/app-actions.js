export const SET_SCROLLBAR_VISIBILITY = 'SET_SCROLLBAR_VISIBILITY';
export const setScrollbarVisibility = (visible) =>
{
    return {
        type: SET_SCROLLBAR_VISIBILITY,
        visible: visible,
    }
}