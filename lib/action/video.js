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

const videoAction = {
  loadSearchVideos,
};

export default videoAction;
