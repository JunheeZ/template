import { defineComponent } from "vue";
import { propTypes } from "@/utils/propTypes";
import SiderTrigger from "./SiderTrigger";
import HeaderTrigger from "./HeaderTrigger";

export default defineComponent({
  name: "LayoutTrigger",
  props: {
    sider: propTypes.bool.def(true)
  },
  setup(props) {
    return () => (
      <>
        {props.sider ? <SiderTrigger /> : <HeaderTrigger />}
      </>
    );
  }
});