import Compressor from "compressorjs";
import ExifReader from "exifreader";
import useUtils from "src/composables/utils";
// import { set, entries } from "idb-keyval";
import { useFiles } from "src/stores/files";
import useFileSystem from "src/composables/fileSystem";
import { Notify } from "quasar";

const { UUID } = useUtils();
const fileStore = useFiles();

export default function useCompressor() {
  const compressFiles = async (fileHandles) => {
    const notify = Notify.create({
      group: false, // required to be updatable
      timeout: 0, // we want to be in control when it gets dismissed
      spinner: true,
      message: "Bilder werden analysiert",
      caption: "0%",
    });

    const compressedFiles = fileHandles.map(async (fileHandle, i) => {
      return new Promise(async (resolve, reject) => {
        const file = await fileHandle.getFile();
        const tags = await ExifReader.load(file, { expanded: true });
        const dateTime = tags?.exif?.DateTime?.value[0]?.split(" ") || false;
        const gps = tags.gps || false;
        const data = { related: "" };
        const id = UUID();

        if (dateTime) {
          const localDate = new Date(
            dateTime[0].replace(/\D/g, "-")
          ).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          });

          const [hh, mm, ss] = dateTime[1].split(":");

          data.date = localDate;
          data.time = `${hh}:${mm}`;
        }

        if (gps) {
          data.gps = gps;
        }

        new Compressor(file, {
          quality: 0.8,
          maxWidth: 1920,
          maxHeight: 1920,

          success(result) {
            resolve({
              id,
              file: result,
              data,
              name: file.name,
              url: URL.createObjectURL(result),
            });

            fileStore.loadedFiles++;
            notify({
              caption: `${fileStore.uploadPercentage}%`,
            });

            if (fileStore.uploadPercentage === 100) {
              notify({
                icon: "mdi-check", // we add an icon
                type: "positive",
                spinner: false, // we reset the spinner setting so the icon can be displayed
                message: "Bilder erfolgreich geladen",
                timeout: 2500, // we will timeout it in 2.5s
              });
            }
          },
          error(err) {
            console.log(err.message);
            reject(err.message);
          },
        });
      });
    });

    Promise.all(compressedFiles).then(async (files) => {
      files.forEach((file) => {
        fileStore.files.push(file);
      });
      fileStore.isFilesLoading = false;
      const { findLocation } = useFileSystem();
      findLocation();
    });
  };

  return { compressFiles };
}
