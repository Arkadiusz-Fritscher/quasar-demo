import { defineStore } from "pinia";

export const useSort = defineStore("sort", {
  state: () => ({
    files: [
      {
        id: 1,
        barcode: "N12",
        name: "file 1",
      },
      {
        id: 2,
        barcode: "N12",
        name: "file 2",
      },
      {
        id: 3,
        barcode: "N13",
        name: "file 3",
      },
      {
        id: 4,
        barcode: "N13",
        name: "file 4",
      },
      {
        id: 5,
        barcode: "N14",
        name: "file 5",
      },
      {
        id: 6,
        barcode: "N14",
        name: "file 6",
      },
    ],

    groups: {
      N12: [
        {
          id: 21,
          barcode: "N12",
          name: "file 1",
        },
        {
          id: 22,
          barcode: "N12",
          name: "file 2",
        },
        {
          id: 23,
          barcode: "N12",
          name: "file 3",
        },
      ],
      N13: [
        {
          id: 31,
          barcode: "N13",
          name: "file 1",
        },
        {
          id: 32,
          barcode: "N13",
          name: "file 2",
        },
        {
          id: 33,
          barcode: "N13",
          name: "file 3",
        },
      ],
      N14: [
        {
          id: 41,
          barcode: "N14",
          name: "file 1",
        },
        {
          id: 42,
          barcode: "N14",
          name: "file 2",
        },
        {
          id: 44,
          barcode: "N14",
          name: "file 3",
        },
      ],
      N15: [
        {
          id: 51,
          barcode: "N15",
          name: "file 1",
        },
        {
          id: 52,
          barcode: "N15",
          name: "file 2",
        },
        {
          id: 55,
          barcode: "N15",
          name: "file 3",
        },
      ],
      N16: [
        {
          id: 61,
          barcode: "N16",
          name: "file 1",
        },
        {
          id: 62,
          barcode: "N16",
          name: "file 2",
        },
        {
          id: 65,
          barcode: "N15",
          name: "file 3",
        },
      ],
    },
  }),

  getters: {},

  actions: {},
});
