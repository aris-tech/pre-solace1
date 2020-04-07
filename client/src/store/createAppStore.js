import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import app from '../reducers/index';

const initialState = {};
const middleware = [thunk];
export default function createAppStore() {
  return createStore(app, initialState, applyMiddleware(...middleware)); // optionally specify initial state to hydrate the store with the state from the server
}
