import { fetchUserById } from '../action/video';
import faker from 'faker';

const { createSlice } = require('@reduxjs/toolkit');

faker.locale = 'ko';
const init = {
  recentVideoList: [],
  top100VideoList: [],
  searchVideoList: [],
  sigleVideo: {},
  recommentVideoList: [],
};

for (let i = 0; i < 500; i++) {
  init.searchVideoList.push({
    id: faker.random.number(),
    videoTitle: faker.name.title(),
    userName: faker.name.findName(),
    videoUrl: faker.image.imageUrl(),
    views: faker.random.number(),
    videoLength: faker.random.number(),
    like: faker.random.number(),
  });
}

for (let i = 0; i < 50; i++) {
  init.recentVideoList.push({
    id: faker.random.number(),
    videoTitle: faker.name.title(),
    userName: faker.name.findName(),
    videoUrl: faker.image.imageUrl(),
    videoLength: faker.random.number(),
    views: faker.random.number(),
    like: faker.random.number(),
  });
}

for (let i = 0; i < 50; i++) {
  init.top100VideoList.push({
    id: faker.random.number(),
    videoTitle: faker.name.title(),
    userName: faker.name.findName(),
    videoUrl: faker.image.imageUrl(),
    videoLength: faker.random.number(),
    views: faker.random.number(),
    like: faker.random.number(),
  });
}

const videoSlice = createSlice({
  name: 'video',
  initialState: init,
  extraReducers: {
    [fetchUserById.pending]: (state, action) => {},
    [fetchUserById.fulfilled]: (state, action) => {},
    [fetchUserById.rejected]: (state, action) => {},
  },
});

export default videoSlice.reducer;
