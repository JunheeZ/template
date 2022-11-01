<template>
  <div :class="getClass" :style="getDragBarStyle"></div>
</template>
<script lang="ts">
import { computed, defineComponent, unref } from "vue";

import { useMenuSetting } from "@/hooks/setting/useMenuSetting";
import { createNamespace } from "@/utils/create";

const [displayName, bem] = createNamespace("darg-bar");

export default defineComponent({
  name: "DargBar",
  displayName,
  props: {
    mobile: Boolean
  },
  setup(props) {
    const { getMiniWidthNumber, getCollapsed, getCanDrag } = useMenuSetting();

    const prefixCls = bem();
    const getDragBarStyle = computed(() => {
      if (unref(getCollapsed)) {
        return { left: `${unref(getMiniWidthNumber)}px` };
      }
      return {};
    });

    const getClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--hide`]: !unref(getCanDrag) || props.mobile
        }
      ];
    });

    return {
      prefixCls,
      getDragBarStyle,
      getClass
    };
  }
});
</script>
<style lang="less" scoped>
.z-darg-bar {
  position: absolute;
  top: 0;
  right: -2px;
  z-index: var(--side-drag-z-index);
  width: 2px;
  height: 100%;
  cursor: col-resize;
  border-top: none;
  border-bottom: none;

  &--hide {
    display: none;
  }

  &:hover {
    background-color: var(--primary-color);
    box-shadow: 0 0 4px 0 rgb(28 36 56 / 15%);
  }
}
</style>
