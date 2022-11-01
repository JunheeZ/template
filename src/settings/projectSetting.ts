import type { ProjectConfig } from "#/config";
import { CacheTypeEnum } from "@/enums/cacheEnum";
import {
  ContentEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
  ThemeEnum
} from "@/enums/appEnum";
import { MenuModeEnum, MenuTypeEnum, MixSidebarTriggerEnum, TriggerEnum } from "@/enums/menuEnum";

/**
 * @description !修改完成后，需要清空浏览器缓存
 */
const setting: ProjectConfig = {
  showSettingButton: false,
  showDarkModeToggle: true,
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.PAGE_COVERAGE,
  contentMode: ContentEnum.FULL,
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  showLogo: true,
  headerSetting: {
    bgColor: "",
    fixed: true,
    show: false,
    theme: ThemeEnum.DARK,
    showFullScreen: true,
    showNotice: false
  },
  menuSetting: {
    bgColor: "",
    fixed: true,
    collapsed: false,
    siderHidden: false,
    collapsedShowTitle: false,
    canDrag: false,
    show: true,
    hidden: false,
    menuWidth: 210,
    mode: MenuModeEnum.VERTICAL,
    type: MenuTypeEnum.SIDEBAR,
    theme: ThemeEnum.DARK,
    split: true,
    topMenuAlign: "center",
    trigger: TriggerEnum.HEADER,
    accordion: true,
    closeMixSidebarOnChange: false,
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    mixSideFixed: false
  },
  multiTabsSetting: {
    cache: false,
    show: true,
    canDrag: true,
    showQuick: true,
    showRedo: true,
    showFold: true
  },
  transitionSetting: {
    enable: true,
    basicTransition: RouterTransitionEnum.FADE_SIDE,
    openPageLoading: true,
    openNProgress: false
  },
  openKeepAlive: true,
  showBreadCrumb: true,
  showBreadCrumbIcon: true,
  useOpenBackTop: true,
  permissionCacheType: CacheTypeEnum.LOCAL,
  fullContent: true,
  useErrorHandle: false,
  removeAllHttpPending: true,
  closeMessageOnSwitch: true
};

export default setting;
