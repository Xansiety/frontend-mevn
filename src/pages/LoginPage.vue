<script setup>
import { useUserStore } from "../stores/user-store";
import { ref } from "vue";
import { storeToRefs } from "pinia";
const userStore = useUserStore();

// para desestruturar y mantener reactividad
const { token } = storeToRefs(userStore);
const ModificarToken = () => {
  token.value = "Modificado";
};
</script>

<template>
  <h1>Login Page</h1>
  <!-- <p>{{ userStore.token }}</p> -->

  <!-- <button @click="ModificarToken">Modificar token</button> -->
</template>

<style lang="scss" scoped></style>
