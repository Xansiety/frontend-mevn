<script setup>
import { useUrlStore } from "../stores/url-store";
import AddLink from "src/components/AddLink.vue";
const urlStore = useUrlStore();
</script>

<template>
  <q-page padding>
    <AddLink />

    <pre>{{ urlStore.links }}</pre>
  </q-page>
</template>
