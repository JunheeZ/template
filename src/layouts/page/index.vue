<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        :name="
          getTransitionName({
            route,
            openCache,
            enableTransition: getEnableTransition,
            cacheTabs: getCaches,
            def: getBasicTransition,
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <div v-else :key="route.name">
          <component :is="Component" :key="route.fullPath" />
        </div>
      </transition>
    </template>
  </RouterView>
</template>

<script lang="ts" setup>
import { getTransitionName } from "./transition";
import { useTransitionSetting } from "@/hooks/setting/useTransitionSetting";
import { useRootSetting } from "@/hooks/setting/useRootSetting";
import { computed, unref } from "vue";
import { useMultipleTabSetting } from "@/hooks/setting/useMultipleTabSetting";
import { useMultipleTabStore } from "@/store/modules/multipleTab";

const tabStore = useMultipleTabStore();
const { getShowMultipleTab } = useMultipleTabSetting();
const { getOpenKeepAlive } = useRootSetting();

const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab));

const getCaches = computed((): string[] => {
  if (!unref(getOpenKeepAlive)) {
    return [];
  }
  return tabStore.getCachedTabList;
});

const { getEnableTransition, getBasicTransition } = useTransitionSetting();
</script>
