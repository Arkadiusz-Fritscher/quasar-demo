import { reactive } from "vue";

export default function useStore() {
  const store = reactive({
    buildingTypes: ["Armaturenschacht", "Kontrollschacht", "Schauloch"],
    buildings: [
      {
        barcode: "N1",
        location: "Musteradresse",
      },
      {
        barcode: "N12",
        location: "Musteradresse",
      },
      {
        barcode: "N123",
        location: "Musteradresse",
      },
    ],
  });

  return { store };
}
