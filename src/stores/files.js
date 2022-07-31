import { defineStore } from "pinia";

export const useFiles = defineStore("files", {
  state: () => ({
    isCarouselOpen: false,
    carouselImages: [],
    currentCarouselSlide: 1,

    files: [],

    groups: [],
  }),

  getters: {
    sortedGroups(state) {
      if (!state.groups.length) return [];
      return state.groups.sort((a, b) =>
        a.localeCompare(b, "de", { numeric: true })
      );
    },
  },

  actions: {},
});
