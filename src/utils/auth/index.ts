import { Persistent, BasicKeys } from '@/utils/cache/persistent';
import { CacheTypeEnum } from '@/enums/cacheEnum';
import projectSetting from '@/settings/projectSetting';
import { TOKEN_KEY } from '@/enums/cacheEnum';

const { permissionCacheType } = projectSetting;
// 允许缓存类型 高速缓存类型枚举
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return getAuthCache<string>(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}
