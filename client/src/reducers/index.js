import { combineReducers } from 'redux';

// Reducers
import auth from './auth';
import errors from './errors';

export default combineReducers({
  auth,
  errors,
});
