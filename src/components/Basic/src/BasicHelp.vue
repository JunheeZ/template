<script lang="tsx">
import type { CSSProperties, PropType } from "vue";
import { computed, defineComponent, unref } from "vue";
import { Tooltip } from "ant-design-vue";
import { InfoCircleOutlined } from "@ant-design/icons-vue";
import { getPopupContainer } from "@/utils";
import { isArray, isString } from "@/utils/is";
import { getSlot } from "@/utils/helper/tsxHelper";
import { createNamespace } from "@/utils/create";

const [_, bem] = createNamespace("basic-help");

const props = {
  maxWidth: { type: String, default: "600px" },
  showIndex: { type: Boolean },
  color: { type: String, default: "#ffffff" },
  fontSize: { type: String, default: "14px" },
  placement: { type: String, default: "right" },
  text: { type: [Array, String] as PropType<string[] | string> }
};

export default defineComponent({
  name: "BasicHelp",
  components: { Tooltip },
  props,
  setup(props, { slots }) {
    const prefixCls = bem();

    const getTooltipStyle = computed(
      (): CSSProperties => ({ color: props.color, fontSize: props.fontSize })
    );

    const getOverlayStyle = computed((): CSSProperties => ({ maxWidth: props.maxWidth }));

    function renderTitle() {
      const textList = props.text;

      if (isString(textList)) {
        return <p>{textList}</p>;
      }

      if (isArray(textList)) {
        return textList?.map((text, index) => {
          return (
            <p key={text}>
              <>
                {props.showIndex ? `${index + 1}. ` : ""}
                {text}
              </>
            </p>
          );
        });
      }
      return null;
    }

    return () => {
      return (
        <Tooltip
          overlayClassName={`${prefixCls}__wrap`}
          title={<div style={unref(getTooltipStyle)}>{renderTitle()}</div>}
          autoAdjustOverflow={true}
          overlayStyle={unref(getOverlayStyle)}
          placement={props.placement as "right"}
          getPopupContainer={() => getPopupContainer()}
        >
          <span class={prefixCls}>{getSlot(slots) || <InfoCircleOutlined />}</span>
        </Tooltip>
      );
    };
  }
});
</script>

<style lang="less">
.z-basic-help {
  display: inline-block;
  margin-left: 6px;
  font-size: 14px;
  color: var(--text-color-help-dark);
  cursor: pointer;

  &:hover {
    color: var(--primary-color);
  }

  &__wrap {
    p {
      margin-bottom: 0;
    }
  }
}
</style>
