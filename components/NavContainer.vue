<template>
  <div class="links">
    <NavCard
      v-for="(item, index) in data.listCategory"
      :key="'card' + index"
      :name="item.attributes.name"
      :primaryKey="item.primaryKey"
    />
  </div>
</template>

<script setup>
const { categoryId } = defineProps(["categoryId"]);
const query = gql`
  query {
    listCategory(
      filterBy: {
        hierarchyWithinSelf: { ofParent: { entityPrimaryKeyInSet: ${categoryId} } }
        entityLocaleEquals: en
      }
    ) {
      parentPrimaryKey
      primaryKey
      attributes {
        name
      }
    }
  }
`;

const { data } = await useAsyncQuery(query);
</script>

<style scoped>
.links {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
