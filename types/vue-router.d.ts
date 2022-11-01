export {};

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number;
    title: string;
    dynamicLevel?: number;
    realPath?: string;
    ignoreAuth?: boolean;
    roles?: RoleEnum[];
    ignoreKeepAlive?: boolean;
    affix?: boolean;
    icon?: string;
    frameSrc?: string;
    transitionName?: string;
    hideBreadcrumb?: boolean;
    hideChildrenInMenu?: boolean; // 隐藏子菜单
    carryParam?: boolean; // 携带参数
    single?: boolean; // 用于内部标记单级菜单
    currentActiveMenu?: string; // 当前活动菜单项
    hideTab?: boolean;
    hideMenu?: boolean;
    isLink?: boolean;
    ignoreRoute?: boolean;
    hidePathForChildren?: boolean;
  }
}
