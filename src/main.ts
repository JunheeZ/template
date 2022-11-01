import "virtual:svg-icons-register";
import "@/design/tailwind.css";
import "ant-design-vue/dist/antd.css";
import "@/design/index.less";
import { createApp } from "vue";
import App from "./App.vue";
import { router, setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setupRouterGuard } from "@/router/guard";
import { setupI18n } from "@/locales/setupI18n";
import { registerGlobComp } from "@/components/registerGlobComp";
import { setupGlobDirectives } from "@/directives";
import { initAppConfigStore } from "@/logics/initAppConfig";

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);

  // 初始化系统内部配置
  initAppConfigStore();

  registerGlobComp(app);

  await setupI18n(app);

  setupRouter(app);

  setupGlobDirectives(app);

  setupRouterGuard(router);

  app.mount("#app");
}

void bootstrap();
