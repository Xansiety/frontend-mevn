import { defineStore, storeToRefs } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";

export const useUrlStore = defineStore("url", () => {
  const userStore = useUserStore();
  const { token } = storeToRefs(userStore);

  const links = ref([]);

  const crearLink = async (longLink) => {
    try {
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
    }
  };

  const getAllLinks = async () => {
    console.log("Llamando a todos los links");
    try {
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
      console.error(error.response?.data || error);
    }
  };

  // Hace menos llamados a la base de datos (- $$$$)
  getAllLinks();
  return {
    crearLink,
    getAllLinks,
    links,
  };
});
