<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <q-btn
          color="green"
          :to="{ name: 'login' }"
          v-if="!userStore.token"
          class="q-mr-sm"
          >Login</q-btn
        >
        <q-btn color="dark" :to="{ name: 'register' }" v-if="!userStore.token"
          >Registro</q-btn
        >
        <q-btn
          color="dark q-mr-sm"
          :to="{ name: 'home' }"
          v-if="userStore.token"
          class="q-mr-sm"
          >Inicio</q-btn
        >
        <q-btn
          color="orange q-mr-sm"
          :to="{ name: 'protected' }"
          v-if="userStore.token"
          class="q-mr-sm"
          >Protected</q-btn
        >

        <q-btn color="red q-mr-sm" @click="logOut" v-if="userStore.token"
          >LogOut</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLinkVue
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useUserStore } from "../stores/user-store";
import EssentialLinkVue from "src/components/EssentialLink.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const userStore = useUserStore();

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const logOut = async () => {
  await userStore.logOut();
  router.push({ name: "login" });
};

const onLogin = async () => {
  await userStore.onLogin();
  router.push({ name: "home" });
};
const essentialLinks = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];
</script>
