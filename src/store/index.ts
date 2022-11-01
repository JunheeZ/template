import type { App } from "vue";
// 引入 createPinia 方法创建仓库
import { createPinia } from "pinia";

const store = createPinia();

export function setupStore(app: App): void {
  app.use(store);
}

export { store };