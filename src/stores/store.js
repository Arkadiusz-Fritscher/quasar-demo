import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    buildingTypes: ["Armaturenschacht", "Kontrollschacht", "Schauloch"],
    buildings: [],
    meta: {},
    user: null,
    token: null,
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    increment() {
      this.counter++;
    },
  },
});
