import { saveAs } from "file-saver";

export default function saveFile(file) {
  const date = new Date()
    .toLocaleDateString("de-DE", {
      dateStyle: "short",
    })
    .replace(/\./g, "-");

  const fileName = `Sortierte-Bilder_${date}.zip`;
  saveAs(file, fileName);
  return;
}
