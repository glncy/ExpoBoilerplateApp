import axios, { CreateAxiosDefaults } from "axios";

export const createAxiosClient = (axiosDefaults?: CreateAxiosDefaults) => {
  return axios.create({
    ...axiosDefaults,
    timeout: axiosDefaults?.timeout ?? 10000,
  });
};
