export const GET_ERRORS = 'GET_ERRORS';

export function getErrors(err) {
  return {
    type: GET_ERRORS,
    errors: err.response.data,
  };
}
