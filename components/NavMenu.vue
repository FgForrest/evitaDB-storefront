<template>
  <ul>
    <li>
      <NuxtLink to="/">Home</NuxtLink>
    </li>
    <li
      v-for="(item, index) in data.listCategory.filter(
        (x) => !x.parentPrimaryKey
      )"
      :key="index"
    >
      <NuxtLink :to="`/offer/${item.primaryKey}/1`">
        {{ item.attributes.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
const query = gql`
  query {
    listCategory(filterBy: { entityLocaleEquals: en }) {
      primaryKey
      parentPrimaryKey
      attributes {
        name
      }
    }
  }
`;
const { data } = await useAsyncQuery(query);
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-left: 0px;
  padding-bottom: 16px;
  padding-top: 0px;
}
ul li a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
</style>
