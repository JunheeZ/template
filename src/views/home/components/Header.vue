<script lang="tsx">
import type { PickerColumn } from "vant/lib/picker/types";
import type { CSSProperties } from "vue";
import { computed, defineComponent, ref, unref } from "vue";
import { Icon, Picker, Popup } from "vant";
import { isEqual } from "lodash-es";

export default defineComponent({
  name: "PHeader",
  props: {
    showSetting: Boolean,
    columns: Array as PropType<PickerColumn[]>,
    modelValue: [String, Number],
    valueKey: {type: String, default: "value"},
    labelKey: {type: String, default: "label"},
    color: String
  },
  emits: ["update:modelValue", "change", "setting"],
  setup(props, {emit}) {
    const show = ref(false);
    const showName = computed(() => props.columns?.find(v => isEqual(v[props.valueKey], props.modelValue))?.[props.labelKey]);

    const handleShowPopup = () => {
      show.value = true;
    };

    const handleConfirm = (event: any) => {
      const {selectedOptions} = event;
      const item = selectedOptions?.[0] ?? {};
      emit("update:modelValue", item[props.valueKey]);
      emit("change", event);
      handleCancel();
    };

    const handleCancel = () => {
      show.value = false;
    };

    const rootStyle = computed(() => {
      const style: CSSProperties = {
        "--header-color": props.color
      };

      return style;
    });

    return () => (
      <>
        <header class="z-header" style={unref(rootStyle)}>
          <div
            class={`z-header__department ${show.value ? "active" : ""}`}
            onClick={handleShowPopup}
          >
            <div class="z-header__name">{unref(showName)}</div>
            <Icon name="arrow-down" color={props.color} />
          </div>
          {
            props.showSetting
            &&
            <div class="z-header__operate" onClick={() => emit("setting")}>
              <Icon name="setting-o" color={props.color} />
            </div>
          }
        </header>
        <Popup
          round
          v-model={[show.value, "show"]}
          position="bottom"
        >
          <div class="z-header__popup">
            <Picker
              columns={props.columns}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              columns-field-names={{text: props.labelKey, value: props.valueKey, children: "children"}}
            />
          </div>
        </Popup>
      </>
    );
  }
});

</script>

<style scoped lang="less">
.z-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  &__name {
    padding-right: 6px;
  }

  &__department {
    display: flex;
    align-items: center;
    color: var(--header-color);

    .van-icon {
      transition: transform .3s;
    }

    &.active .van-icon {
      transform: rotate(-180deg);
    }
  }

  &__popup {
    padding-top: 20px;
  }
}
</style>
