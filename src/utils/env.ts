import type { GlobEnvConfig } from "#/config";

import pkg from "../../package.json";
import { getConfigFileName } from "../../build/getConfigFileName";
import { useGlobSetting } from "@/hooks/setting";
import { warn } from "@/utils/log";

// 获取通用存储前缀
export function getCommonStoragePrefix() {
  const globSetting = useGlobSetting();
  return `${globSetting.shortName}__${getEnv()}`.toUpperCase();
}

// 根据版本生成缓存密钥
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}

// 获取应用环境配置
export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  const ENV = (import.meta.env.DEV
    ? // 获取全局配置(打包时将独立提取配置)
    (import.meta.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig;

  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
    VITE_PUBLIC_PATH,
    VITE_GLOB_IS_WX_SDK
  } = ENV;

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
    );
  }

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
    VITE_PUBLIC_PATH,
    VITE_GLOB_IS_WX_SDK
  };
}


/**
 * Development model
 */
export const devMode = 'development';

/**
 * Production model
 */
export const prodMode = 'production';

/**
 * 获取环境变量
 */
export function getEnv(): string {
  return import.meta.env.MODE;
}

/**
 * 判断是否是开发模式
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

/**
 * 判断是否是运行模式
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}


/**
 * 判断是否是开启调试
 */
export function isDebug(): boolean {
  return import.meta.env.VITE_GLOB_IS_DEBUG === "true";
}
