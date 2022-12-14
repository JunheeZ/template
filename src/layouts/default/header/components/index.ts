import { createAsyncComponent } from "@/utils/factory/createAsyncComponent";
import FullScreen from "./FullScreen.vue";

export const UserDropDown = createAsyncComponent(() => import("./userDropdown/index.vue"), {
  loading: true
});

export const LayoutBreadcrumb = createAsyncComponent(() => import("./Breadcrumb.vue"));

export { FullScreen };