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

const userAction = {
  loadSearchUsers,
};

export default userAction;
