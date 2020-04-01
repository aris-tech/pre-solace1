import { combineReducers } from 'redux';

// Reducers
import auth from './auth';
import errors from './errors';
import search from './search';

export default combineReducers({
  auth,
  errors,
  search,
});
