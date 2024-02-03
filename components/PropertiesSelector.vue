<template>
  <p class="title">Properties</p>
  <Tree
    :value="nodes()"
    selectionMode="checkbox"
    class="w-full md:w-30rem no-border"
  ></Tree>
</template>

<script setup lang="ts">
import { useGetParametrsQuery } from "~/generated/operations";

const { categoryId } = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});

const { result: data } = useGetParametrsQuery({
  categoryId: categoryId,
});

const nodes = () => {
  const properties: Object[] = [];
  const rawProperties =
    data.value?.queryProduct.extraResults.facetSummary?.parameterValues;
  if (rawProperties) {
    for (let i = 0; i < rawProperties.length; i++) {
      let property = {
        key: i,
        label: rawProperties[i].groupEntity?.attributes?.name,
        data: rawProperties[i].groupEntity?.attributes?.name,
        children: new Array<Object>(),
      };
      for (let j = 0; j < rawProperties[i].facetStatistics.length; j++) {
        property.children.push({
          key: i + "-" + j,
          label:
            rawProperties[i].facetStatistics[j].facetEntity?.attributes?.name,
          data: rawProperties[i].facetStatistics[j].facetEntity?.attributes
            ?.name,
        });
      }
      properties.push(property);
    }
  }
  return properties;
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
