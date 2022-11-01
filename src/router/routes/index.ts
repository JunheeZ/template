import type { AppRouteModule, AppRouteRecordRaw } from "@/router/types";
import { ERROR_PAGE, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from "@/router/routes/basic";
import { useGlobSetting } from "@/hooks/setting";
import { PageEnum } from "@/enums/pageEnum";

const { title } = useGlobSetting();

const modules = import.meta.globEager("./modules/**/*.ts");

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  // @ts-ignore
  const mod = modules[key as unknown].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

/**
 * @description 根路径
 */
export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
    hideTbaBar: true
  }
};

export const LoginRoute: AppRouteModule = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/system/login/Login.vue"),
  meta: { title }
};

export const basicRoutes = [
  RootRoute,
  LoginRoute,
  ...asyncRoutes,
  PAGE_NOT_FOUND_ROUTE,
  REDIRECT_ROUTE,
  ERROR_PAGE
];
