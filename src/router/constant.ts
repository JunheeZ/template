export const REDIRECT_NAME = "Redirect";

export const PARENT_LAYOUT_NAME = "ParentLayout";

export const PAGE_NOT_FOUND_NAME = "PageNotFound";

export const EXCEPTION_COMPONENT = () => import("@/views/system/exception/Exception.vue");

/**
 * @description 默认布局
 */
export const LAYOUT = () => import("@/layouts/default/index.vue");

/**
 * @description: 页面布局
 */
export const getParentLayout = (name: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({ name: name || PARENT_LAYOUT_NAME });
    });
};


