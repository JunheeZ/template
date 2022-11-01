import { defineStore } from "pinia";
import { store } from "@/store";
import { HeaderSetting, MenuSetting, MultiTabsSetting, ProjectConfig, TransitionSetting } from "#/config";
import { Persistent } from "@/utils/cache/persistent";
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from "@/enums/cacheEnum";
import { deepMerge } from "@/utils";
import { ThemeEnum } from "@/enums/appEnum";
import { resetRouter } from "@/router";

interface AppState {
  darkMode?: ThemeEnum;
  pageLoading: boolean;
  projectConfig: ProjectConfig | null;
}

let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY)
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): "light" | "dark" | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || ThemeEnum.LIGHT;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY_, mode);
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    }
  }
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
