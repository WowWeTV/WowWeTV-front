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
};

export default videoAction;
