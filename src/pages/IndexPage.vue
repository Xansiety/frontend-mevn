<script setup>
import { api } from "src/boot/axios";
import { useUserStore } from "../stores/user-store";
import { storeToRefs } from "pinia";
const userStore = useUserStore();

const { token, expiresIn } = storeToRefs(userStore);
const { onLogin, refreshToken, logOut } = userStore;

// refreshToken();

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
    <q-btn @click="crearLink"> Crear link </q-btn>
    {{ token }} -----
    {{ expiresIn }}
  </q-page>
</template>
