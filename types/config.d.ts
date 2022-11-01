import { CacheTypeEnum } from "@/enums/cacheEnum";
import { ContentEnum, RouterTransitionEnum, SessionTimeoutProcessingEnum, ThemeEnum } from "@/enums/appEnum";
import { MenuModeEnum, MenuTypeEnum, MixSidebarTriggerEnum, TriggerEnum } from "@/enums/menuEnum";

export type LocaleType = "zh_CN" | "en";

/**
 * @description 动画配置
 */
export interface TransitionSetting {
  enable: boolean; // 是否打开切换页面动画
  basicTransition: RouterTransitionEnum; // 路由切换动画
  openPageLoading: boolean; // 是否打开页面切换加载
  openNProgress: boolean; // 是否打开顶部进度条
}

/**
 * @description 语言设置
 */
export interface LocaleSetting {
  showPicker: boolean;
  locale: LocaleType;
  fallback: LocaleType;
  availableLocales: LocaleType[];
}

/**
 * @description 公共设置
 */
export interface GlobConfig {
  title: string; // 标题
  apiUrl: string; // 服务接口地址
  urlPrefix?: string; // 地址前缀
  uploadUrl?: string; // 上传地址
  shortName: string;
}

/**
 * @description 环境配置
 */
export interface GlobEnvConfig {
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_API_URL: string;
  VITE_GLOB_API_URL_PREFIX?: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_GLOB_UPLOAD_URL: string,
  VITE_PUBLIC_PATH: string,
}

/**
 * @description 页眉设置
 */
export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum;
  showFullScreen: boolean;
  showNotice: boolean;
}

/**
 * @description 菜单设置
 */
export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  siderHidden: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  theme: ThemeEnum;
  topMenuAlign: "start" | "center" | "end";
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
}

/**
 * @description 多选项卡设置
 */
export interface MultiTabsSetting {
  cache: boolean;
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFold: boolean;
}

/**
 * @description 项目配置
 */
export interface ProjectConfig {
  showSettingButton: boolean; // 是否显示设置按钮
  showDarkModeToggle: boolean; // 是否显示主题切换按钮
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum; // 会话超时处理
  permissionMode: PermissionModeEnum;
  contentMode: ContentEnum;
  showLogo: boolean;
  headerSetting: HeaderSetting;
  menuSetting: MenuSetting;
  multiTabsSetting: MultiTabsSetting;
  transitionSetting: TransitionSetting;
  openKeepAlive: boolean;
  showBreadCrumb: boolean; // 显示面包屑
  showBreadCrumbIcon: boolean; // 显示面包屑图标
  useOpenBackTop: boolean; // 是否开启返回顶部
  permissionCacheType: CacheTypeEnum; // 缓存类型
  fullContent: boolean;
  useErrorHandle: boolean;
  removeAllHttpPending: boolean;
  closeMessageOnSwitch: boolean;
}
