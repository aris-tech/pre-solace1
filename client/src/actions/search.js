import axios from 'axios';
import M from 'materialize-css';

export const SET_SEARCHING = 'SET_SEARCHING';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

// Method 1: Send search text, set home page to 'in progress', auto search for member
export function setSearching(value) {
  return {
    type: SET_SEARCHING,
    payload: value,
  };
}

// Method 2: Send search text, move to search page, let user pick
// If I want to pop an error toast, don't use a callback. Instead, define an action that either, (1) changes the state of errors, and the component uses that state, or (2) if it's ephemeral like a toast, then perform that in the action itself
// todo: change how this is done. I need to have search queries bookmarkable.
// As a result, in my home component, I need to push the query to /search/{query}
// On component mount, I look at my path and see that query value
// Then, dispatch a thunk that gets my search results
export function searchForCounselor(searchQuery, userId, history) {
  return (dispatch) => {
    axios
      .post('/api/search', { searchQuery, userId })
      .then((response) => {
        dispatch(setSearchResults(response.data));
      }) // Obtain search results
      .catch((err) => dispatch(searchFail(err)));
  };
}

export function setSearchResults(searchResults) {
  return {
    type: SET_SEARCH_RESULTS,
    searchResults,
  };
}

export function searchFail(err) {
  return (dispatch) => {
    M.toast({ html: `Search failed: ${err.message}` });
  };
}
