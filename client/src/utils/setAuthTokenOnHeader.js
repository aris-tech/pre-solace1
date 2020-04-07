import axios from 'axios';

/**
 * Apply the JWT token to the header on every request
 * @param {string} token - The JWT token
 */
const setAuthTokenOnHeader = (token) => {
  if (token) {
    // Apply auth token to every request if logged in
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
export default setAuthTokenOnHeader;
