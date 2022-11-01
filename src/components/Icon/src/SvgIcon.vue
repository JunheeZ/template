<template>
  <svg class="lead-svg-icon" :class="[$attrs.class]" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
import type { CSSProperties } from "vue";
import { computed, defineComponent } from "vue";
import { SvgIconProps } from "@/components/Icon/src/props";

export default defineComponent({
  name: "SvgIcon",
  props: SvgIconProps,
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);

    const getStyle = computed(
      (): CSSProperties => {
        // const { size } = props;
        // let s = `${size}`;
        // s = `${s.replace('px', '')}px`;
        return {
          // width: s,
          // height: s
        };
      }
    );
    return {symbolId, getStyle};
  }
});
</script>
<style lang="less" scoped>
.z-svg-icon {
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
