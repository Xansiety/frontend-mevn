<script setup>
import { useUrlStore } from "../stores/url-store";
import { useNotify } from "../composables/useNotify";
import { useQuasar } from "quasar";

const urlStore = useUrlStore();
const { showNotify } = useNotify();
const $q = useQuasar();

defineProps({
  link: Object,
});

const deleteLink = (_id) => {
  console.log("Id a borrar", _id);
  try {
    $q.dialog({
      title: "Cuidad",
      message: "¿Estas seguro de descativar el elemento?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        console.log(">>>> OK");
        await urlStore.removeLink(_id);
        showNotify("Link removido correctamente", "green");
      })
      .onCancel(() => {
        console.log(">>>> Cancel");
      });
  } catch (error) {
    console.log(error);
    if (error.errors) {
      return error.errors?.forEach((item) => {
        showNotify(item.msg);
      });
    } else if (error.msg) {
      return showNotify(error.msg);
    }
    showNotify(error);
  }
};

const editLink = (link) => {
  $q.dialog({
    title: "Actualizar URL",
    message: "Escribe tu nuevo enlace",
    prompt: {
      model: `${link.longLink}`,
      type: "text", // optional
    },
    cancel: true,
    persistent: true,
  })
    .onOk(async (data) => {
      // con esta opcion reemplazamos
      const newLink = { ...link, longLink: data };
      // console.log(">>>> OK, received", newLink);
      try {
        await urlStore.updateLink(newLink);
        showNotify("Link actualizado correctamente", "green");
      } catch (error) {
        console.log(error);
        if (error.errors) {
          return error.errors?.forEach((item) => {
            showNotify(item.msg);
          });
        } else if (error.msg) {
          return showNotify(error.msg);
        }
        showNotify(error);
      }
    })
    .onCancel(() => {
      console.log(">>>> Cancel");
    });
};

const copyLink = async (nanoLink) => {
  try {
    const path = `http://localhost:9000/${nanoLink}`;
    await navigator.clipboard.writeText(path);
    showNotify("Copiado en el portapapeles", "green");
  } catch (error) {
    console.log(error);
    showNotify(error);
  }
};
</script>

<template>
  <q-card class="my-card q-mb-md">
    <q-card-section>
      <div class="text-overline">{{ link.nanoLink }}</div>
      {{ link }}
    </q-card-section>
    <q-separator></q-separator>

    <q-card-actions>
      <q-btn
        flat
        round
        icon="mdi-trash-can-outline"
        color="negative"
        @click="deleteLink(link._id)"
      ></q-btn>
      <q-btn
        flat
        round
        icon="mdi-pencil-outline"
        color="primary"
        @click="editLink(link)"
      ></q-btn>
      <q-btn flat color="positive" @click="copyLink(link.nanoLink)">
        Copy
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<style lang="scss" scoped></style>
