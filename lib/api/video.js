import axios from 'axios';

const videoAPI = {
  loadSearchVideosAPI: ({ data }) => {
    return axios
      .get(
        `search?query=${data.query}}&type=videos&offset=${data.offset}limit=${data.limit}`,
      )
      .then((res) => res.data);
  },
  loadSingleVideo: ({ data }) => {
    return axios.get(`detail/${data}`).then((res) => res.data);
  },
};

export default videoAPI;
