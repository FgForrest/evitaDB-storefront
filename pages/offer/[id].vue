<template>
  <div>
    <NavContainer :categoryId="categoryId" />
    <div>
      <DataView
        :value="data.listProduct"
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
                <img
                  class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                  src="~/assets/no-image.svg"
                  :alt="item.attributes.name"
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
                    <span class="text-2xl font-semibold"
                      >{{ item.priceForSale.priceWithTax }}</span
                    >
                    <Button
                      icon="pi pi-shopping-cart"
                      rounded
                    ></Button>
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
                  <img
                    class="w-9 shadow-2 border-round"
                    src="~/assets/no-image.svg"
                    :alt="item.attributes.name"
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
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const layout = ref<any>("grid");

const categoryId = route.params.id;

const query = gql`
  query {
    listProduct(
      filterBy: {
        hierarchyCategoriesWithinRoot: {
          having: { entityPrimaryKeyInSet: ${categoryId} }
        }
        entityLocaleEquals: en,
        priceInPriceLists: [
        "basic"
      ],
        priceInCurrency: EUR
      }
    ) {
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
      },
      priceForSale {
          priceWithoutTax
          priceWithTax
          taxRate
        }
    }
  }
`;

type ListProduct = {
  listProduct: {
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
};

const { data } = await useAsyncQuery<ListProduct>(query);
</script>

<style scoped></style>
