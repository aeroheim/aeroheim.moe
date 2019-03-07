export const QUEUE_SSR_REQUEST = 'SET_SSR_REQUEST';
export const queueSsrRequest = request => ({
  type: QUEUE_SSR_REQUEST,
  request,
});
