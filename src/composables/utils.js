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

  return { notify };
}
