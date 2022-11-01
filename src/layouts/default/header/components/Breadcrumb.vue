<template>
  <div :class="bem([theme])">
    <Breadcrumb :routes="routes">
      <template #itemRender="{ route, routes: routesMatched, paths }">
        <Icon :icon="getIcon(route)" v-if="getShowBreadCrumbIcon && getIcon(route)" />
        <span v-if="!hasRedirect(routesMatched, route)">
          {{ route.meta.title }}
        </span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ route.meta.title }}
        </router-link>
      </template>
    </Breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { propTypes } from "@/utils/propTypes";
import { RouteLocationMatched, useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import { useRootSetting } from "@/hooks/setting/useRootSetting";
import { useGo } from "@/hooks/web/usePage";
import { createNamespace } from "@/utils/create";
import { Breadcrumb } from "ant-design-vue";
import { REDIRECT_NAME } from "@/router/constant";
import { getMenus } from "@/router/menus";
import { getAllParentPath } from "@/router/helper/menuHelper";
import type { Menu } from "@/router/types";
import { filter } from "@/utils/helper/treeHelper";
import { isString } from "lodash-es";
import { Icon } from "@/components/Icon";

const routes = ref<RouteLocationMatched[]>([]);
const { currentRoute } = useRouter();
const { getShowBreadCrumbIcon } = useRootSetting();
const go = useGo();

const [_name, bem] = createNamespace("layout-breadcrumb");

defineProps({
  theme: propTypes.oneOf(["dark", "light"])
});

watchEffect(async () => {
  if (currentRoute.value.name === REDIRECT_NAME) return;
  const menus = await getMenus();

  const routeMatched = currentRoute.value.matched;
  const cur = routeMatched?.[routeMatched.length - 1];
  let path = currentRoute.value.path;

  if (cur && cur?.meta?.currentActiveMenu) {
    path = cur.meta.currentActiveMenu as string;
  }

  const parent = getAllParentPath(menus, path);
  const filterMenus = menus.filter((item) => item.path === parent[0]);
  const matched = getMatched(filterMenus, parent) as any;

  if (!matched || matched.length === 0) return;

  const breadcrumbList = filterItem(matched);

  if (currentRoute.value.meta?.currentActiveMenu) {
    breadcrumbList.push({
      ...currentRoute.value,
      name: currentRoute.value.meta?.title || currentRoute.value.name
    } as unknown as RouteLocationMatched);
  }
  routes.value = breadcrumbList;
});

function getMatched(menus: Menu[], parent: string[]) {
  const metched: Menu[] = [];
  menus.forEach((item) => {
    if (parent.includes(item.path)) {
      metched.push({
        ...item,
        name: item.meta?.title || item.name
      });
    }
    if (item.children?.length) {
      metched.push(...getMatched(item.children, parent));
    }
  });
  return metched;
}

function filterItem(list: RouteLocationMatched[]) {
  return filter(list, (item) => {
    const { meta, name } = item;
    if (!meta) {
      return !!name;
    }
    const { title, hideBreadcrumb, hideMenu } = meta;
    if (!title || hideBreadcrumb || hideMenu) {
      return false;
    }
    return true;
  }).filter((item) => !item.meta?.hideBreadcrumb);
}

function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
  e?.preventDefault();
  const { children, redirect, meta } = route;

  if (children?.length && !redirect) {
    e?.stopPropagation();
    return;
  }
  if (meta?.carryParam) {
    return;
  }

  if (redirect && isString(redirect)) {
    go(redirect);
  } else {
    let goPath = "";
    if (paths.length === 1) {
      goPath = paths[0];
    } else {
      const ps = paths.slice(1);
      const lastPath = ps.pop() || "";
      goPath = `${lastPath}`;
    }
    goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
    go(goPath);
  }
}

function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
  return routes.indexOf(route) !== routes.length - 1;
}

function getIcon(route) {
  return route.icon || route.meta?.icon;
}

</script>

<style scoped lang="less">
.z-layout-breadcrumb {
  display: flex;
  padding: 0 8px;
  align-items: center;

  .ant-breadcrumb-link {
    .anticon {
      margin-right: 4px;
      margin-bottom: 2px;
    }
  }

  &--light {
    .ant-breadcrumb-link {
      color: var(--breadcrumb-item-normal-color);

      a {
        color: rgb(0 0 0 / 65%);

        &:hover {
          color: var(--primary-color);
        }
      }
    }

    .ant-breadcrumb-separator {
      color: var(--breadcrumb-item-normal-color);
    }
  }

  &--dark {
    .ant-breadcrumb-link {
      color: rgb(255 255 255 / 60%);

      a {
        color: rgb(255 255 255 / 80%);

        &:hover {
          color: var(--white);
        }
      }
    }

    .ant-breadcrumb-separator,
    .anticon {
      color: rgb(255 255 255 / 80%);
    }
  }
}
</style>