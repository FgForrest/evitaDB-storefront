<template>
  <div>
    <Card>
      <template #content>
        <div class="conatiner">
          <Galleria
            :value="getImages()"
            :responsiveOptions="responsiveOptions"
            :numVisible="5"
            containerStyle="max-width: 640px"
          >
            <template #item="slotProps">
              <img
                :src="slotProps.item.itemImageSrc"
                :alt="slotProps.item.alt"
                style="width: 100%"
              />
            </template>
            <template #thumbnail="slotProps">
              <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
            </template>
          </Galleria>
          <div>
            <h2>{{ data.getProduct.attributes.name }}</h2>
            <p>{{ data.getProduct.attributes.descriptionShort }}</p>
            <p>{{ data.getProduct.attributes.description }}</p>
          </div>
        </div>
      </template>
    </Card>
    <div>
      <DataTable :value="getProperties()" stripedRows tableStyle="min-width: 50rem">
        <Column field="name" header="Název"></Column>
        <Column field="value" header="Hodnota"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const productId = route.params.id.toString();

const { data } = await useAsyncGql("getProduct", { productId: productId });

const responsiveOptions = ref([
  {
    breakpoint: "1300px",
    numVisible: 4,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
  },
]);

function getImages(): object[] {
  const data: object[] = [];
  for (let i = 1; i <= 10; i++) {
    data.push({
      itemImageSrc: `https://picsum.photos/seed/${i}/300/200`,
      thumbnailImageSrc: `https://picsum.photos/seed/${i}/70/70`,
      alt: `Random ${i}`,
      title: `Random ${i}`,
    });
  }
  return data;
}

function getProperties(): object[] {
  const result: object[] = [];
  for (const prop in data.value.getProduct.attributes) {
    result.push({ name: prop, value: data.value.getProduct.attributes[prop] });
  }
  return result;
}
</script>

<style scoped>
.conatiner {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
