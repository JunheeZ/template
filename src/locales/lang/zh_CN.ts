import { genMessage } from "@/locales/helper";
import antdLocale from "ant-design-vue/es/locale/zh_CN";

const modules = import.meta.globEager("./zh-CN/**/*.ts");

export default {
  message: {
    // @ts-ignore
    ...genMessage(modules, "zh_CN"),
    antdLocale
  }
};
