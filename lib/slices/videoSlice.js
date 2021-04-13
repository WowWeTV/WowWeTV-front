import { loadSearchVideos } from '../action/video';
import faker from 'faker';
import { createSlice } from '@reduxjs/toolkit';

faker.locale = 'ko';
const init = {
  loading: 'idle',
  error: null,
  recentVideoList: [],
  top100VideoList: [],
  searchVideoList: [],
  singleVideo: {
    id: faker.random.number(),
    videoTitle: faker.name.title(),
    userImg: faker.image.avatar(),
    userName: faker.name.findName(),
    videoUrl: faker.image.imageUrl(),
    videoLength: faker.random.number(),
    videoDesc: faker.lorem.paragraph(),
    views: faker.random.number(),
    likes: faker.random.number(),
    tags: new Array(6).fill(null).map(() => {
      return faker.random.word();
    }),
    createDate: faker.date.recent(),
    comments: faker.random.number(),
  },
  recommendedVideoList: [],
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
  init.recentVideoList.push({
    id: faker.random.number(),
    videoTitle: faker.name.title(),
    userName: faker.name.findName(),
    videoUrl: faker.image.imageUrl(),
    videoLength: faker.random.number(),
    views: faker.random.number(),
    likes: faker.random.number(),
  });
}

for (let i = 0; i < 100; i++) {
  init.top100VideoList.push({
    id: faker.random.number(),
    videoTitle: faker.name.title(),
    userName: faker.name.findName(),
    videoUrl: faker.image.imageUrl(),
    videoLength: faker.random.number(),
    views: faker.random.number(),
    likes: faker.random.number(),
  });
}

for (let i = 0; i < 10; i++) {
  init.recommendedVideoList.push({
    id: faker.random.number(),
    videoTitle: faker.name.title(),
    userName: faker.name.findName(),
    videoUrl: faker.image.imageUrl(),
    videoLength: faker.random.number(),
    views: faker.random.number(),
    likes: faker.random.number(),
  });
}

const videoSlice = createSlice({
  name: 'video',
  initialState: init,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSearchVideos.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(loadSearchVideos.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.searchVideoList.push(action.data);
      })
      .addCase(loadSearchVideos.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default videoSlice.reducer;
