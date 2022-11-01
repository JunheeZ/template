<template>
  <div class="z-home" :style="rootStyle">
    首页地址
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed } from "vue";

const rootStyle = computed(() => {
  const style: CSSProperties = {};
  return style;
});
</script>

<style lang="less">
:root {
  --root-background: #fff;
  --root-padding: 44px 0 0 0;
}

.z-home {
  position: relative;
  padding: var(--root-padding);
  background: var(--root-background);

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;

    &--background {
      width: 100vw;
    }
  }

  &__wrapper {
    position: relative;
    z-index: 1;
  }
}
</style>
