import { App } from "vue";
import { SvgIcon } from "./Icon";


export function registerGlobComp(app: App) {
  app
    // @ts-ignore
    .use(SvgIcon);
}
