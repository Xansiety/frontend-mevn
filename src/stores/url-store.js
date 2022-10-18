import { defineStore, storeToRefs } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";
import { useQuasar } from "quasar";

export const useUrlStore = defineStore("url", () => {
  const userStore = useUserStore();
  const $q = useQuasar();
  const { token } = storeToRefs(userStore);

  const links = ref([]);

  const crearLink = async (longLink) => {
    try {
      $q.loading.show();
      const resp = await api({
        method: "POST",
        url: "/links",
        headers: { Authorization: `Bearer ${token.value}` },
        data: { longLink },
      });
      // console.log(resp.data);
      links.value.push(resp.data.link);
    } catch (error) {
      // console.error(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  const getAllLinks = async () => {
    // console.log("Llamando a todos los links");
    try {
      $q.loading.show();
      const resp = await api({
        method: "GET",
        url: "/links",
        headers: { Authorization: `Bearer ${token.value}` },
      });
      // Map devuleve la misma cantidad de elementos
      // aun si se devuelven menos propiedades
      // links.value = resp.data.documents.map((item) => {
      //   return {
      //     longLink: item.longLink,
      //     nanoLink: item.nanoLink,
      //   };
      // });
      // links.value = resp.data.documents.map((item) => item);

      // Filter devuleve la misma cantidad o menos
      // links.value = resp.data.documents.filter((item) => item);

      // Forma "Spread Operator", no reemplaza los elementos
      // Los expande
      links.value = [...resp.data.documents];
      // console.log(links.value);
    } catch (error) {
      // console.error(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };
  // Hace menos llamados a la base de datos (- $$$$)
  getAllLinks();

  const removeLink = async (_id) => {
    try {
      $q.loading.show();
      await api({
        method: "DELETE",
        url: `/links/${_id}`,
        headers: { Authorization: `Bearer ${token.value}` },
      });

      links.value = links.value.filter((links) => links._id !== _id);
    } catch (error) {
      // console.error(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  const updateLink = async (newLink) => {
    try {
      $q.loading.show();
      await api({
        method: "PATCH",
        url: `/links/${newLink._id}`,
        headers: { Authorization: `Bearer ${token.value}` },
        data: { longLink: newLink.longLink },
      });

      // actualizar de forma logica
      links.value = links.value.map((item) =>
        item._id === newLink._id ? newLink : item
      );
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  return {
    crearLink,
    getAllLinks,
    links,
    removeLink,
    updateLink,
  };
});
