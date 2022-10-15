<script setup>
import { useUserStore } from "../stores/user-store";
import { ref } from "vue";
import { storeToRefs } from "pinia";
const userStore = useUserStore();

const formData = ref({
  email: "ferando543@outlook.com",
  password: "!Abc123",
});

// para desestruturar y mantener reactividad
const { token } = storeToRefs(userStore);
const ModificarToken = () => {
  token.value = "Modificado";
};

const onSubmit = async () => {
  console.log(
    "Enviando el formulario",
    formData.value.email,
    formData.value.password
  );

  const resp = await userStore.onLogin(formData.value);

  console.log(resp);
};
</script>

<template>
  <!-- <h1>Login Page</h1> -->
  <!-- <p>{{ userStore.token }}</p> -->
  <!-- <button @click="ModificarToken">Modificar token</button> -->
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Login</h3>
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <q-input
          v-model="formData.email"
          type="text"
          label="Email"
          :rules="[
            (val) => (val && val.length > 3) || 'Ingrese su Email',
            (val) =>
              (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
              'Formato email incorrecto',
          ]"
        />
        <q-input
          v-model="formData.password"
          type="password"
          label="Contraseña"
          :rules="[
            (val) =>
              (val && val.length > 5) ||
              'Por favor escriba su contraseña minimo 6 caracteres',
          ]"
        />

        <div>
          <q-btn type="submit" label="Ingresar" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
