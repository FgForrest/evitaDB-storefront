<template>
  <div>
    <NuxtLink
      :to="`/offer/${props.primaryKey}/1`"
      rel="noopener noreferrer"
      class="p-button font-bold"
      >{{ props.name }}</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  primaryKey: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped></style>
