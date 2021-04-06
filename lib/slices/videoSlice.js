const { createSlice } = require('@reduxjs/toolkit');
import { fetchUserById } from '../action/video';
import faker from 'faker';
faker.locale = 'ko';
const init = {
  newVideoList: [],
  recommentVideoList: [],
  searchVideoList: [],
  sigleVideo: {},
  recommentVideoList: [],
};

for (let i = 0; i < 50; i++) {
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

for (let i = 0; i < 4; i++) {
  init.newVideoList.push({
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
