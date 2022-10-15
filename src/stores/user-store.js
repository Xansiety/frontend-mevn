import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expiresIn = ref(null);

  const onLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email: "ferando543@outlook.com",
        password: "!Abc123",
      });
      token.value = response.data.token;
      expiresIn.value = response.data.expiresIn;
      sessionStorage.setItem("user", true);
      setTime();
    } catch (error) {
      console.log(error);
    }
  };

  // SetTimeOut para ejecutar cada cierto tiempo
  const setTime = () => {
    clearTimeout();
    setTimeout(() => {
      console.log("On Refresh Token ⚡⚡⚡");
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
  };
});
