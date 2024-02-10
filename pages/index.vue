<template>
  <div>
    <p>Index</p>
    <div v-for="(item, index) in data.queryGroup.recordPage.data" :key="index">
      <p>{{ item.attributes.name }}</p>
      <ListSpecialItems :groupId="item.primaryKey" />
    </div>
  </div>
</template>

<script setup>
const { data } = await useAsyncGql("getGroups");
</script>

<style scoped></style>
