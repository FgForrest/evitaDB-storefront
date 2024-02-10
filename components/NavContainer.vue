<template>
  <div class="links">
    <NavCard
      v-for="(item, index) in data?.listCategory.filter(
        (x) => x.parentPrimaryKey !== null
      )"
      :key="`card-${index}`"
      :name="item.attributes ? (item.attributes.name) : ''"
      :primaryKey="item.primaryKey"
      class="card"
    />
  </div>
</template>

<script lang="ts" setup>
const { categoryId } = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});

const {data} = await useAsyncGql("getSubcategory", {categoryId: categoryId})
</script>

<style scoped>
.links {
  display: flex;
  flex-flow: wrap;
}
.card {
  margin: 10px;
}
</style>
