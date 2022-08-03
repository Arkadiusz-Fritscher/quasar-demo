import { defineStore } from "pinia";

export const useFiles = defineStore("files", {
  state: () => ({
    isCarouselOpen: false,
    carouselImages: [],
    currentCarouselSlide: 1,

    selectedFiles: 0,
    files: [],
    groups: [],
    isFilesLoading: false,
    fileLoadingState: "",
    loadedFiles: 0,
    unknownGroupName: "Nicht Gruppierte Bilder",
  }),

  getters: {
    sortedGroups(state) {
      if (!state.groups.length) return [];
      return state.groups.sort((a, b) =>
        a.localeCompare(b, "de", { numeric: true })
      );
    },

    uploadPercentage(state) {
      return Math.round((state.loadedFiles / state.selectedFiles) * 100);
    },
  },

  actions: {
    createNewGroup(group) {
      if (this.groups.includes(group)) return;
      this.groups.push(group);
      return this.groups;
    },

    deleteEmptyGroups() {
      let notEmptyGroups = [];
      this.groups.forEach((group) => {
        const fileWithGroup = this.files.find(
          (file) => file.data.barcode === group || file.data.related === group
        );

        if (fileWithGroup) {
          notEmptyGroups.push(group);
        }
      });

      this.groups = notEmptyGroups;
    },
  },
});
