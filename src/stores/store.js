import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useStore = defineStore("store", {
  state: () => ({
    buildingTypes: ["Armaturenschacht", "Kontrollschacht", "Schauloch"],
    buildings: [],
    meta: null,
    user: null,
    token: null,
    isFetchingBuildings: false,
  }),

  getters: {
    isAuth(state) {
      if (state.user || state.token) {
        return true;
      } else {
        return false;
      }
    },
  },

  actions: {
    async fetchMoreBuildings() {
      if (
        this.meta &&
        !this.isFetchingBuildings &&
        this.buildings.length < this.meta.pagination.total
      ) {
        try {
          this.isFetchingBuildings = true;

          const options = {
            params: {
              populate: "thumbnail",
              "pagination[limit]": `${
                this.buildings.length + this.meta.pagination.limit <=
                this.meta.pagination.total
                  ? this.meta.pagination.limit
                  : this.meta.pagination.limit - this.buildings.length
              }`,
              "pagination[start]": `${
                this.meta.pagination.limit + this.meta.pagination.start
              }`,
            },
          };

          const { data } = await api.get("/api/objects", options);

          this.buildings.push(...data.data);
          this.meta = data.meta;

          console.log("fetch more...", this.meta);

          this.isFetchingBuildings = false;
          return data;
        } catch (err) {
          console.log(err.message);
        }
      } else {
        return;
      }
    },

    async initialBuildingFetch() {
      if (!this.meta && !this.isFetchingBuildings) {
        try {
          this.isFetchingBuildings = true;

          const { data } = await api.get("/api/objects", {
            params: {
              populate: "thumbnail",
              "pagination[limit]": "40",
              "pagination[start]": "0",
            },
          });

          this.buildings = data.data;
          this.meta = data.meta;
          this.isFetchingBuildings = false;
          return data;
        } catch (err) {
          console.log(err.message);
        }
      } else {
        this.fetchMoreBuildings();
      }
    },

    async findBuilding(barcode) {
      try {
        const options = {
          params: {
            "filters[barcode][$containsi]": `${barcode}`,
            fields: "barcode",
            "pagination[pageSize]": "5",
          },
        };
        const { data } = await api.get("/api/objects", options);

        return data.data;
      } catch (err) {
        console.log(err.message);
      }
    },
  },
});
