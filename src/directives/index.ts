import type { App } from "vue";
import { setupLongPress } from "@/directives/modules/LongPress";
import { setupLoadingDirective } from "./loading";

export function setupGlobDirectives(app: App) {
  setupLongPress(app);
  setupLoadingDirective(app);
}
