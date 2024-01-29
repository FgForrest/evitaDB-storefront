<template>
  <div>
    <NavContainer :categoryId="parseInt(categoryId)" />
    <Splitter>
      <SplitterPanel :size="25" :minSize="10">
        <BrandSelector :category-id="parseInt(categoryId)" />
        <PropertiesSelector :category-id="parseInt(categoryId)" />
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
                <div
                  class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
                  :class="{ 'border-top-1 surface-border': index !== 0 }"
                >
                  <NuxtImg
                    :src="`https://picsum.photos/250/250?random=${index}`"
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
                        {{ item.attributes.name }}
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
                      :src="`https://picsum.photos/250/250?random=${index}`"
                      placeholder
                      class="w-9 shadow-2 border-round"
                    />
                    <div class="text-2xl font-bold">
                      {{ item.attributes.name }}
                    </div>
                  </div>
                  <div class="flex align-items-center justify-content-between">
                    <span class="text-2xl font-semibold"
                      >{{ item.priceForSale.priceWithTax }} EUR</span
                    >
                    <Button icon="pi pi-shopping-cart" rounded></Button>
                  </div>
                </div>
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
const layout = ref<any>("grid");

const categoryId = route.params.categoryId.toString();
const pageNumber = route.params.pageNumber.toString();

const queryPage = gql`
  query getProducts($categoryId: [Int!], $page: Int!) {
    queryProduct(
      filterBy: {
        hierarchyCategoriesWithin: {
          ofParent: { entityPrimaryKeyInSet: $categoryId }
        }
        entityLocaleEquals: en
        priceInPriceLists: ["basic"]
        priceInCurrency: EUR
      }
    ) {
      recordPage(number: $page, size: 50) {
        data {
          primaryKey
          attributes {
            name
            brandCode
          }
          categories {
            referencedEntity {
              attributes {
                name
              }
            }
          }
          priceForSale {
            priceWithoutTax
            priceWithTax
            taxRate
          }
        }
        lastPageNumber
      }
    }
  }
`;

type ListProduct = {
  queryProduct: {
    recordPage: {
      data: {
        primaryKey: number;
        attributes: {
          name: string;
          brandCode: string;
        };
        categories: {
          referencedEntity: {
            attributes: {
              name: string;
            };
          };
        }[];
        priceForSale: {
          priceWithoutTax: number;
          priceWithTax: number;
          taxRate: number;
        };
      }[];
      lastPageNumber: number;
    };
  };
};

const { data } = await useAsyncQuery<ListProduct>(queryPage, {
  categoryId: parseInt(categoryId),
  page: parseInt(pageNumber),
});
</script>

<style scoped></style>
