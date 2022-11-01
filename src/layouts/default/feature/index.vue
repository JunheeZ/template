<script lang="tsx">
import { defineComponent, unref } from "vue";
import { BackTop } from "ant-design-vue";
import { useRootSetting } from "@/hooks/setting/useRootSetting";

export default defineComponent({
  name: "LayoutFeature",
  setup() {
    const { getUseOpenBackTop } = useRootSetting();

    return () => (
      <>
        {unref(getUseOpenBackTop) && <BackTop getTarget={() => document.body} />}
      </>
    );
  }
});
</script>