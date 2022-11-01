<template>
  <div :class="prefixCls">
    <CollapseHeader v-bind="props" :prefixCls="prefixCls" :show="show" @expand="handleExpand">
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #action>
        <slot name="action"></slot>
      </template>
    </CollapseHeader>

    <div class="p-2">
      <CollapseTransition :enable="canExpan">
        <Skeleton v-if="loading" :active="loading" />
        <div :class="`${prefixCls}__body`" v-else v-show="show">
          <slot></slot>
        </div>
      </CollapseTransition>
    </div>
    <div :class="`${prefixCls}__footer`" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import { ref } from "vue";
import { isNil } from "lodash-es";
import { Skeleton } from "ant-design-vue";
import { CollapseTransition } from "@/components/Transition";
import CollapseHeader from "./CollapseHeader.vue";
import { triggerWindowResize } from "@/utils/event";
import { useTimeoutFn } from "@/hooks/core/useTimeout";
import { createNamespace } from "@/utils/create";

const [_, bem] = createNamespace("collapse-container");

const props = defineProps({
  title: { type: String, default: "" },
  loading: { type: Boolean },
  canExpan: { type: Boolean, default: true },
  helpMessage: {
    type: [Array, String] as PropType<string[] | string>,
    default: ""
  },
  triggerWindowResize: { type: Boolean },
  lazyTime: { type: Number, default: 0 }
});

const show = ref(true);

const prefixCls = bem();

/**
 * @description: Handling development events
 */
function handleExpand(val: boolean) {
  show.value = isNil(val) ? !show.value : val;
  if (props.triggerWindowResize) {
    // 200 milliseconds here is because the expansion has animation,
    useTimeoutFn(triggerWindowResize, 200);
  }
}

defineExpose({
  handleExpand
});
</script>
<style lang="less">

.z-collapse-container {
  background-color: var(--component-background);
  border-radius: 2px;
  transition: all 0.3s ease-in-out;

  &__header {
    display: flex;
    height: 32px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color-light);
  }

  &__footer {
    border-top: 1px solid var(--border-color-light);
  }

  &__action {
    display: flex;
    text-align: right;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
