import { defineStore } from 'pinia'

export const useFiltersStore = defineStore({
  id: 'filter-store',
  state: () => {
    return {
      filtersList: [] as Number[],
      topFilterNames: [] as object[],
      urlId: '' as string,
    }
  },
  actions: {
    setFilter(flter: Number[]) {
      this.filtersList = flter;
    },
    setFilterNames(filterNames: object[]){
      this.topFilterNames = filterNames;
    },
    setUrlId(pageUrlId: string){
      this.urlId = pageUrlId;
    }
  },
  getters: {
    getFiltersList: state => state.filtersList,
    getTopFilterNames: state => state.topFilterNames,
    getUrlId: state => state.urlId,
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
})