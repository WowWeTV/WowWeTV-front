import { createSlice } from '@reduxjs/toolkit';
import { loadSearchUsers, registerUser } from '../action/user';

import faker from 'faker';

faker.locale = 'ko';

const init = {
  searchChannels: [],
  singlechannel: {
    userId: 1,
    userName: '노는언니',
    userImg:
      'https://phinf.pstatic.net/tvcast/20200709_275/iP5xG_1594267822178BSDbH_PNG/1594267822150.png?type=round_116_116',
    userBackImg:
      'https://phinf.pstatic.net/tvcast/20210215_64/u7umk_1613377016893UycPe_JPEG/1613377016874.jpg?type=f1248_230_webp',
  },
  userID: {},
  userInfo: {
    userId: 1,
    userName: '노는언니',
    userEmail: 'asdf@naver.com',
    userImg:
      'https://phinf.pstatic.net/tvcast/20200709_275/iP5xG_1594267822178BSDbH_PNG/1594267822150.png?type=round_116_116',
    userBackImg:
      'https://phinf.pstatic.net/tvcast/20210215_64/u7umk_1613377016893UycPe_JPEG/1613377016874.jpg?type=f1248_230_webp',
  },
};

for (let i = 0; i < 50; i++) {
  init.searchChannels.push({
    id: i,
    userName: faker.name.findName(),
    userImg: faker.image.avatar(),
    videoCount: faker.random.number(),
  });
}

const userSlice = createSlice({
  name: 'user',
  initialState: init,
  extraReducers: {
    [loadSearchUsers.pending]: (state) => {
      state.loading = 'pending';
    },
    [loadSearchUsers.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.searchChannels.push(action.data);
      state.error = null;
    },
    [loadSearchUsers.rejected]: (state, action) => {
      state.loading = 'idle';
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    },
    [registerUser.pending]: (state) => {
      state.loading = 'pending';
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.userID.push(action.data);
      state.error = null;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = 'idle';
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    },
  },
});

export default userSlice.reducer;
