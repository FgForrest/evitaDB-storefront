// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";

export default defineNuxtConfig({
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
    },
  },
  css: [
    "primevue/resources/themes/lara-light-green/theme.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.css"
  ],
  devtools: { enabled: true },
  modules: ["nuxt-graphql-client", "nuxt-primevue", "@nuxt/image", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  "graphql-client": {
    codegen: {
      avoidOptionals: true,
    },
  },
  runtimeConfig: {
    public: {
      GQL_HOST: "https://demo.evitadb.io:5555/gql/evita", // overwritten by process.env.GQL_HOST
    },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  image: {
    dir: "assets/images",
  },
});
