<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.realName }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem
          key="logout"
          text="退出登录"
          icon="ion:power-outline"
        />
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
import { Dropdown, Menu } from "ant-design-vue";
import type { MenuInfo } from "ant-design-vue/lib/menu/src/interface";

import { computed, defineComponent } from "vue";

import { useUserStore } from "@/store/modules/user";
import { useI18n } from "@/hooks/web/useI18n";

import headerImg from "@/assets/images/header.jpg";
import { propTypes } from "@/utils/propTypes";

import { createAsyncComponent } from "@/utils/factory/createAsyncComponent";
import { createNamespace } from "@/utils/create";

type MenuEvent = "logout";

const [displayName, bem] = createNamespace("header-user-dropdown");

export default defineComponent({
  name: "UserDropdown",
  displayName,
  components: {
    Dropdown,
    Menu,
    MenuItem: createAsyncComponent(() => import("./DropMenuItem.vue")),
    MenuDivider: Menu.Divider
  },
  props: {
    theme: propTypes.oneOf(["dark", "light"])
  },
  setup() {
    const prefixCls = bem();
    const { t } = useI18n();
    const userStore = useUserStore();

    const getUserInfo = computed(() => {
      const { realName = "", avatar } = userStore.getUserInfo || {};
      return { realName, avatar: avatar || headerImg };
    });

    function handleLoginOut() {
      userStore.confirmLoginOut();
    }

    function handleMenuClick(e: MenuInfo) {
      switch (e.key as MenuEvent) {
        case "logout":
          handleLoginOut();
          break;
      }
    }

    return {
      prefixCls,
      t,
      getUserInfo,
      handleMenuClick
    };
  }
});
</script>
<style lang="less">
.z-header-user-dropdown {
  height: var(--header-height);
  padding: 0 0 0 10px;
  padding-right: 10px;
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  &__header {
    border-radius: 50%;
  }

  &__name {
    font-size: 14px;
  }

  &--dark {
    &:hover {
      background-color: var(--header-dark-bg-hover-color);
    }
  }

  &--light {
    &:hover {
      background-color: var(--header-light-bg-hover-color);
    }

    .z-header-user-dropdown__name {
      color: var(--text-color-base);
    }
  }

  &-dropdown-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
}
</style>
