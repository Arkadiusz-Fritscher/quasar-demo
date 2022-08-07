import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useFiles } from "./files";

export const useStore = defineStore("store", {
  state: () => ({
    buildingTypes: ["Armaturenschacht", "Kontrollschacht", "Schauloch"],
    buildings: [],
    meta: null,
    user: null,
    token: null,
    isFetchingBuildings: false,
    gpsRadius: 8, //Meter
    timeRange: 3, // Minuten
  }),

  getters: {
    isAuth(state) {
      if (state.user || state.token) {
        return true;
      } else {
        return false;
      }
    },
    canUserEdit(state) {
      return state.user?.role?.type === "editor";
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
            "filters[barcode][$contains]": `${barcode}`,
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

    prepSortedImagesForUpload() {
      const fileStore = useFiles();

      if (!fileStore.files.length) return;

      const filesToUpload = fileStore.files.filter((files) => files.upload);

      if (!filesToUpload.length) return;

      const groupedFiles = filesToUpload.reduce((group, item) => {
        const barcode = item.data.barcode || item.data.related;

        if (barcode === fileStore.unknownGroupName) return group;

        if (!group[barcode]) {
          group[barcode] = [];
        }

        group[barcode].push(item);
        return group;
      }, {});

      for (const [group, files] of Object.entries(groupedFiles)) {
        this.uploadImages(group, files);
      }
    },

    async uploadImages(barcode, files) {
      // TODO:add some upload feedback and set thumbnail if object hasn't one
      try {
        console.log("upload images...");
        const options = {
          params: {
            "filters[barcode][$eq]": `${barcode}`,
            fields: "barcode",
            populate: "thumbnail",
          },
        };

        const { data } = await api.get("/api/objects", options);
        if (!data.data.length) return;

        let hasThumbnail = data.data[0].thumbnail?.data ? true : false;
        const objectID = data.data[0].id;

        for (const file of files) {
          const formData = new FormData();

          formData.append("files", file.file, `${barcode}_${file.id}`);
          formData.append("refId", objectID);
          formData.append("ref", "api::object.object");
          formData.append("field", "images");
          formData.append(
            "fileInfo",
            `{"caption":"${barcode}","alternativeText":"${barcode}","name":"${barcode}_${file.id}"}`
          );

          const res = await api.post("/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          console.log("upload done ", res);

          if (!hasThumbnail) {
            hasThumbnail = true;
            await api.put(`api/objects/${objectID}`, {
              data: { thumbnail: res.data[0].id },
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
