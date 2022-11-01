<script lang="ts">
import { defineComponent } from "vue";

const props = {};

export default defineComponent({
  name: "AppProvider",
  inheritAttrs: false,
  props,
  setup(_props, { slots }) {
    return () => slots.default?.();
  }
});
</script>
