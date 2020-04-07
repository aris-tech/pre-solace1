import axios from 'axios';
import setAuthTokenOnHeader from '../utils/setAuthTokenOnHeader';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

import { getErrors } from './error';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const USER_LOADING = 'USER_LOADING';

/*
We want to solve the issue of mixing client-side errors and server-side errors
we dispatch getErrors to get the errors from the api into redux
*/
export function signupUser(userData, history, onSuccess) {
  return (dispatch) => {
    axios
      .post('/api/users/signup', userData)
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
      .post('/api/users/login', userData)
      .then((res) => {
        // Save token to localStorage
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        dispatch(authenticateJwtFromLocalStorage());
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
    setAuthTokenOnHeader(false);
    history.push('/login');
    // Set user to nobody
    dispatch(setCurrentUser({}));
  };
}

// -- Retrieving JWT Token and authenticating user
export function authenticateJwtFromLocalStorage() {
  return (dispatch) => {
    const { jwtToken: token } = localStorage;
    if (token) {
      debugger;
      setAuthTokenOnHeader(token);
      const decodedToken = jwt_decode(token);
      dispatch(setCurrentUser(decodedToken));
      const currentTime = Date.now() / 1000;
      if (currentTime > decodedToken.exp) {
        dispatch(logoutUser());
        window.location.href = '/login';
      }
    }
  };
}

export function moveJwtFromCookiesToLocalStorage() {
  return (dispatch) => {
    const token = Cookies.get('auth');
    if (token) {
      localStorage.setItem('jwtToken', token);
      Cookies.remove('auth');
    }
  };
}
