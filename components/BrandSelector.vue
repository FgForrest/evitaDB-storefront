<template>
  <p class="title">Brand</p>
  <Tree
    v-model:selectionKeys="selectedKeys"
    :value="getNodes()"
    @change="update"
    selectionMode="checkbox"
    class="no-border"
  ></Tree>
</template>

<script setup lang="ts">
type Emits = {
  (event: "filterBrands", value: number[]): Promise<void>;
};

const emit = defineEmits<Emits>();

const { categoryId } = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});

const { data } = await useAsyncGql("getBrands", { categoryId: categoryId });
const selectedKeys = ref<object>();

function getNodes(): object[] {
  const brands: object[] = [];
  const rawBrands =
    data.value?.queryProduct.extraResults.facetSummary?.brand?.facetStatistics;
  if (rawBrands) {
    for (let i = 0; i < rawBrands.length; i++) {
      brands.push({
        key: rawBrands[i].facetEntity?.primaryKey,
        label: rawBrands[i].facetEntity?.attributes?.name,
        data: rawBrands[i].facetEntity?.attributes?.name,
      });
    }
  }
  return brands;
}

function update(): void {
  const brands: number[] = [];
  for (const id in selectedKeys.value) {
    brands.push(parseInt(id));
  }
  emit("filterBrands", brands);
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
