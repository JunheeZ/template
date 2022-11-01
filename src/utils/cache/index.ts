import { getStorageShortName } from "@/utils/env";
import { createStorage as create, CreateStorageParams } from "./storageCache";
import { DEFAULT_CACHE_TIME, enableStorageEncryption } from "@/settings/encryptionSetting";

export type Options = Partial<CreateStorageParams>;

/**
 * @description 创建配置项
 */
const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    // 在调试模式中没有加密
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options
  };
};

/**
 * @description WebStorage 存储方法
 */
export const WebStorage = create(createOptions(sessionStorage));

/**
 * @description WebLocal 存储方法
 */
export const WebLocal = create(createOptions(localStorage));

/**
 * @description 创建存储方法
 */
export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options));
};

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, {...options, timeout: DEFAULT_CACHE_TIME});
};

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, {...options, timeout: DEFAULT_CACHE_TIME});
};

export default WebStorage;
