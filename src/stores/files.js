import { defineStore } from "pinia";

export const useFiles = defineStore("files", {
  state: () => ({
    isCarouselOpen: false,
    carouselImages: [],
    currentCarouselSlide: 1,

    files: [
      {
        id: 1,
        barcode: "N123",
        name: "file 1",
        img: "https://images.unsplash.com/photo-1659257741009-4409f723b91e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      },
      {
        id: 2,
        barcode: "N234",
        name: "file 2",
        img: "https://images.unsplash.com/photo-1659259906927-eb207ff241c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      },
      {
        id: 3,
        barcode: "S004",
        name: "file 3",
        img: "https://images.unsplash.com/photo-1659203540352-802f6600176e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
      },
      {
        id: 4,
        barcode: "",
        related: "N123",
        name: "file 3",
        img: "https://images.unsplash.com/photo-1657299170950-87e5b0eaf77c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      },
    ],

    groups: [
      "Z1",
      "N123",
      "N234",
      "N345",
      "N4324",
      "N3242",
      "N4212",
      "N9934",
      "S004",
      "S423",
    ],
  }),

  getters: {
    sortedGroups(state) {
      return state.groups.sort((a, b) =>
        a.localeCompare(b, "de", { numeric: true })
      );
    },
  },

  actions: {},
});
