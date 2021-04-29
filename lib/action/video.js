import videoAPI from '../api/video';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadSearchVideos = createAsyncThunk(
  'vieos/loadSearchVideos',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadSearchVideosAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const addView = createAsyncThunk(
  'video/addView',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadSingleVideo(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const addLike = createAsyncThunk(
  'video/addLike',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadSingleVideo(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const removeLike = createAsyncThunk(
  'video/removeLike',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadSingleVideo(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const addComment = createAsyncThunk(
  'video/addComment',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadSingleVideo(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const modifyComment = createAsyncThunk(
  'video/modifyComment',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadSingleVideo(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const removeComment = createAsyncThunk(
  'video/removeComment',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadSingleVideo(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loadMoreUserVideo = createAsyncThunk(
  'vieos/loadMoreUserVideo',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadMoreUserVideoAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const videoAction = {
  loadSearchVideos,
  loadMoreUserVideo,
  addView,
  addLike,
  removeLike,
  addComment,
  modifyComment,
  removeComment,
};

export default videoAction;
