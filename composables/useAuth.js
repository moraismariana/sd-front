// composables/useAuth.js
import { ref, computed } from "vue";
import { useState, navigateTo, useNuxtApp } from "#app";

export const useAuth = () => {
  const { $api } = useNuxtApp();

  const accessToken = useState("accessToken", () => null);
  const refreshToken = useState("refreshToken", () => null);

  const initAuth = () => {
    if (process.client) {
      const storedAccess = localStorage.getItem("accessToken");
      const storedRefresh = localStorage.getItem("refreshToken");

      if (storedAccess) accessToken.value = storedAccess;
      if (storedRefresh) refreshToken.value = storedRefresh;
    }
  };

  const setTokens = (newTokens) => {
    accessToken.value = newTokens.access;
    refreshToken.value = newTokens.refresh;
    if (process.client) {
      localStorage.setItem("accessToken", newTokens.access);
      localStorage.setItem("refreshToken", newTokens.refresh);
    }
  };

  const login = async (usernameVal, passwordVal) => {
    try {
      const response = await $api.post("/token/", {
        username: usernameVal,
        password: passwordVal,
      });
      setTokens(response.data);
      return true;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      await logout(false);
      return false;
    }
  };

  const logout = async (redirect = true) => {
    accessToken.value = null;
    refreshToken.value = null;
    if (process.client) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    if (redirect) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      await navigateTo("/login");
    }
  };

  const isAuthenticated = computed(() => !!accessToken.value);

  return {
    login,
    logout,
    initAuth,
    accessToken,
    refreshToken,
    isAuthenticated,
  };
};
