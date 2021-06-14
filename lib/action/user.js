import userAPI from '../api/user';

const { createAsyncThunk } = require('@reduxjs/toolkit');

export const loadSearchUsers = createAsyncThunk(
  'vieos/loadSearchVideos',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.loadSearchVideosAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.registerUser(data);
      console.log(22, response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const uploadVideo = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.uploadVideo(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const userAction = {
  loadSearchUsers,
  registerUser,
  uploadVideo,
};

export default userAction;
