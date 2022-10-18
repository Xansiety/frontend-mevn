<script setup>
import { ref } from "vue";
import { useUrlStore } from "../stores/url-store";
import { useNotify } from "../composables/useNotify";
const urlStore = useUrlStore();
const { crearLink } = urlStore;
const { showNotify } = useNotify();

// Data
const myForm = ref(null);
const link = ref("");
const loading = ref(false);

const handleAddLink = async () => {
  // :rules="[(val) => (val && val.trim() !== '') || 'Escribe algo por favor']"
  // console.log("Enviando información", link.value);
  loading.value = true;
  try {
    await crearLink(link.value);
    showNotify("Link agregado correctamente", "green");
    link.value = "";
    myForm.value.resetValidation();
  } catch (error) {
    console.log("cath", error);

    if (error.errors) {
      return error.errors?.forEach((item) => {
        showNotify(item.msg);
      });
    } else if (error.msg) {
      return showNotify(error.msg);
    }
    showNotify(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-form @submit.prevent="handleAddLink" class="q-gutter-md" ref="myForm">
    <q-input
      v-model.trim="link"
      type="text"
      label="Ingrese URL"
      :rules="[(val) => (val && val.trim() !== '') || 'Escribe algo por favor']"
      lazy-rules
    />

    <div>
      <q-btn
        class="q-mt-sm full-width"
        label="Agregar"
        type="submit"
        color="primary"
        :loading="loading"
      />
    </div>
  </q-form>
</template>

<style lang="scss" scoped></style>
