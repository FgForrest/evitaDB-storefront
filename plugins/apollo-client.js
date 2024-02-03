import { ApolloClient, InMemoryCache } from "@apollo/client/core"
import { DefaultApolloClient } from "@vue/apollo-composable"

export default defineNuxtPlugin((nuxtApp) => {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    uri: 'https://demo.evitadb.io:5555/gql/evita'
    // configuration //
  })
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})