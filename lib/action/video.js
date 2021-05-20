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
export const loadRecentVideo = createAsyncThunk(
  'video/recentVideo',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadRecentVideo(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const loadTop100Video = createAsyncThunk(
  'video/top100Video',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadTop100Video(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const loadVideo = createAsyncThunk(
  'video/aVideo',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadVideo(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const addView = createAsyncThunk(
  'video/addView',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadVideo(data);
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
      const response = await videoAPI.addLike(data);
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
      const response = await videoAPI.removeLike(data);
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
export const addNestedComment = createAsyncThunk(
  'video/addNestedComment',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadSingleVideo(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const modifyNestedComment = createAsyncThunk(
  'video/modifyNestedComment',
  async (data, { rejectWithValue }) => {
    try {
      const response = await videoAPI.loadSingleVideo(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const removeNestedComment = createAsyncThunk(
  'video/removeNestedComment',
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
  loadRecentVideo,
  loadTop100Video,
  loadVideo,
  addView,
  addLike,
  removeLike,
  addComment,
  modifyComment,
  removeComment,
  addNestedComment,
  modifyNestedComment,
  removeNestedComment,
};

export default videoAction;
