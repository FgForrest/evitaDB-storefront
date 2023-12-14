<template>
  <div>
    <NuxtLink :to="'/offer/'+primaryKey" rel="noopener noreferrer" class="p-button font-bold">{{ name }}</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ["name", "primaryKey"],
};
</script>

<style scoped></style>
