<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { useTitle } from "@/hooks/web/useTitle";
import { AppProvider } from "@/components/Application";
import { ConfigProvider } from "ant-design-vue";
import { useLocale } from "@/locales/useLocale";
import "dayjs/locale/zh-cn";

const { getAntdLocale } = useLocale();

useTitle();
</script>