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
    "primeflex/primeflex.css",
  ],
  devtools: { enabled: true },
  modules: ["@nuxtjs/apollo", "nuxt-primevue", "@nuxt/image", "@nuxt3/graphql-codegen-module"],
  graphqlCodegen: {
    schema: ["https://demo.evitadb.io:5555/gql/evita"]
  },
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
  plugins: [
    '~/plugins/apollo-client.js'
  ],
});