import { defineStore } from 'pinia'

export const useFiltersStore = defineStore({
  id: 'filter-store',
  state: () => {
    return {
      filtersList: [] as Number[],
      topFilterNames: [] as object[],
    }
  },
  actions: {
    setFilter(flter: Number[]) {
      this.filtersList = flter;
    },
    setFilterNames(filterNames: object[]){
      this.topFilterNames = filterNames;
      console.log(this.topFilterNames);
    },
  },
  getters: {
    getFiltersList: state => state.filtersList,
    getTopFilterNames: state => state.topFilterNames,
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
})