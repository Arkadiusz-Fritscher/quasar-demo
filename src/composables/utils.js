import { Notify } from "quasar";

export default function useUtils() {
  const notify = (message, type = "positive") => {
    Notify.create({
      message: `${message}`,
      progress: true,
      type,
      timeout: 2500,
      position: "bottom",
      actions: [
        {
          // label: "Reply",
          icon: "mdi-close",
          color: "white",
          handler: () => {
            /* ... */
          },
        },
      ],
    });
  };

  function UUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  function timeToMin(time) {
    if (!time) return time;

    const [h, m, s] = time.split(":");
    const timeInMin = Number(h) * 60 + Number(m);
    return timeInMin;
  }

  return { notify, UUID, timeToMin };
}
