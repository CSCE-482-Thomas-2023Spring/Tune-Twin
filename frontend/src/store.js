import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  acoustics: 'N/A',
  danceability: 'N/A',
  energy: 'N/A',
  keys: 'N/A',
  liveness: 'N/A',
  loudness: 'N/A',
  mode: 'N/A',
  tempo: 'N/A',
  valence: 'N/A'
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        [action.filterType]: action.filterValue
      };
    case 'CLEAR_FILTERS':
      return initialState;
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    filter: filterReducer
  }
});

export default store;