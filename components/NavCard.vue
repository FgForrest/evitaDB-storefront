<template>
  <div>
    <NuxtLink :to="'/offer/'+primaryKey+'/1'" rel="noopener noreferrer" class="p-button font-bold">{{ name }}</NuxtLink>
  </div>
</template>

<script lang="ts">
export default {
  props: ["name", "primaryKey"],
};
</script>

<style scoped></style>
