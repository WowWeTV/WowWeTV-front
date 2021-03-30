import axios from "axios";
export const useAPI = {
  fetchById({ data }) {
    axios.post(data);
  },
};
