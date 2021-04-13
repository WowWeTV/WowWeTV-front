import axios from 'axios';

const userAPI = {
  loadSearchVideosAPI: ({ data }) => {
    return axios
      .get(
        `search?query=${data.query}}&type=channels&offset=${data.offset}limit=${data.limit}`,
      )
      .then((res) => res.data);
  },
};
export default userAPI;
