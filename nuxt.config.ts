// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  primevue: {
    options: {
      ripple: true,
    },
    components: {
      include: "*",
    },
  },
  css: [
    "primevue/resources/themes/lara-light-teal/theme.css",
    "primeicons/primeicons.css",
  ],
  devtools: { enabled: true },
  modules: ["@nuxtjs/apollo", "nuxt-primevue"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://demo.evitadb.io:5555/gql/evita",
      },
    },
  },
  alias: {
    "@": resolve(__dirname, "/"),
  },
});
