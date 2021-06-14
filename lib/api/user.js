import axios from 'axios';

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
      .post(`https://wowwowwe.herokuapp.com/user/register`, data)
      .then((res) => res.data);
  },
  uploadVideo: (data) => {
    return axios.post(`/video/upload`, data).then((res) => res.data);
  },
};
export default userAPI;
