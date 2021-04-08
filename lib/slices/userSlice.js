import { createSlice } from '@reduxjs/toolkit';
import { fetchUserById } from '../action/user';
import faker from 'faker';

faker.locale = 'ko';

const init = {
  searchChannels: [],
  singlechannel: {},
  userInfo: {},
};

for (let i = 0; i < 50; i++) {
  init.searchChannels.push({
    id: faker.random.number(),
    userName: faker.name.findName(),
    userImg: faker.image.avatar(),
    videoCount: faker.random.number(),
  });
}

const userSlice = createSlice({
  name: 'user',
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
