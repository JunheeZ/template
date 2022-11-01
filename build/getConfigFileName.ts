/**
 * 获取配置文件变量名
 * @param env
 */
export const getConfigFileName = (env: Record<string, any>) => {
  return `_Z_${env.VITE_GLOB_APP_SHORT_NAME || '_APP'}_CONF_`
    .toUpperCase()
    .replace(/\s/g, '');
};
