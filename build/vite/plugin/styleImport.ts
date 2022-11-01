/**
 * 按需引入组件库样式。
 * https://github.com/anncwb/vite-plugin-style-import
 */
import { createStyleImportPlugin } from "vite-plugin-style-import";

export function configStyleImportPlugin(isBuild: boolean) {
  if (!isBuild) return [];
  const pwaPlugin = createStyleImportPlugin({
    libs: []
  });
  return pwaPlugin;
}
