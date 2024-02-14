<template>
  <div>
    <Card
      v-for="(item, index) in data.queryGroup.recordPage.data"
      :key="item.primaryKey"
      class="border"
    >
      <template #title>{{ item.attributes.name }}</template>
      <template #content>
        <ListSpecialItems :groupId="item.primaryKey" />
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useAsyncGql("getGroups");
</script>

<style scoped>
.border {
  margin-top: 25px;
}
</style>
