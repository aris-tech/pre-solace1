import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import M from 'materialize-css';

import { getErrors } from './error';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const USER_LOADING = 'USER_LOADING';

// redux-thunk lets us return a function instead of an action
// This function, or thunk, doesn't dispatch anything to the reducer right away.
// Instead, it gives us the dispatch() function so that we
// can perform some other action first, and THEN dispatch to something else
// Notice, we don't HAVE to dispatch anything in our thunk.
// We can essentially now perform non-state-modifying actions

/*
We want to solve the issue of mixing client-side errors and server-side errors
we dispatch getErrors to get the errors from the api into redux
*/
export function signupUser(userData, history, onSuccess) {
  return (dispatch) => {
    axios
      .post('/api/userIdentities/signup', userData)
      .then((res) => {
        if (onSuccess) {
          onSuccess();
        }
        history.push('/login');
      })
      .catch((err) => dispatch(getErrors(err)));
  };
}
export function loginUser(userData) {
  return (dispatch) => {
    axios
      .post('/api/userIdentities/login', userData)
      .then((res) => {
        // Save token to localStorage
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        // Add token to request
        setAuthToken(token);
        const decodedToken = jwt_decode(token);
        dispatch(setCurrentUser(decodedToken));
      })
      .catch((err) => dispatch(getErrors(err)));
  };
}

export function setCurrentUser(decodedToken) {
  return {
    type: SET_CURRENT_USER,
    user: decodedToken,
  };
}

export function setUserLoading() {
  return {
    type: USER_LOADING,
  };
}

export function logoutUser(history) {
  return (dispatch) => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header from future requests
    setAuthToken(false);
    history.push('/login');
    // Set user to nobody
    dispatch(setCurrentUser({}));
  };
}

export function userNotLoggedIn() {
  return (dispatch) => {
    M.toast({ html: 'You are not logged in.' });
  };
}
