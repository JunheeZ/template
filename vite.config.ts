import type { ConfigEnv, UserConfig } from "vite";
import { loadEnv } from "vite";
import { resolve } from "path";
import { wrapperEnv } from "./build/utils";
import { createProxy } from "./build/vite/proxy";
import { OUTPUT_DIR } from "./build/constant";
import { createVitePlugins } from "./build/vite/plugin";
import { generateModifyVars } from "./build/generate/generateModifyVars";

import pkg from "./package.json";
import dayjs from "dayjs";

const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root: string = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === "build";

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: "vue-i18n",
          replacement: "vue-i18n/dist/vue-i18n.cjs.js"
        },
        {
          find: /@\//,
          replacement: `${pathResolve("src")}/`
        },
        {
          find: /#\//,
          replacement: `${pathResolve("types")}/`
        },
        { find: /^~/, replacement: "" }
      ]
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
      hmr: {
        overlay: true
      }
    },
    esbuild: {},
    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      cssTarget: "chrome80",
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
          drop_debugger: true
        }
      },
      // Turning off brotliSize display can slightly reduce packaging time
      reportCompressedSize: true,
      chunkSizeWarningLimit: 2000,
      minify: "terser"
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: generateModifyVars()
        }
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: [
        "@vue/runtime-core",
        "@vue/shared",
        "@iconify/iconify",
        "ant-design-vue/es/locale/zh_CN",
        "ant-design-vue/es/locale/en_US"
      ]
    }
  };
}
