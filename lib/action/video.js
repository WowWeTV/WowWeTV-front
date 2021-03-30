const { createAsyncThunk } = require("@reduxjs/toolkit");
import { videoAPI } from "../api/video";
export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId, thunkAPI) => {
    const response = videoAPI.fetchById(userId);
    return response.data;
  },
);
