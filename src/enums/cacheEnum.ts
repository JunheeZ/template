/**
 * 用于系统缓存的 key
 */
// token key
export const TOKEN_KEY = "TOKEN__";

export const ROLES_KEY = "ROLES_KEY__"

// 语言
export const LOCALE_KEY = "LOCALE__";

// 用户信息的关键
export const USER_INFO_KEY = "USER__INFO__";

// 项目配置 key
export const PROJ_CFG_KEY = "PROJ__CFG__KEY__";

// 基全局局部键
export const APP_LOCAL_CACHE_KEY = "COMMON__LOCAL__KEY__";

// 基本全局会话键
export const APP_SESSION_CACHE_KEY = "COMMON__SESSION__KEY__";

// 错误消息存储
export const ERROR_MSG_KEY = "ERROR__MSG__KEY__";

export const APP_DARK_MODE_KEY_ = '__APP__DARK__MODE__';

export const MULTIPLE_TABS_KEY = 'MULTIPLE_TABS__KEY__';

export enum CacheTypeEnum {
  SESSION,
  LOCAL,
}
