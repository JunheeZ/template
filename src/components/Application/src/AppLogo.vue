<template>
  <div :class="getAppLogoClass" @click="goHome">
    <img src="../../../assets/images/logo.png" />
    <div class="ml-1 truncate md:opacity-100" :class="getTitleClass" v-show="showTitle">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, unref } from "vue";
import { useGlobSetting } from "@/hooks/setting";
import { useGo } from "@/hooks/web/usePage";
import { useMenuSetting } from "@/hooks/setting/useMenuSetting";
import { PageEnum } from "@/enums/pageEnum";

const props = defineProps({
  theme: { type: String, validator: (v: string) => ["light", "dark"].includes(v) },
  showTitle: { type: Boolean, default: true },
  alwaysShowTitle: { type: Boolean }
});

const { getCollapsedShowTitle } = useMenuSetting();
const { title } = useGlobSetting();
const go = useGo();

const getAppLogoClass = computed(() => [
  "z-logo",
  props.theme,
  { "collapsed-show-title": unref(getCollapsedShowTitle) }
]);

const getTitleClass = computed(() => [
  `z-logo__title`,
  {
    "xs:opacity-0": !props.alwaysShowTitle
  }
]);

function goHome() {
  go(PageEnum.BASE_HOME);
}
</script>

<style lang="less" scoped>
.z-logo {
  display: flex;
  align-items: center;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.light {
    border-bottom: 1px solid var(--border-color-base);
  }

  &.collapsed-show-title {
    padding-left: 20px;
  }

  &.light &__title {
    color: var(--primary-color);
  }

  &.dark &__title {
    color: var(--white);
  }

  &__title {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s;
    line-height: normal;
  }
}
</style>
