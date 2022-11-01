<template>
  <span :class="getClass">
    <Icon icon="ion:chevron-forward" :style="$attrs.iconStyle" />
  </span>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Icon } from "@/components/Icon";
import { createNamespace } from "@/utils/create";

const [_, bem] = createNamespace("basic-arrow");

const props = defineProps({
  expand: { type: Boolean },
  up: { type: Boolean },
  down: { type: Boolean },
  inset: { type: Boolean }
});

const prefixCls = bem();

// get component class
const getClass = computed(() => {
  const { expand, up, down, inset } = props;
  return [
    prefixCls,
    {
      [`${prefixCls}--active`]: expand,
      up,
      inset,
      down
    }
  ];
});
</script>

<style lang="less" scoped>
.z-basic-arrow {
  display: inline-block;
  cursor: pointer;
  transform: rotate(0deg);
  transition: all 0.3s ease 0.1s;
  transform-origin: center center;

  &--active {
    transform: rotate(90deg);
  }

  &.inset {
    line-height: 0px;
  }

  &.up {
    transform: rotate(-90deg);
  }

  &.down {
    transform: rotate(90deg);
  }

  &.up.z-basic-arrow--active {
    transform: rotate(90deg);
  }

  &.down.z-basic-arrow--active {
    transform: rotate(-90deg);
  }
}
</style>
