import type { RouteLocationNormalized, RouteRecordNormalized } from "vue-router";
import type { App } from "vue";
import { unref } from "vue";
import { isObject } from "@/utils/is";

import { useGlobSetting } from "@/hooks/setting";

export const noop = () => {};

/**
 * @description:  设置ui挂载节点
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * 将对象作为参数添加到URL中
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = "";
  for (const key in obj) {
    parameters += key + "=" + encodeURIComponent(obj[key]) + "&";
  }
  parameters = parameters.replace(/&$/, "");
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, "?") + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }
) {
  const {target = "__blank", noopener = true, noreferrer = true} = opt || {};
  const feature: string[] = [];

  noopener && feature.push("noopener=yes");
  noreferrer && feature.push("noreferrer=yes");

  window.open(url, target, feature.join(","));
}

/**
 * @description 动态使用钩子道具
 */
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props as any).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const {matched, ...opt} = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
        meta: item.meta,
        name: item.name,
        path: item.path
      }))
      : undefined) as RouteRecordNormalized[]
  };
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    // @ts-ignore
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};


/**
 * @description 处理图片 URL
 */
export function IMAGE_URL(url) {
  if (!url) return "";

  const {apiUrl, urlPrefix} = useGlobSetting();

  if (/^https?:/.test(url)) {
    return url;
  }
  return `${apiUrl}${urlPrefix}${url}`;
}

