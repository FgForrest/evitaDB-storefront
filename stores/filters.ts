import { defineStore } from "pinia";

export const useFiltersStore = defineStore({
  id: "filter-store",
  state: () => {
    return {
      filtersList: [] as number[],
      topFilterNames: [] as object[],
      urlId: '' as string,
      price: [] as number[],
      brands: [] as number[]
    }
  },
  actions: {
    setFilter(flter: number[]) {
      this.filtersList = flter;
    },
    setFilterNames(filterNames: object[]){
      this.topFilterNames = filterNames;
    },
    setUrlId(pageUrlId: string){
      this.urlId = pageUrlId;
    },
    setPrice(price: number[]){
      this.price = price;
    },
    setBrands(brands: number[]){
      this.brands = brands;
    }
  },
  getters: {
    getFiltersList: state => state.filtersList,
    getTopFilterNames: state => state.topFilterNames,
    getUrlId: state => state.urlId,
    getPrice: state => state.price,
    getBrands: state => state.brands
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
});
