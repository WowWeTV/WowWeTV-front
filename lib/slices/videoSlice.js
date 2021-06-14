import {
  loadSearchVideos,
  loadRecentVideo,
  loadTop100Video,
  addLike,
  removeLike,
  addView,
  loadComment,
  addComment,
  modifyComment,
  removeComment,
  addNestedComment,
  modifyNestedComment,
  removeNestedComment,
  loadVideo,
} from '../action/video';
import faker from 'faker';
import { createSlice } from '@reduxjs/toolkit';

faker.locale = 'ko';
const init = {
  loading: 'idle',
  error: null,
  recentVideos: [],
  top100Videos: [],
  aVideo: {},
  videoComments: [],
  likedVideoList: [],
  searchVideoList: [],
  recommendedVideoList: [],
  userVideoList: [],
  // ↓ 추후 삭제
  recentVideoList: [],
  top100VideoList: [],
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
  init.searchVideoList.push({
    userName: faker.name.findName(),
    id: faker.random.number(),
    videoTitle: faker.name.title(),
    videoImg: faker.image.imageUrl(),
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

for (let i = 0; i < 50; i++) {
  init.likedVideoList.push({
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
  extraReducers: (builder) => {
    builder
      .addCase(loadSearchVideos.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(loadSearchVideos.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.searchVideoList.push(action.payload);
      })
      .addCase(loadSearchVideos.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loadRecentVideo.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(loadRecentVideo.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.recentVideos.push(action.payload.data.content);
      })
      .addCase(loadRecentVideo.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loadTop100Video.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(loadTop100Video.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.top100Videos.push(action.payload.data.content);
      })
      .addCase(loadTop100Video.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loadVideo.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(loadVideo.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.aVideo = action.payload.data;
      })
      .addCase(loadVideo.rejected, (state, action) => {
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
        // state.aVideo.views += 1;
      })
      .addCase(addView.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(addLike.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        // state.user.userId = action.payload.data.userId;
      })
      .addCase(addLike.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(removeLike.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
      })
      .addCase(removeLike.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loadComment.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(loadComment.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.videoComments.push(action.payload.content);
      })
      .addCase(loadComment.rejected, (state, action) => {
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
      })
      .addCase(addNestedComment.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(addNestedComment.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.singleVideo.comments.map(
          (comment) =>
            comment.id === action.payload.commentId &&
            comment.nestedComment.push({
              id: faker.random.number(),
              nestedCommentText: action.payload.nestedCommentText,
              userName: '대댓글 테스트',
              createDate: new Date(),
            }),
        );
      })
      .addCase(addNestedComment.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(modifyNestedComment.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(modifyNestedComment.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.singleVideo.comments.map(
          (comment) =>
            comment.id === action.payload.commentId &&
            comment.nestedComment.map(
              (nested) =>
                nested.id === action.payload.nestedId &&
                (nested.nestedCommentText.replace(
                  nested.nestedCommentText,
                  action.payload.nestedCommentText,
                ),
                nested.createDate.replace(nested.createDate, new Date())),
            ),
        );
      })
      .addCase(modifyNestedComment.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(removeNestedComment.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(removeNestedComment.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.singleVideo.comments.map(
          (comment) =>
            comment.id === action.payload.commentId &&
            comment.nestedComment.filter(
              (nested) => nested.id !== action.payload.nestedId,
            ),
        );
      })
      .addCase(removeNestedComment.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default videoSlice.reducer;
