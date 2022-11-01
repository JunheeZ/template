import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";
import { basicRoutes } from "@/router/routes";

// 白名单列表
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(basicRoutes);

/**
 * @description 创建一个可以被 Vue 应用程序使用的路由实例
 */
export const router = createRouter({
  // 路由模式
  history: createWebHistory(`${import.meta.env.VITE_PUBLIC_PATH || ""}`),
  routes: (basicRoutes as unknown) as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * @description 重置路由表
 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function setupRouter(app: App<Element>) {
  app.use(router);
}
