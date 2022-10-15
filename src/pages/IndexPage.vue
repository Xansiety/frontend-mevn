<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";

const token = ref("");
const expiresIn = ref("");

const onLogin = async () => {
  try {
    const response = await api.post("/auth/login", {
      email: "ferando543@outlook.com",
      password: "!Abc123",
    });
    token.value = response.data.token;
    expiresIn.value = response.data.expiresIn;
    setTime();
  } catch (error) {
    console.log(error);
  }
};

// SetTimeOut para ejecutar cada cierto tiempo
const setTime = () => {
  clearTimeout();
  setTimeout(() => {
    refreshToken();
  }, expiresIn.value * 1000 - 6000); // 6 segundos antes de que expire el token
};

const refreshToken = async () => {
  try {
    const resp = await api.get("/auth/refresh");
    token.value = resp.data.token;
    expiresIn.value = resp.data.expiresIn;
    setTime();
  } catch (error) {
    console.log(error);
  }
};

refreshToken();

const crearLink = async () => {
  try {
    const resp = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      data: {
        longLink: "https://blog.logrocket.com/using-axios-set-request-headers/",
      },
    });
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <q-page padding>
    <q-btn @click="onLogin"> Ingresar </q-btn>
    {{ token }}
    {{ expiresIn }}
    <q-btn @click="crearLink"> Crear link </q-btn>
  </q-page>
</template>
