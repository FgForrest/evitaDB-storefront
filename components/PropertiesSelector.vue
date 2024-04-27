<template>
  <p class="title">Properties</p>
  <Tree
    v-model:selectionKeys="selectedKeys"
    @change="update"
    :value="getNodes()"
    selectionMode="checkbox"
    class="w-full md:w-30rem no-border"
  ></Tree>
</template>

<script setup lang="ts">
import { ref } from "vue";

type Emits = {
  (event: "filter", value: Number[]): void;
};

const emit = defineEmits<Emits>();
const { selectedProps, data } = defineProps({
  selectedProps: {
    type: Array as () => Array<Number>,
    required: false,
  },
  data: {
    type: Array as () => Array<object>,
    required: true,
  },
});

const selectedKeys = ref<object>(getSelectedKeys());

function getNodes(): object[] {
  const properties: object[] = [];
  const rawProperties = data;
  if (rawProperties) {
    for (let i = 0; i < rawProperties.length; i++) {
      let property = {
        key: "ignore-" + i,
        label: rawProperties[i].groupEntity?.attributes?.name,
        data: rawProperties[i].groupEntity?.attributes?.code,
        children: new Array<object>(),
      };
      for (let j = 0; j < rawProperties[i].facetStatistics.length; j++) {
        property.children.push({
          key: rawProperties[i].facetStatistics[j].facetEntity?.primaryKey,
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
}

function getSelectedKeys(): object {
  let selected = {};
  for(const num of selectedProps){
    selected[`${num}`] = {
      checked: true,
      partialChecked: false
    }
  }
  return selected;
}

function update(): void {
  const checked: Number[] = [];
  for (const item in selectedKeys.value) {
    if (!item.includes("ignore-")) {
      checked.push(parseInt(item));
    }
  }
  emit("filter", checked);
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
