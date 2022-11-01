import type {
  PApplicationProps,
  PChartProps,
  PGridProps,
  PInfoListProps,
  PKanbanProps,
  PSwipeProps,
  PTitleProps
} from "lead-portal/dist/types/packages/components/types";
import type { VNode } from "vue";
import { defineComponent } from "vue";
import { isString } from "lodash-es";
import * as Module from "lead-portal";
import "lead-portal/dist/style.css";

export type ComponentProps =
  PApplicationProps
  | PChartProps
  | PGridProps
  | PInfoListProps
  | PSwipeProps
  | PKanbanProps
  | PTitleProps;

const keys = Object.keys(Module);

export type Element = Partial<typeof keys[number]>

export type ModelProps = {
  element: Element | VNode;
  attrs: ComponentProps
}

export default defineComponent({
  name: "ContentModel",
  props: {
    options: {
      type: Array as PropType<ModelProps[]>,
      default: () => []
    }
  },
  setup(props) {
    const renderDom = (model: ModelProps, index: number) => {
      const Element = isString(model.element) ? Module[model.element] : model.element;

      if (!Element) return null;

      return (<Element key={`element-${index}`} {...model.attrs} />);
    };

    return () => (
      <>
        {props.options?.map(renderDom)}
      </>
    );
  }
});
