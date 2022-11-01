import { LayoutHeader } from "ant-design-vue";
import { propTypes } from "@/utils/propTypes";
import { computed, defineComponent, unref } from "vue";
import { useHeaderSetting } from "@/hooks/setting/useHeaderSetting";
import { useAppInject } from "@/hooks/web/useAppInject";
import { createNamespace } from "@/utils/create";
import { AppLocalePicker, AppLogo } from "@/components/Application";
import { useMenuSetting } from "@/hooks/setting/useMenuSetting";
import LayoutTrigger from "./../trigger";
import { FullScreen, LayoutBreadcrumb, UserDropDown } from "./components";
import LayoutMenu from "../menu/index.vue";

import "./index.less";
import { MenuModeEnum, MenuSplitTyeEnum } from "@/enums/menuEnum";
import { useLocale } from "@/locales/useLocale";

const [displayName, bem] = createNamespace("layout-header");

export default defineComponent({
  displayName,
  name: "LayoutHeader",
  props: {
    fixed: propTypes.bool
  },
  setup(props) {
    const {
      getHeaderTheme,
      getShowFullScreen,
      getShowContent,
      getShowBread,
      getShowHeaderLogo
    } = useHeaderSetting();
    const { getIsMobile } = useAppInject();
    const {
      getShowTopMenu,
      getShowHeaderTrigger,
      getSplit,
      getIsMixMode,
      getMenuWidth,
      getIsMixSidebar
    } = useMenuSetting();

    const getHeaderClass = computed(() => {
      const theme = unref(getHeaderTheme);
      return bem({ fixed: props.fixed, mobile: unref(getIsMobile), [theme]: true });
    });
    const { getShowLocalePicker } = useLocale();

    const getLogoWidth = computed(() => {
      if (!unref(getIsMixMode) || unref(getIsMobile)) {
        return {};
      }
      const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth);
      return { width: `${width}px` };
    });

    const showTriger = computed(() => (unref(getShowContent) && unref(getShowHeaderTrigger) && !unref(getSplit) && !unref(getIsMixSidebar)) || unref(getIsMobile));

    const showMenu = computed(() => unref(getShowTopMenu) && !unref(getIsMobile));

    const getSplitType = computed(() => {
      return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE;
    });

    const getMenuMode = computed(() => {
      return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null;
    });


    const renderLeft = () => (
      <div class={bem("left")}>
        {
          (unref(getShowHeaderLogo) || unref(getIsMobile)) &&
          <AppLogo class={bem("logo")} style={unref(getLogoWidth)} theme={unref(getHeaderTheme)} />
        }
        {unref(showTriger) && <LayoutTrigger sider={false} />}
        {(unref(getShowContent) && unref(getShowBread)) && <LayoutBreadcrumb theme={unref(getHeaderTheme)} />}
      </div>
    );

    const renderMenu = () => (
      <div class={bem("menu")}>
        <LayoutMenu theme={unref(getHeaderTheme)} splitType={unref(getSplitType)} menuMode={unref(getMenuMode)} />
      </div>
    );

    const renderAction = () => (
      <div class={bem("action")}>
        {unref(getShowFullScreen) && <FullScreen class={`${bem("action")}__item fullscreen-item`} />}
        {unref(getShowLocalePicker) && <AppLocalePicker reload showText class={`${bem("action")}-action__item`} />}
        <UserDropDown />
      </div>
    );

    return () => (
      <LayoutHeader class={unref(getHeaderClass)}>
        {renderLeft()}
        {unref(showMenu) && renderMenu()}
        {renderAction()}
      </LayoutHeader>
    );
  }
});