import { defineComponent, unref } from "vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { useMenuSetting } from "@/hooks/setting/useMenuSetting";

export default defineComponent({
  name: "HeaderTrigger",
  setup() {

    const { getCollapsed, toggleCollapsed } = useMenuSetting();

    return () => (
      <span onClick={toggleCollapsed} class="z-layout-header-trigger">
        {unref(getCollapsed) ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
    );
  }
});