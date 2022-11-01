<template>
  <Drawer
    v-if="getIsMobile"
    placement="left"
    :class="prefixCls"
    :width="getMenuWidth"
    :getContainer="null"
    :visible="!getCollapsed"
    @close="handleClose"
  >
    <Sider />
  </Drawer>
  <MixSider v-else-if="getIsMixSidebar" />
  <Sider v-else />
</template>
<script lang="ts">
import { defineComponent } from "vue";

import Sider from "./LayoutSider.vue";
import MixSider from "./MixSider.vue";
import { Drawer } from "ant-design-vue";

import { useAppInject } from "@/hooks/web/useAppInject";
import { useMenuSetting } from "@/hooks/setting/useMenuSetting";
import { createNamespace } from "@/utils/create";

const [displayName, bem] = createNamespace("layout-sider-wrapper");

export default defineComponent({
  name: "SiderWrapper",
  displayName,
  components: { Sider, Drawer, MixSider },
  setup() {
    const prefixCls = bem();
    const { getIsMobile } = useAppInject();
    const { setMenuSetting, getCollapsed, getMenuWidth, getIsMixSidebar } = useMenuSetting();

    function handleClose() {
      setMenuSetting({
        collapsed: true
      });
    }

    return { prefixCls, getIsMobile, getCollapsed, handleClose, getMenuWidth, getIsMixSidebar };
  }
});
</script>
<style lang="less">
.z-layout-sider-wrapper {
  .ant-drawer-body {
    height: 100vh;
    padding: 0;
  }

  .ant-drawer-header-no-title {
    display: none;
  }
}
</style>
