import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import videoSlice from './videoSlice';
import userSlice from './userSlice';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      return combineReducers({
        video: videoSlice,
        user: userSlice,
      })(state, action);
  }
};

export default reducer;
