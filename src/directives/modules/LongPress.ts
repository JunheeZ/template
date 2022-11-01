import type { App, Directive } from "vue";
import { on, off } from "@/utils/dom/event";
import { toFinite } from "lodash-es";

const MS = 600;

// 处理触摸开始
function handleTouchstart(el, time = MS, binding) {
  // 触摸开始时间
  el.S_TIME = +new Date();
  el.TIMER = setTimeout(() => {
    binding?.value?.(el);
  }, time);
}

// 处理触摸结束
function handleTouchend(el) {
  clearTimeout(el.TIMER);
}

const LongPress: Directive = {
  mounted(el, binding) {
    el.classList.add("UserSelect");
    const delayed = el.getAttribute("delayed");
    const ms = toFinite(delayed || MS);
    const goMs = ms < MS ? MS : ms;

    on(el, "touchstart", handleTouchstart.bind(this, el, goMs, binding));
    on(el, "touchend", handleTouchend.bind(this, el));
  },
  unmounted(el) {
    off(el, "touchstart", handleTouchstart);
    off(el, "touchend", handleTouchend);
  }
};

export function setupLongPress(app: App) {
  app.directive("long-press", LongPress);
}

export default LongPress;
