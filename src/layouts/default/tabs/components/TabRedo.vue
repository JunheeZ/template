<template>
  <span :class="`${prefixCls}__extra-redo`" @click="handleRedo">
    <RedoOutlined :spin="loading" />
  </span>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { RedoOutlined } from "@ant-design/icons-vue";
import { useTabs } from "@/hooks/web/useTabs";
import { createNamespace } from "@/utils/create";

const [displayName, bem] = createNamespace("multiple-tabs-content");

export default defineComponent({
  name: "TabRedo",
  displayName,
  components: { RedoOutlined },

  setup() {
    const loading = ref(false);

    const { refreshPage } = useTabs();

    async function handleRedo() {
      loading.value = true;
      await refreshPage();
      setTimeout(() => {
        loading.value = false;
      }, 1200);
    }

    return { prefixCls: bem(), handleRedo, loading };
  }
});
</script>
