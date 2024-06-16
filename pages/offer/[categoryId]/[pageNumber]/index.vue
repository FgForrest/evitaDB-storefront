<template>
  <div>
    <NavContainer :categoryId="parseInt(categoryId)" />
    <Splitter>
      <SplitterPanel :size="25" :minSize="10">
        <div class="center">
          <div>
            <Bar ref="chart" :data="chartData" :options="chartOptions" />
            <div class="center">
              <Slider
                v-model="selectedPriceRange"
                :range="true"
                class="w-14rem"
                @change="updateChartData"
                @slideend="priceRangeChanged"
                :min="
                  parseInt(
                    data?.queryProduct?.extraResults?.priceHistogram?.min
                  )
                "
                :max="
                  parseInt(
                    data?.queryProduct?.extraResults?.priceHistogram?.max
                  )
                "
              />
            </div>
          </div>
        </div>
        <BrandSelector
          :category-id="parseInt(categoryId)"
          @filter-brands="filterBrands"
        />
        <PropertiesSelector
          :data="
            data?.queryProduct.extraResults.facetSummary?.parameterValues
              ? data?.queryProduct.extraResults.facetSummary?.parameterValues
              : []
          "
          :selectedProps="selectedProperties"
          :names="names"
          @filter="filterProperties"
        />
      </SplitterPanel>
      <SplitterPanel :size="75">
        <DataView
          :value="data?.queryProduct?.recordPage?.data"
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
      :last-page-number="
        data?.queryProduct?.recordPage?.lastPageNumber
          ? data?.queryProduct?.recordPage?.lastPageNumber
          : 0
      "
    />
  </div>
</template>

<script lang="ts" setup>
import type { GetProductsBrandsFilterQuery, GetProductsBrandsQuery, GetProductsFilterQuery } from "#gql";
import { type ChartData } from "chart.js";
import { storeToRefs } from "pinia";
import { Bar } from "vue-chartjs";

const route = useRoute();

const categoryId = route.params.categoryId.toString();
const pageNumber = route.params.pageNumber.toString();

const layout = ref<any>("grid");
const filtersStore = useFiltersStore();
const { setFilter, setFilterNames, setUrlId, setPrice, setBrands } =
  filtersStore;
const { getFiltersList, getTopFilterNames, getUrlId, getPrice, getBrands } =
  storeToRefs(filtersStore);
const GqlInstance = useGql();
const selectedProperties = ref<number[]>(getFiltersList.value);
const selectedBrands = ref<number[]>();
const names = ref<object[]>(getTopFilterNames.value);

if (getUrlId.value !== categoryId) {
  setFilter([]);
  setFilterNames([]);
  setBrands([]);
  setPrice([-1, -1]);
  setUrlId(categoryId);
}

const selectedPriceRange = ref<number[]>([
  getPrice.value[0] ? getPrice.value[0] : -1,
  getPrice.value[1] ? getPrice.value[1] : -1,
]);
const data = ref<GetProductsFilterQuery | GetProductsFilterQuery | null>(
  await getData()
);
const chart = ref<InstanceType<typeof Bar> | null>(null);
const histogramData = ref<HistogramType | null>(getHistogramData());

const chartData = ref<
  ChartData<"bar", (number | [number, number] | null)[], unknown>
>({
  labels: (histogramData?.value?.labels as string[]) || [],
  datasets: [
    {
      label: "Produkty",
      backgroundColor: getChartColors(),
      data:
        (histogramData?.value?.dataValues as (
          | number
          | [number, number]
          | null
        )[]) || [],
    },
  ],
});

const chartOptions = ref<any>({
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
});

async function priceRangeChanged(): Promise<void> {
  if (chart.value?.$data)
    chart.value.chart.data.datasets[0].backgroundColor = getChartColors();
  updateChart();
  setPrice(selectedPriceRange.value);
  data.value = await getData();
}

async function updateChartData(): Promise<void> {
  if (chart.value?.$data)
    chart.value.chart.data.datasets[0].backgroundColor = getChartColors();
  updateChart();
  setPrice(selectedPriceRange.value);
}

function updateChart() {
  if (chart.value) {
    chart?.value.chart.update("active");
    chart?.value.chart.render();
    chart?.value.chart.draw();
  }
}

function getChartColors(): Array<string> {
  const colors: string[] = [];
  if (histogramData?.value?.labels) {
    for (const item of histogramData?.value?.labels) {
      if (
        isInRange(
          parseInt(item),
          selectedPriceRange.value[0],
          selectedPriceRange.value[1]
        )
      ) {
        colors.push("#10b981");
      } else {
        colors.push("#A9A9A9");
      }
    }
  }
  return colors;
}

function isInRange(
  input: number,
  startRange: number,
  endRange: number
): boolean {
  if (input >= startRange && input <= endRange) {
    return true;
  } else {
    return false;
  }
}

async function filterProperties(
  selectedProps: number[],
  namesInput: object[]
): Promise<void> {
  setFilter(selectedProps);
  setFilterNames(namesInput);
  selectedProperties.value = selectedProps;
  names.value = namesInput;
  data.value = await getData();
  //selectedPriceRange.value = [data.value?.queryProduct.extraResults.priceHistogram?.min, data.value?.queryProduct.extraResults.priceHistogram?.max];
  //updateChart();
}

function getHistogramData(): HistogramType | null {
  const labels = [] as string[];
  const dataValues = [] as number[];

  if (data.value?.queryProduct.extraResults.priceHistogram) {
    for (const item of data.value.queryProduct.extraResults.priceHistogram
      .buckets) {
      labels.push(item.threshold);
      dataValues.push(item.occurrences);
    }
    return {
      labels,
      dataValues,
    };
  } else {
    return null;
  }
}

async function getData(): Promise<
  GetProductsFilterQuery | GetProductsFilterQuery | GetProductsBrandsQuery | GetProductsBrandsFilterQuery | null
> {
  if (
    selectedProperties &&
    categoryId &&
    pageNumber &&
    selectedProperties &&
    selectedPriceRange.value[0] === -1 &&
    selectedPriceRange.value[1] === -1
  ) {
    if (selectedProperties.value.length === 0 && selectedBrands.value?.length === 0) {
      const res = await GqlInstance("getProducts", {
        categoryId: parseInt(categoryId),
        page: parseInt(pageNumber),
        priceFilter: undefined
      });
      setPriceRange(parseInt(res.queryProduct.extraResults.priceHistogram?.min), parseInt(res.queryProduct.extraResults.priceHistogram?.max));
      return res;
    } else if(selectedProperties.value.length === 0 && selectedBrands.value?.length !== 0) {
      const res = await GqlInstance("getProductsBrands", {
        categoryId: parseInt(categoryId),
        page: parseInt(pageNumber),
        priceFilter: undefined,
        brandFilter: selectedBrands.value as number[]
      });
      setPriceRange(parseInt(res.queryProduct.extraResults.priceHistogram?.min), parseInt(res.queryProduct.extraResults.priceHistogram?.max));
      return res;
    } else if(selectedProperties.value.length !== 0 && selectedBrands.value?.length !== 0) {
      const selectedProps = selectedProperties.value.map(Number);
      const res = await GqlInstance("getProductsBrandsFilter", {
        categoryId: parseInt(categoryId),
        page: parseInt(pageNumber),
        selectedProps: selectedProps,
        priceFilter: undefined,
        brandFilter: selectedBrands.value as number[]
      });
      setPriceRange(parseInt(res.queryProduct.extraResults.priceHistogram?.min), parseInt(res.queryProduct.extraResults.priceHistogram?.max));
      return res;
    } else {
      const selectedProps = selectedProperties.value.map(Number);
      const res = await GqlInstance("getProductsFilter", {
        categoryId: parseInt(categoryId),
        page: parseInt(pageNumber),
        selectedProps: selectedProps,
        priceFilter: undefined
      });
      setPriceRange(parseInt(res.queryProduct.extraResults.priceHistogram?.min),  parseInt(res.queryProduct.extraResults.priceHistogram?.max));
      return res;
    }
  } else {
    if (selectedProperties.value.length === 0 && selectedBrands.value?.length === 0) {
      const res = await GqlInstance("getProducts", {
        categoryId: parseInt(categoryId),
        page: parseInt(pageNumber),
        priceFilter: selectedPriceRange.value.map((x) => x.toFixed(2))
      });
      return res;
    } else if(selectedProperties.value.length === 0 && selectedBrands.value?.length !== 0) {
      const res = await GqlInstance("getProductsBrands", {
        categoryId: parseInt(categoryId),
        page: parseInt(pageNumber),
        priceFilter: selectedPriceRange.value.map((x) => x.toFixed(2)),
        brandFilter: selectedBrands.value as number[]
      });
      return res;
    } else if(selectedProperties.value.length !== 0 && selectedBrands.value?.length !== 0) {
      const selectedProps = selectedProperties.value.map(Number);
      const res = await GqlInstance("getProductsBrandsFilter", {
        categoryId: parseInt(categoryId),
        page: parseInt(pageNumber),
        selectedProps: selectedProps,
        priceFilter: selectedPriceRange.value.map((x) => x.toFixed(2)),
        brandFilter: selectedBrands.value as number[]
      });
      return res;
    } else {
      const selectedProps = selectedProperties.value.map(Number);
      return await GqlInstance("getProductsFilter", {
        categoryId: parseInt(categoryId),
        page: parseInt(pageNumber),
        selectedProps: selectedProps,
        priceFilter: selectedPriceRange.value.map((x) => x.toFixed(2))
      });
    }
  }
}


function setPriceRange(startNum: number, endNum: number): void{
  selectedPriceRange.value = [startNum, endNum];
  setPrice([startNum, endNum]);
}

async function filterBrands(values: number[]): Promise<void> {
  selectedBrands.value = values;
  setBrands(values);
  data.value = await getData();
}
</script>

<style scoped>
.link {
  text-decoration: none;
  color: black;
}

.center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 76px;
}

.center:last-child {
  margin-top: 25px;
}
</style>
