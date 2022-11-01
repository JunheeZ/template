import type { Router } from "vue-router";
import { PageEnum } from "@/enums/pageEnum";
import { ERROR_PAGE, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from "@/router/routes/basic";
import { LoginRoute } from "@/router/routes";

// 登录
const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList: any[] = [PAGE_NOT_FOUND_ROUTE.name, REDIRECT_ROUTE.name, ERROR_PAGE.name, LoginRoute.name];

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 处理登录后跳转到 404 页面，重定向到首页
    if (from.path == LOGIN_PATH && to.name == PAGE_NOT_FOUND_ROUTE.name) {
      next({path: PageEnum.BASE_HOME, replace: true});
      return;
    }

    // 处理白名单
    if (whitePathList.includes(to.name)) {
      next();
      return;
    }
    next();
  });
}
