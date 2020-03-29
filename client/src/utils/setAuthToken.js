import axios from 'axios';

/**
 * We used passport.js to generate a JWT token for the client
 * so that they can have a "passport" they can use in order to identify themselves
 * @param {string} token - The JWT token
 */
const setAuthToken = (token) => {
  if (token) {
    // Apply auth token to every request if logged in
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
export default setAuthToken;
