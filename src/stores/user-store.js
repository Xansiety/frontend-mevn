import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expiresIn = ref(null);

  // email: "ferando543@outlook.com",
  // password: "!Abc123",
  const onLogin = async ({ email, password }) => {
    // console.log({ email, password });
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      token.value = response.data.token;
      expiresIn.value = response.data.expiresIn;
      sessionStorage.setItem("user", true);
      setTime();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        throw error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      // console.log(error.config);
      throw error;
    }
  };

  const onRegister = async ({ email, password, rePassword }) => {
    // console.log({ email, password });
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
        rePassword,
      });
      token.value = response.data.token;
      expiresIn.value = response.data.expiresIn;
      sessionStorage.setItem("user", true);
      setTime();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        throw error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      // console.log(error.config);
      throw error;
    }
  };

  // SetTimeOut para ejecutar cada cierto tiempo
  const setTime = () => {
    clearTimeout();
    setTimeout(() => {
      // console.log("On Refresh Token ⚡⚡⚡");
      refreshToken();
    }, expiresIn.value * 1000 - 6000); // 6 segundos antes de que expire el token
  };

  const refreshToken = async () => {
    try {
      const resp = await api.get("/auth/refresh");
      token.value = resp.data.token;
      expiresIn.value = resp.data.expiresIn;
      setTime();
      sessionStorage.setItem("user", true);
      console.log("On refresh Token ⚡", token.value);
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem("user");
    }
  };

  const logOut = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      sessionStorage.removeItem("user");
    }
  };

  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  };

  return {
    token,
    expiresIn,
    onLogin,
    refreshToken,
    logOut,
    onRegister,
  };
});
