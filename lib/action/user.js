const { createAsyncThunk } = require("@reduxjs/toolkit");
import { useAPI } from "../api/user";
export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = useAPI.fetchById(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  },
);
