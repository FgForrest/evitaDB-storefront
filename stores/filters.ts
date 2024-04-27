import { defineStore } from 'pinia'

export const useFiltersStore = defineStore({
  id: 'filter-store',
  state: () => {
    return {
      filtersList: [] as Number[],
    }
  },
  actions: {
    setFilter(flter: Number[]){
        console.log(flter);
        this.filtersList = flter;
    }
  },
  getters: {
    getFiltersList: state => state.filtersList,
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
})