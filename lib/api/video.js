import axios from 'axios';
import SERVER_BASE_URL from '../utils/constant';

const videoAPI = {
  loadSearchVideosAPI: ({ data }) => {
    return axios
      .get(
        `search?query=${data.query}}&type=videos&offset=${data.offset}limit=${data.limit}`,
      )
      .then((res) => res.data);
  },
  loadMoreUserVideo: ({ data }) => {
    return axios
      .get(
        `loadMoreUserVideo?type=${data.sort}&offset=${data.offset}limit=${data.limit}`,
      )
      .then((res) => res.data);
  },
  loadRecentVideo: (data) => {
    return axios
      .get(
        `${SERVER_BASE_URL}/loadRecentVideo?limit=${data.limit}&offset=${data.offset}`,
      )
      .then((res) => res.data);
  },
  loadTop100Video: (data) => {
    return axios
      .get(
        `${SERVER_BASE_URL}/loadTop100Video?limit=${data.limit}&offset=${data.offset}`,
      )
      .then((res) => res.data);
  },
  loadSingleVideo: ({ data }) => {
    return axios.get(`detail/${data}`).then((res) => res.data);
  },
};

export default videoAPI;
