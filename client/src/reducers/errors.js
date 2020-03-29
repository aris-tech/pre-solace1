import { GET_ERRORS } from '../actions/error';

const initialState = {};

export default function errors(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.errors;
    default:
      return state;
  }
}
