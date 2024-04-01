<template>
  <p class="title">Brand</p>
  <Tree :value="getNodes()" selectionMode="checkbox" class="no-border"></Tree>
</template>

<script setup lang="ts">
const { categoryId } = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});

const { data } = await useAsyncGql("getBrands", { categoryId: categoryId });

function getNodes(): object[] {
  const brands: object[] = [];
  const rawBrands =
    data.value?.queryProduct.extraResults.facetSummary?.brand?.facetStatistics;
  if (rawBrands) {
    for (let i = 0; i < rawBrands.length; i++) {
      brands.push({
        key: i,
        label: rawBrands[i].facetEntity?.attributes?.name,
        data: rawBrands[i].facetEntity?.attributes?.name,
      });
    }
  }
  return brands;
}
</script>

<style scoped>
.no-border {
  border: 0px solid transparent;
}
.title {
  font-weight: bold;
  text-align: center;
}
</style>
