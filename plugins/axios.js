import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const url = "http://127.0.0.1:8000";

  const axiosInstance = axios.create({
    baseURL: `${url}`,
  });

  const api = {
    get(endpoint, config) {
      return axiosInstance.get(endpoint, config);
    },
    post(endpoint, body, config) {
      return axiosInstance.post(endpoint, body, config);
    },
    put(endpoint, body, config) {
      return axiosInstance.put(endpoint, body, config);
    },
    patch(endpoint, body, config) {
      return axiosInstance.patch(endpoint, body, config);
    },
    delete(endpoint, config) {
      return axiosInstance.delete(endpoint, config);
    },
  };

  nuxtApp.provide("api", api);
});
