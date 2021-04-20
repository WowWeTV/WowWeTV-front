import { fetchUserById } from '../action/video';
import faker from 'faker';

const { createSlice } = require('@reduxjs/toolkit');

faker.locale = 'ko';
const init = {
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
    comments: [],
  },
  recommendedVideoList: [],
};

for (let i = 0; i < 25; i++) {
  init.singleVideo.comments.push({
    id: faker.random.number(),
    commentText: faker.lorem.sentence(),
    createDate: faker.date.recent(),
    user: {
      id: faker.random.number(),
      userName: faker.name.findName(),
    },
    nestedComment: [
      {
        id: faker.random.number(),
        nestedCommentText: faker.lorem.sentence(),
        userName: faker.name.findName(),
        createDate: faker.date.recent(),
      },
    ],
  });
}

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

for (let i = 0; i < 50; i++) {
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
  extraReducers: {
    [fetchUserById.pending]: (state, action) => {},
    [fetchUserById.fulfilled]: (state, action) => {},
    [fetchUserById.rejected]: (state, action) => {},
  },
});

export default videoSlice.reducer;
