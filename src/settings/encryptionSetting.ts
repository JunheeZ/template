import { isDevMode } from '@/utils/env';

const daySeconds = 60 * 60 * 24;

// 系统默认缓存时间，以秒为单位
export const DEFAULT_CACHE_TIME = daySeconds;

// AES 加密密钥
export const cacheCipher = {
  key: '_lead_control_@@',
  iv: '@@_control_lead_'
};

// 系统缓存是否使用 AES 加密
export const enableStorageEncryption = !isDevMode();
