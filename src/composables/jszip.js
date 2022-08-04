import JSZip from "jszip"; // https://stuk.github.io/jszip/documentation/examples.html

// const zip = new JSZip();

export default function useZip() {
  async function generateZip(files) {
    const zip = new JSZip();

    for (const file of files) {
      if (file.data.barcode) {
        zip.file(
          `${file.data.barcode}/${file.data.barcode}_${file.data.date.replace(
            /\D/g,
            "-"
          )}_${file.id}.jpg`,
          file.file,
          { base64: true }
        );
        continue;
      }

      if (file.data.related) {
        zip.file(
          `${file.data.related}/${file.data.related}_${file.data.date.replace(
            /\D/g,
            "-"
          )}_${file.id}.jpg`,
          file.file,
          { base64: true }
        );
        continue;
      }
    }

    return await zip.generateAsync({ type: "blob" });
  }

  return { generateZip };
}
