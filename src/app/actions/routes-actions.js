export const MATCH_ROUTE = 'MATCH_ROUTE';
export const matchRoute = path => ({
  type: MATCH_ROUTE,
  path,
});

export const UNMATCH_ROUTE = 'UNMATCH_ROUTE';
export const unmatchRoute = path => ({
  type: UNMATCH_ROUTE,
  path,
});
