<script setup>
import { useUrlStore } from "../stores/url-store";
import AddLink from "src/components/AddLink.vue";
import LinkCard from "src/components/LinkCard.vue";
const urlStore = useUrlStore();
</script>

<template>
  <q-page padding>
    <AddLink class="q-mb-md" />

    <template v-for="link in urlStore.links" :key="link._id">
      <LinkCard :link="link" />
    </template>

    <!-- <pre>{{ urlStore.links }}</pre> -->
  </q-page>
</template>
