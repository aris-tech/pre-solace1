import axios from 'axios';
import setAuthTokenOnHeader from '../utils/setAuthTokenOnHeader';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

import { getErrors } from './error';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// -- High-level actions --
export function signupUser(userData, history, onSuccess) {
  return (dispatch) => {
    axios
      .post('/api/users/signup', userData)
      .then((res) => {
        if (onSuccess) {
          onSuccess();
        }
        history.push('/counselor-signup-prompt');
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

// -- Save auth token to redux store --
export function setCurrentUser(decodedToken) {
  return {
    type: SET_CURRENT_USER,
    user: decodedToken,
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
