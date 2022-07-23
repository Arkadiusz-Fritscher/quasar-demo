import { Cookies } from "quasar";

const defaultCookieName = "strapi_jwt";

export default function useCookies() {
  const read = (name = defaultCookieName) => {
    const value = Cookies.get(name);
    return value;
  };

  const write = (name = defaultCookieName, value) => {
    Cookies.set(name, value);
  };

  return { read, write };
}
