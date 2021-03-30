const { createSlice } = require("@reduxjs/toolkit");
import { fetchUserById } from "../action/user";

const init = {
  searchChannels: [],
  singlechannel: {},
  userInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: init,
  extraReducers: {
    [fetchUserById.pending]: (state, action) => {},
    [fetchUserById.fulfilled]: (state, action) => {
      state.entities.push(action.payload);
    },
    [fetchUserById.rejected]: (state, action) => {},
  },
});

export default userSlice.reducer;
