const { createSlice } = require("@reduxjs/toolkit");
import { fetchUserById } from "../action/video";

const init = {
  newVideoList: [],
  recommentVideoList: [],
  searchVideoList: [],
  sigleVideo: {},
  recommentVideoList: [],
};

const videoSlice = createSlice({
  name: "video",
  initialState: init,
  extraReducers: {
    [fetchUserById.pending]: (state, action) => {},
    [fetchUserById.fulfilled]: (state, action) => {},
    [fetchUserById.rejected]: (state, action) => {},
  },
});

export default videoSlice.reducer;
