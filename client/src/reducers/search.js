import { SET_SEARCHING, SET_SEARCH_RESULTS } from '../actions/search';

const initialState = {
  isSearching: false, // Note, this state should also be stored in the database and this state should be filled up by api
  searchResults: null,
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCHING:
      return { ...state, isSearching: action.payload };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.searchResults };
    default:
      return state;
  }
}
