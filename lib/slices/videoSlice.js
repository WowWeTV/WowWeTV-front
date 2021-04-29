import {
  loadSearchVideos,
  addLike,
  removeLike,
  addView,
  addComment,
  modifyComment,
  removeComment,
} from '../action/video';
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
    comments: [],
  },
  recommendedVideoList: [],
  userVideoList: [],
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
  init.userVideoList.push({
    userName: faker.name.findName(),
    id: faker.random.number(),
    videoTitle: faker.name.title(),
    vidoeImg: faker.image.imageUrl(),
    tag: faker.random.word(),
    views: faker.random.number(),
    videoLength: faker.random.number(),
    like: faker.random.number(),
    createDate: faker.date.past(),
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
  reducers: {
    addNestedComment: (state, { payload }) => {
      state.singleVideo.comments.map(
        (comment) =>
          comment.id === payload.commentId &&
          comment.nestedComment.push({
            id: faker.random.number(),
            nestedCommentText: payload.nestedCommentText,
            userName: '대댓글 테스트',
            createDate: new Date(),
          }),
      );
    },
    modifyNestedComment: (state, { payload }) => {
      state.singleVideo.comments.map(
        (comment) =>
          comment.id === payload.commentId &&
          comment.nestedComment.nestedId === payload.nestedId &&
          (comment.nestedComment.nestedCommentText.replace(
            comment.nestedComment.nestedCommentText,
            payload.nestedCommentText,
          ),
          comment.nestedComment.createDate.replace(
            comment.nestedComment.createDate,
            new Date(),
          )),
      );
    },
    removeNestedComment: (state, { payload }) => {
      state.singleVideo.comments.map(
        (comment) =>
          comment.id === payload.commentId &&
          comment.nestedComment.id !== payload.nestedId,
      );
    },
  },
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
      })
      .addCase(addView.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(addView.fulfilled, (state) => {
        state.loading = 'fulfilled';
        state.singleVideo.views += 1;
      })
      .addCase(addView.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(addLike.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(addLike.fulfilled, (state) => {
        state.loading = 'fulfilled';
        state.singleVideo.likes += 1;
      })
      .addCase(addLike.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(removeLike.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(removeLike.fulfilled, (state) => {
        state.loading = 'fulfilled';
        state.singleVideo.likes -= 1;
      })
      .addCase(removeLike.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(addComment.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.singleVideo.comments.push({
          id: faker.random.number(),
          commentText: action.payload.commentText,
          createDate: new Date(),
          user: {
            id: faker.random.number(),
            userName: '댓글 테스트',
          },
          nestedComment: [],
        });
      })
      .addCase(addComment.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(modifyComment.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(modifyComment.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.singleVideo.comments.map(
          (comment) =>
            comment.id === action.payload.id &&
            (comment.commentText.replace(
              comment.commentText,
              action.payload.commentText,
            ),
            comment.createDate.replace(comment.createDate, new Date())),
        );
      })
      .addCase(modifyComment.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(removeComment.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.singleVideo.comments.filter(
          (comment) => comment.id !== action.payload.id,
        );
      })
      .addCase(removeComment.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const {
  addNestedComment,
  modifyNestedComment,
  removeNestedComment,
} = videoSlice.actions;
export default videoSlice.reducer;
