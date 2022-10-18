<script setup>
import { useUserStore } from "../stores/user-store";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();
const myForm = ref(null);
const $q = useQuasar();
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
  try {
    await userStore.onLogin(formData.value);
    router.push({ name: "home" }); // todo fue correcto lo mandamos a inicio
    formData.value.email = "";
    formData.value.password = "";
    myForm.value.resetValidation();
  } catch (error) {
    // console.log("ERROR CATCH", error);
    if (error.errors) {
      alertDialogBackend("Error", error.errors[0].msg);
    } else if (error.msg) {
      alertDialogBackend("Error", error.msg);
    } else {
      alertDialogBackend("Error");
    }
  }
};

const alertDialogBackend = (
  title = "Ups, algo no salio bien",
  message = "Error en el servidor"
) => {
  $q.dialog({
    title,
    message,
    persistent: true,
  });
};
</script>

<template>
  <!-- <p>{{ userStore.token }}</p> -->
  <!-- <button @click="ModificarToken">Modificar token</button> -->
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Login</h3>
      <q-form @submit.prevent="onSubmit" class="q-gutter-md" ref="myForm">
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
          lazy-rules
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
          lazy-rules
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
