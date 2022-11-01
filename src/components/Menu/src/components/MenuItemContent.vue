<template>
  <span :class="`${prefixCls}- flex items-center `">
    <Icon v-if="getIcon" :icon="getIcon" :size="18" :class="`${prefixCls}-wrapper__icon mr-2`" />
    {{ getI18nName }}
  </span>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";

import Icon from "@/components/Icon/index";
import { useI18n } from "@/hooks/web/useI18n";
import { contentProps } from "../props";
import { createNamespace } from "@/utils/create";

const { t } = useI18n();
const [displayName, bem] = createNamespace("basic-menu-item-content");

export default defineComponent({
  name: "MenuItemContent",
  components: {
    Icon
  },
  displayName,
  props: contentProps,
  setup(props) {
    const prefixCls = bem();
    const getI18nName = computed(() => t(props.item?.name));
    const getIcon = computed(() => props.item?.icon);

    return {
      prefixCls,
      getI18nName,
      getIcon
    };
  }
});
</script>
