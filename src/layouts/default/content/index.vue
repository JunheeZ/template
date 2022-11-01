<template>
  <div :class="[prefixCls, getLayoutContentMode]" v-loading="getOpenPageLoading && getPageLoading">
    <PageLayout />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageLayout from "@/layouts/page/index.vue";
import { useRootSetting } from "@/hooks/setting/useRootSetting";
import { useTransitionSetting } from "@/hooks/setting/useTransitionSetting";
import { useContentViewHeight } from "./useContentViewHeight";
import { createNamespace } from "@/utils/create";

const [displayName, bem] = createNamespace("layout-content");

export default defineComponent({
  name: "LayoutContent",
  displayName,
  components: { PageLayout },
  setup() {
    const { getOpenPageLoading } = useTransitionSetting();
    const { getLayoutContentMode, getPageLoading } = useRootSetting();

    useContentViewHeight();
    return {
      prefixCls: bem(),
      getOpenPageLoading,
      getLayoutContentMode,
      getPageLoading
    };
  }
});
</script>

<style lang="less">
.z-layout-content {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;

  &.fixed {
    width: 1200px;
    margin: 0 auto;
  }

  &-loading {
    position: absolute;
    top: 200px;
    z-index: var(--page-loading-z-index);
  }
}
</style>
