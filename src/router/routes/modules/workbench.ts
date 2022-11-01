/**
 * 路由配置
 */
import type { AppRouteModule } from "@/router/types";
import { LAYOUT } from "@/router/constant";

const Routes: AppRouteModule = {
  path: "/",
  name: "home",
  meta: {
    title: "Layout"
  },
  component: LAYOUT,
  redirect: "/home",
  children: [
    {
      path: "/home",
      name: "home1",
      meta: {
        title: "门户系统"
      },
      component: () => import("@/views/home/index.vue")
    }
  ]
};

export default Routes;
