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
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async () => {
  try {
    const resp = await api.get("/auth/refresh");
    token.value = resp.data.token;
    expiresIn.value = resp.data.expiresIn;
  } catch (error) {
    console.log(error);
  }
};
refreshToken();
</script>

<template>
  <q-page padding>
    <q-btn @click="onLogin"> Ingresar </q-btn>
    {{ token }}
    {{ expiresIn }}
  </q-page>
</template>
