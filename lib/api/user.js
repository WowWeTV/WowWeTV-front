import axios from 'axios';
import SERVER_BASE_URL from '../utils/constant';

const userAPI = {
  loadSearchVideosAPI: ({ data }) => {
    return axios
      .get(
        `search?query=${data.query}}&type=channels&offset=${data.offset}limit=${data.limit}`,
      )
      .then((res) => res.data);
  },
  registerUser: (data) => {
    return axios
      .post(`${SERVER_BASE_URL}/user/register`, data)
      .then((res) => res.data);
  },
  loginUser: (data) => {
    return axios
      .post(`${SERVER_BASE_URL}/user/login`, data)
      .then((res) => res.data);
  },
  uploadVideo: (data) => {
    return axios.post(`/video/upload`, data).then((res) => res.data);
  },
};
export default userAPI;
