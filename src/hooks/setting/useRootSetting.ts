import type { ProjectConfig } from '#/config';

import { computed } from 'vue';

import { useAppStore } from '@/store/modules/app';
import { ContentEnum, ThemeEnum } from '@/enums/appEnum';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
  >;

export function useRootSetting() {
  const appStore = useAppStore();

  const getPageLoading = computed(() => appStore.getPageLoading);

  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive);

  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo);

  const getContentMode = computed(() => appStore.getProjectConfig.contentMode);

  const getUseOpenBackTop = computed(() => appStore.getProjectConfig.useOpenBackTop);

  const getShowSettingButton = computed(() => appStore.getProjectConfig.showSettingButton);

  const getUseErrorHandle = computed(() => appStore.getProjectConfig.useErrorHandle);

  const getShowBreadCrumb = computed(() => appStore.getProjectConfig.showBreadCrumb);

  const getShowBreadCrumbIcon = computed(() => appStore.getProjectConfig.showBreadCrumbIcon);

  const getShowDarkModeToggle = computed(() => appStore.getProjectConfig.showDarkModeToggle);

  const getDarkMode = computed(() => appStore.getDarkMode);

  const getLayoutContentMode = computed(() =>
    appStore.getProjectConfig.contentMode === ContentEnum.FULL
      ? ContentEnum.FULL
      : ContentEnum.FIXED,
  );

  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting);
  }

  function setDarkMode(mode: ThemeEnum) {
    appStore.setDarkMode(mode);
  }
  return {
    setRootSetting,
    getPageLoading,
    getOpenKeepAlive,
    getLayoutContentMode,
    setDarkMode,
    getShowLogo,
    getUseOpenBackTop,
    getShowSettingButton,
    getUseErrorHandle,
    getShowBreadCrumb,
    getShowBreadCrumbIcon,
    getShowDarkModeToggle,
    getDarkMode,
    getContentMode
  }
}