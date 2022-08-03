import ExifReader from "exifreader";
import { useFiles } from "src/stores/files";
import { useStore } from "src/stores/store";
import useUtils from "src/composables/utils";
import useGPS from "src/composables/gps";
import axios from "axios";
import { watch, ref, computed } from "vue";
import { Notify } from "quasar";
import useCompressor from "src/composables/compressor.js";
import { buildings } from "src/api/buildings";

const fileStore = useFiles();
const store = useStore();
const { findNearbyObject } = useGPS();
const { notify, UUID, timeToMin } = useUtils();
const timeoutID = ref();
const timeRangeTimeoutID = ref();
const { compressFiles } = useCompressor();

const isInTimeRange = (baseTime, time) => {
  const minRange = timeToMin(baseTime) - store.timeRange;
  const maxRange = timeToMin(baseTime) + store.timeRange;

  const isInRange = minRange <= timeToMin(time) && timeToMin(time) <= maxRange;
  return isInRange;
};

watch(
  () => store.gpsRadius,
  (newValue, oldValue) => {
    if (timeoutID.value) {
      window.clearTimeout(timeoutID.value);
    }

    timeoutID.value = window.setTimeout(() => {
      const { findLocation } = useFileSystem();
      findLocation();
    }, 1000);
  }
);

watch(
  () => store.timeRange,
  (newValue, oldValue) => {
    if (timeRangeTimeoutID.value) {
      window.clearTimeout(timeRangeTimeoutID.value);
    }
    timeRangeTimeoutID.value = window.setTimeout(() => {
      const { findImagesInTimeRange } = useFileSystem();
      findImagesInTimeRange();
    }, 1000);
  }
);

export default function useFileSystem() {
  const openFiles = async () => {
    try {
      const options = {
        multiple: true,
        types: [
          {
            description: "Images",
            accept: {
              "image/*": [".jpeg", ".jpg"],
            },
          },
        ],
      };

      fileStore.isFilesLoading = true;
      fileStore.fileLoadingState = "Bilder werden geladen..";
      const fileHandles = await window.showOpenFilePicker(options);

      if (fileHandles.length) {
        fileStore.selectedFiles = fileHandles.length;
        await compressFiles(fileHandles);
        fileStore.isFilesLoading = false;
        return fileHandles;
      }
    } catch (err) {
      console.log("error", err);
      notify("Keine Bilder ausgewählt", "negative");
      return;
    }
  };

  // const getFiles = async (fileHandles) => {
  //   try {
  //     const uploadNotify = Notify.create({
  //       group: false, // required to be updatable
  //       timeout: 0, // we want to be in control when it gets dismissed
  //       spinner: true,
  //       message: "Bilder werden analysiert",
  //       caption: "0%",
  //     });

  //     fileStore.fileLoadingState =
  //       "Bilder werden analysiert, ne nach Anzahl kann dieser Prozess mehrere Minuten dauern..";
  //     const files = await Promise.all(
  //       fileHandles.map(async (fileHandle) => {
  //         const fileBlob = await fileHandle.getFile();
  //         const tags = await ExifReader.load(fileBlob, { expanded: true });
  //         const dateTime = tags?.exif?.DateTime?.value[0]?.split(" ") || false;
  //         const gps = tags.gps || false;

  //         const file = {
  //           fileBlob,
  //           dateTime: dateTime.length
  //             ? { date: dateTime[0], time: dateTime[1] }
  //             : false,
  //           url: URL.createObjectURL(fileBlob),
  //           id: UUID(),
  //           data: { gps },
  //         };

  //         fileStore.loadedFiles++;

  //         uploadNotify({
  //           caption: `${fileStore.uploadPercentage}%`,
  //         });
  //         return file;
  //       })
  //     );

  //     if (fileStore.uploadPercentage === 100) {
  //       uploadNotify({
  //         icon: "mdi-check", // we add an icon
  //         spinner: false, // we reset the spinner setting so the icon can be displayed
  //         message: "Analyse abgeschlossen",
  //         timeout: 2500, // we will timeout it in 2.5s
  //       });
  //     }

  //     fileStore.files = files;
  //     fileStore.isFilesLoading = false;
  //     findLocation(files);
  //   } catch (err) {
  //     console.error(err);
  //     notify(
  //       "Da ist leider etwas schief gelaufen, probiere es erneut oder kontaktiere A. Fritscher",
  //       "negative"
  //     );
  //   }
  // };

  const findLocation = async (files = fileStore.files) => {
    fileStore.fileLoadingState = "Passende Bauwerke werden gesucht..";

    for (const file of files) {
      if (!file.data.gps) {
        fileStore.createNewGroup(fileStore.unknownGroupName);
        file.data.related = fileStore.unknownGroupName;
        continue;
      }

      const building = findNearbyObject(file.data, buildings);

      if (building) {
        fileStore.createNewGroup(building.barcode);
        file.data.barcode = building.barcode;
        file.data.location = building.location;
        file.data.type = building.type;
        file.data.description = building.description;
        continue;
      } else {
        file.data.barcode = "";
        file.data.related = fileStore.unknownGroupName;
        file.data.location = "";
        file.data.type = "";
        file.data.description = "";
        continue;
      }
    }

    fileStore.fileLoadingState = "Fertig!";
    fileStore.deleteEmptyGroups();
    findImagesInTimeRange();
  };

  const findImagesInTimeRange = () => {
    for (const file of fileStore.files) {
      if (
        file.data.barcode ||
        file.data.related !== fileStore.unknownGroupName
      ) {
        continue;
      }

      const fileInTimeRange = fileStore.files.find((entry) => {
        if (!entry.data.barcode) return false;
        if (!entry.data.date) return false;
        if (entry.data.date !== file.data.date) return false;

        const inTimeRange = isInTimeRange(entry.data.time, file.data.time);

        return inTimeRange;
      });

      if (fileInTimeRange) {
        file.data.related = fileInTimeRange.data.barcode;
      } else if ((file.data.related = fileStore.unknownGroupName)) {
        continue;
      } else {
        file.data.related = fileStore.unknownGroupName;
      }
    }
  };

  return { openFiles, findLocation, findImagesInTimeRange };
}
