/**
 * 用于存放基础路由
 */
import type { AppRouteRecordRaw } from "@/router/types";
import { EXCEPTION_COMPONENT } from "@/router/constant";

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: "/:path(.*)*",
  name: "ErrorPage",
  meta: {
    title: "404"
  },
  component: EXCEPTION_COMPONENT
};

/**
 * 重置当前页面
 */
export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: "/redirect/:path(.*)",
  name: 'Redirect',
  meta: {
    title: "Redirect"
  },
  component: () => {
  }
};

/**
 * 错误页面
 */
export const ERROR_PAGE: AppRouteRecordRaw = {
  path: "/error/:model?",
  name: 'ERROR_PAGE',
  meta: {
    title: "错误"
  },
  component: () => {
  }
};
