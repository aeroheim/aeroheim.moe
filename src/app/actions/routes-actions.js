export const MATCH_ROUTE = 'MATCH_ROUTE';
export const matchRoute = (path) =>
{
    return {
        type: MATCH_ROUTE,
        path: path,
    }
};

export const UNMATCH_ROUTE = 'UNMATCH_ROUTE';
export const unmatchRoute = (path) =>
{
    return {
        type: UNMATCH_ROUTE,
        path: path,
    }
}