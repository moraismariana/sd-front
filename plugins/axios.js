import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.djangoApiBaseUrl;

  const axiosInstance = axios.create({
    baseURL: baseURL,
  });

  axiosInstance.interceptors.request.use(
    (requestConfig) => {
      if (process.client) {
        const accessToken = localStorage.getItem("accessToken");
        const isTokenRoute =
          requestConfig.url.includes("/token/") ||
          requestConfig.url.includes("/token/refresh/");
        if (accessToken && !isTokenRoute) {
          requestConfig.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
      return requestConfig;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/token/refresh/")
      ) {
        originalRequest._retry = true;

        if (process.client) {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const { data } = await axiosInstance.post("/token/refresh/", {
                refresh: refreshToken,
              });
              localStorage.setItem("accessToken", data.access);
              originalRequest.headers.Authorization = `Bearer ${data.access}`;
              return axiosInstance(originalRequest);
            } catch (refreshError) {
              console.error("Unable to refresh token", refreshError);
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              if (
                nuxtApp.$router &&
                nuxtApp.$router.currentRoute.value.path !== "/login"
              ) {
                nuxtApp.$router.push("/login");
              } else if (
                typeof window !== "undefined" &&
                window.location.pathname !== "/login"
              ) {
                window.location.href = "/login";
              }
              return Promise.reject(refreshError);
            }
          } else {
            localStorage.removeItem("accessToken");
            if (
              nuxtApp.$router &&
              nuxtApp.$router.currentRoute.value.path !== "/login"
            ) {
              nuxtApp.$router.push("/login");
            } else if (
              typeof window !== "undefined" &&
              window.location.pathname !== "/login"
            ) {
              window.location.href = "/login";
            }
          }
        }
      }
      return Promise.reject(error);
    }
  );

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
