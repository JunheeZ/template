import { genMessage } from "../helper";
import antdLocale from "ant-design-vue/es/locale/en_US";

const modules = import.meta.globEager("./en/**/*.ts");

export default {
  message: {
    // @ts-ignore
    ...genMessage(modules, "en"),
    antdLocale
  },
  dateLocale: null,
  dateLocaleName: "en"
};
