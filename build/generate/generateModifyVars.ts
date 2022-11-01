import { resolve } from 'path';

/**
 * less 全局变量
 */
export function generateModifyVars(dark = false) {
  if (dark) resolve();
  return {
    // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
    hack: `true;@import "${resolve('src/design/var/index.less')}";`,
  };
}
