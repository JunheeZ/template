import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import PurgeIcons from "vite-plugin-purge-icons";
import { configHtmlPlugin } from "./html";
import { configSvgIconsPlugin } from "./svgSprite";
import { configStyleImportPlugin } from "./styleImport";
import { configVisualizerConfig } from "./visualizer";
import { configImageminPlugin } from "./imagemin";
import { configCompressPlugin } from "./compress";
import { configPwaConfig } from "./pwa";
import { configHmrPlugin } from "./hmr";
import { viteVConsole } from "vite-plugin-vconsole";
import { resolve } from "path";
import DefineOptions from "unplugin-vue-define-options/vite"

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean): any {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_GLOB_IS_DEBUG
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    DefineOptions()
  ];

  // 开启调试模式
  VITE_GLOB_IS_DEBUG && vitePlugins.push(
    viteVConsole({
      entry: pathResolve("src/main.ts"),
      localEnabled: true,
      enabled: true,
      config: {
        maxLogNumber: 1000,
        theme: "dark"
      }
    })
  );

  // TODO
  !isBuild && vitePlugins.push(configHmrPlugin());

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy(
    {
      targets: ["chrome >= 49", "ie >= 11"],
      polyfills: [
        "es.symbol",
        "es.array.filter",
        "es.promise",
        "es.promise.finally",
        "es/map",
        "es/set",
        "es.array.for-each",
        "es.object.define-properties",
        "es.object.define-property",
        "es.object.get-own-property-descriptor",
        "es.object.get-own-property-descriptors",
        "es.object.keys",
        "es.object.to-string",
        "web.dom-collections.for-each",
        "esnext.global-this",
        "esnext.string.match-all"
      ],
      modernPolyfills: ["es.promise.finally"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
    }
  ));

  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  vitePlugins.push(configSvgIconsPlugin(isBuild));

  vitePlugins.push(PurgeIcons());

  vitePlugins.push(configStyleImportPlugin(isBuild));

  vitePlugins.push(configVisualizerConfig());

  // 以下插件只能在生产环境中工作
  if (isBuild) {
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE));

    vitePlugins.push(configPwaConfig(viteEnv));
  }

  return vitePlugins;
}
