<template>
  <Carousel
    :value="data.queryProduct.recordPage.data"
    :numVisible="3"
    :numScroll="1"
    circular
  >
    <template #item="item">
      <div class="border-1 surface-border border-round m-2 p-3">
        <div class="mb-3">
          <div class="relative mx-auto">
            <img
              :src="`https://picsum.photos/250/150?random=${item.data.primaryKey}`"
              :alt="item.data.attributes.name"
              class="w-full border-round"
            />
            <Tag
              :value="item.data.attributes.brandCode"
              severity="success"
              class="absolute"
              style="left: 5px; top: 5px"
            />
          </div>
        </div>
        <div class="mb-3 font-medium">{{ item.data.attributes.name }}</div>
        <div class="flex justify-content-between align-items-center">
          <div class="mt-0 font-semibold text-xl">
            {{ item.data.priceForSale.priceWithTax }},-Kč
          </div>
          <span>
            <Button icon="pi pi-heart" severity="secondary" outlined></Button>
            <Button icon="pi pi-shopping-cart" class="ml-2"></Button>
          </span>
        </div>
      </div>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
const { groupId } = defineProps({
  groupId: {
    type: Number,
    required: true,
  },
});

const { data } = await useAsyncGql("getSpecialItems", { groupId });
//:autoplayInterval="3000"
</script>

<style scoped></style>
