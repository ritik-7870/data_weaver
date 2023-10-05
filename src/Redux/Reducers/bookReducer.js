// src/reducers/bookReducer.js
const initialState = {
    books: [],
    loading: false,
    error: null,
  };
  
  const bookReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_BOOKS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_BOOKS_SUCCESS':
        return { ...state, loading: false, books: action.payload, error: null };
      case 'FETCH_BOOKS_FAILURE':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default bookReducer;
  