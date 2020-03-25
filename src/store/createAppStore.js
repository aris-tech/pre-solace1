import { createStore } from 'redux';
import app from '../reducers/index';

export default function createAppStore() { 
  return createStore(app); // optionally specify initial state to hydrate the store with the state from the server
} 