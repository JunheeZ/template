export const SIDE_BAR_MINI_WIDTH = 48;
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80;

export enum ContentEnum {
  FULL = "full",
  FIXED = "fixed",
}

export enum ThemeEnum {
  DARK = "dark",
  LIGHT = "light",
}

export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}

export enum PermissionModeEnum {
  // 后端
  BACK = "BACK",
  // 路由映射
  ROUTE_MAPPING = "ROUTE_MAPPING",
}

export enum RouterTransitionEnum {
  ZOOM_FADE = "zoom-fade",
  ZOOM_OUT = "zoom-out",
  FADE_SIDE = "fade-slide",
  FADE = "fade",
  FADE_BOTTOM = "fade-bottom",
  FADE_SCALE = "fade-scale",
}