import { defineComponent, unref } from "vue";
import { useMenuSetting } from "@/hooks/setting/useMenuSetting";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "SiderTrigger",
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting();

    const handleClick = (event: any) => {
      event.stopPropagation();
      toggleCollapsed();
    };

    return () => (
      <div onClick={handleClick}>
        {unref(getCollapsed) ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      </div>
    );
  }
});