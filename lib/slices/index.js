import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import videoReducer from "./videoSlice";
import userSlice from "./userSlice";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      return combineReducers({
        video: videoReducer,
        user: userSlice,
      })(state, action);
  }
};

export default reducer;
