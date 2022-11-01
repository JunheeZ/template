<script lang="tsx">
import { computed, defineComponent, unref } from "vue";
import { Layout } from "ant-design-vue";
import LayoutFeature from "./feature/index.vue";
import LayoutHeader from "./header";
import { useHeaderSetting } from "@/hooks/setting/useHeaderSetting";
import { createNamespace } from "@/utils/create";
import { useMenuSetting } from "@/hooks/setting/useMenuSetting";
import LayoutSideBar from "./sider/index.vue";
import { useAppInject } from "@/hooks/web/useAppInject";
import LayoutMultipleHeader from "./header/MultipleHeader.vue";
import LayoutContent from "./content/index.vue";

const [displayName, bem] = createNamespace("layout");

export default defineComponent({
  name: "Layout",
  displayName,
  setup() {
    const { getShowFullHeaderRef } = useHeaderSetting();
    const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting();
    const { getIsMobile } = useAppInject();

    const layoutClass = computed(() => {
      let cls: string[] = ["ant-layout"];
      if (unref(getIsMixSidebar) || unref(getShowMenu)) {
        cls.push("ant-layout-has-sider");
      }
      return cls;
    });

    const showSideBar = computed(() => unref(getShowSidebar) || unref(getIsMobile));

    return () => (
      <Layout class={bem()}>
        <LayoutFeature />
        {!unref(getShowFullHeaderRef) && <LayoutHeader fixed />}
        <Layout class={unref(layoutClass)}>
          {unref(showSideBar) && <LayoutSideBar />}
          <Layout class={bem("main")}>
            <LayoutMultipleHeader />
            <LayoutContent />
          </Layout>
        </Layout>
      </Layout>
    );
  }
});
</script>

<style scoped lang="less">
.z-layout {
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: var(--content-bg);
  flex-direction: column;

  > .ant-layout {
    min-height: 100%;
  }

  &__main {
    width: 100%;
    margin-left: 1px;
  }
}
</style>