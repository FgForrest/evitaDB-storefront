<template>
  <div>
    <NavContainer :categoryId="parseInt(categoryId)" />
    <Splitter>
      <SplitterPanel :size="25" :minSize="10">
        <BrandSelector :category-id="parseInt(categoryId)" />
        <PropertiesSelector
          :data="data.queryProduct.extraResults.facetSummary?.parameterValues"
          :selectedProps="selectedProperties"
          @filter="filterProperties"
        />
      </SplitterPanel>
      <SplitterPanel :size="75">
        <DataView
          :value="data.queryProduct.recordPage.data"
          :layout="layout"
          :data-key="'primaryKey'"
        >
          <template #header>
            <div class="flex justify-content-end">
              <DataViewLayoutOptions v-model="layout" />
            </div>
          </template>

          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, index) in slotProps.items"
                :key="index"
                class="col-12"
              >
                <NuxtLink :to="`/detail/${item.primaryKey}`" class="link">
                  <div
                    class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
                    :class="{ 'border-top-1 surface-border': index !== 0 }"
                  >
                    <NuxtImg
                      :src="`https://picsum.photos/250/250?random=${item.primaryKey}`"
                      placeholder
                      class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                    />
                    <div
                      class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
                    >
                      <div
                        class="flex flex-column align-items-center sm:align-items-start gap-3"
                      >
                        <div class="text-2xl font-bold text-900">
                          <p>{{ item.attributes.name }}</p>
                        </div>
                        <div class="flex align-items-center gap-3">
                          <span class="flex align-items-center gap-2">
                            <i class="pi pi-tag"></i>
                            <span class="font-semibold">{{
                              item.attributes.brandCode
                            }}</span>
                          </span>
                        </div>
                      </div>
                      <div
                        class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
                      >
                        <span class="text-2xl font-semibold">{{
                          item.priceForSale.priceWithTax
                        }}</span>
                        <Button icon="pi pi-shopping-cart" rounded></Button>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, index) in slotProps.items"
                :key="index"
                class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2"
              >
                <NuxtLink :to="`/detail/${item.primaryKey}`" class="link">
                  <div
                    class="p-4 border-1 surface-border surface-card border-round"
                  >
                    <div
                      class="flex flex-wrap align-items-center justify-content-between gap-2"
                    >
                      <div class="flex align-items-center gap-2">
                        <i class="pi pi-tag"></i>
                        <span class="font-semibold">{{
                          item.attributes.brandCode
                        }}</span>
                      </div>
                    </div>
                    <div class="flex flex-column align-items-center gap-3 py-5">
                      <NuxtImg
                        :src="`https://picsum.photos/250/250?random=${item.primaryKey}`"
                        placeholder
                      />
                      <div class="w-9 shadow-2 border-round"></div>
                      <div class="text-2xl font-bold">
                        <p>{{ item.attributes.name }}</p>
                      </div>
                    </div>
                    <div
                      class="flex align-items-center justify-content-between"
                    >
                      <span class="text-2xl font-semibold"
                        >{{ item.priceForSale.priceWithTax }} EUR</span
                      >
                      <Button icon="pi pi-shopping-cart" rounded></Button>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </template>
        </DataView>
      </SplitterPanel>
    </Splitter>
    <PageCounter
      :categoryId="parseInt(categoryId)"
      :page="parseInt(pageNumber)"
      :last-page-number="data.queryProduct.recordPage.lastPageNumber"
    />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const categoryId = route.params.categoryId.toString();
const pageNumber = route.params.pageNumber.toString();

const layout = ref<any>("grid");
const selectedProperties = ref<Number[]>([]);
const GqlInstance = useGql();
const data = ref<object>(await getData());

async function filterProperties(selectedProps) {
  selectedProperties.value = selectedProps;
  data.value = await getData();
}

async function getData() {
  if (selectedProperties.value.length === 0) {
    return await GqlInstance("getProducts", {
      categoryId: parseInt(categoryId),
      page: parseInt(pageNumber),
    });
  } else {
    return await GqlInstance("getProductsFilter", {
      categoryId: parseInt(categoryId),
      page: parseInt(pageNumber),
      selectedProps: selectedProperties.value,
    });
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
  color: black;
}
</style>
