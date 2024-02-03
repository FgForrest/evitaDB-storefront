<template>
  <p class="title">Brand</p>
  <Tree
    v-model:selectionKeys="selectedKey"
    :value="nodes()"
    selectionMode="checkbox"
    class="no-border"
  ></Tree>
</template>

<script setup lang="ts">
import { useGetBrandsQuery } from "../generated/operations";
const selectedKey = ref<any>(null);
const { categoryId } = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});

const { result } = await useGetBrandsQuery({
  categoryId: categoryId,
});

const nodes = () => {
  const brands: Object[] = [];
  const rawBrands =
    result.value?.queryProduct.extraResults.facetSummary?.brand
      ?.facetStatistics;
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
};
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
