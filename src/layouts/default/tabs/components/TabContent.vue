<template>
  <Dropdown
    :dropMenuList="getDropMenuList"
    :trigger="getTrigger"
    placement="bottom"
    overlayClassName="multiple-tabs__dropdown"
    @menu-event="handleMenuEvent"
  >
    <div :class="`${prefixCls}__info`" @contextmenu="handleContext" v-if="getIsTabs">
      <span class="ml-1">{{ getTitle }}</span>
    </div>
    <span :class="`${prefixCls}__extra-quick`" v-else @click="handleContext">
      <Icon icon="ion:chevron-down" />
    </span>
  </Dropdown>
</template>
<script lang="ts">
import type { PropType } from "vue";
import { computed, defineComponent, unref } from "vue";
import type { RouteLocationNormalized } from "vue-router";
import { Dropdown } from "@/components/Dropdown";
import { Icon } from "@/components/Icon";

import { TabContentProps } from "../types";

import { useI18n } from "@/hooks/web/useI18n";
import { useTabDropdown } from "../useTabDropdown";
import { createNamespace } from "@/utils/create";

const [displayName, bem] = createNamespace("multiple-tabs-content");

export default defineComponent({
  name: "TabContent",
  displayName,
  components: { Dropdown, Icon },
  props: {
    tabItem: {
      type: Object as PropType<RouteLocationNormalized>,
      default: null
    },
    isExtra: Boolean
  },
  setup(props) {
    const { t } = useI18n();

    const getTitle = computed(() => {
      const { tabItem: { meta } = {} } = props;
      return meta && t(meta.title as string);
    });

    const getIsTabs = computed(() => !props.isExtra);

    const getTrigger = computed((): ("contextmenu" | "click" | "hover")[] =>
      unref(getIsTabs) ? ["contextmenu"] : ["click"]
    );

    const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(
      props as TabContentProps,
      getIsTabs
    );

    function handleContext(e) {
      props.tabItem && handleContextMenu(props.tabItem)(e);
    }

    return {
      prefixCls: bem(),
      getDropMenuList,
      handleMenuEvent,
      handleContext,
      getTrigger,
      getIsTabs,
      getTitle
    };
  }
});
</script>
