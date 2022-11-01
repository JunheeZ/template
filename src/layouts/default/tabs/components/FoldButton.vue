<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <Icon :icon="getIcon" />
  </span>
</template>
<script lang="ts">
import { computed, defineComponent, unref } from "vue";
import { Icon } from "@/components/Icon";

import { useHeaderSetting } from "@/hooks/setting/useHeaderSetting";
import { useMenuSetting } from "@/hooks/setting/useMenuSetting";
import { triggerWindowResize } from "@/utils/event";
import { createNamespace } from "@/utils/create";

const [displayName, bem] = createNamespace("multiple-tabs-content");

export default defineComponent({
  name: "FoldButton",
  displayName,
  components: { Icon },
  setup() {
    const { getShowMenu, setMenuSetting } = useMenuSetting();
    const { getShowHeader, setHeaderSetting } = useHeaderSetting();

    const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader));

    const getIcon = computed(() =>
      unref(getIsUnFold) ? "codicon:screen-normal" : "codicon:screen-full"
    );

    function handleFold() {
      const isUnFold = unref(getIsUnFold);
      setMenuSetting({
        show: isUnFold,
        hidden: !isUnFold
      });
      setHeaderSetting({ show: isUnFold });
      triggerWindowResize();
    }

    return { prefixCls: bem(), getIcon, handleFold };
  }
});
</script>
