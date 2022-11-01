import type { ProjectConfig } from "#/config";
import type { RouteLocationNormalized } from "vue-router";

import { createLocalStorage, createSessionStorage } from "@/utils/cache";
import { Memory } from "@/utils/cache/memory";
import {
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  MULTIPLE_TABS_KEY,
  PROJ_CFG_KEY,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY
} from "@/enums/cacheEnum";
import { DEFAULT_CACHE_TIME } from "@/settings/encryptionSetting";
import { toRaw } from "vue";

interface BasicStore {
  [TOKEN_KEY]: string;
  [USER_INFO_KEY]: any;
  [PROJ_CFG_KEY]: ProjectConfig;
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[];
  [ROLES_KEY]: string[];
}

type LocalStore = BasicStore;
type SessionStore = BasicStore;

export type BasicKeys = keyof BasicStore;
type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

const ls = createLocalStorage();
const ss = createSessionStorage();

const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);

/**
 * @description 初始化存储器
 */
function initPersistentMemory() {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY);
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY);
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
}

/**
 * @description 执行类
 */
export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }

  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
    localMemory.set(key, toRaw(value));
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static removeLocal(key: LocalKeys): void {
    localMemory.remove(key);
  }

  static clearLocal(): void {
    localMemory.clear();
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>;
  }

  static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false): void {
    sessionMemory.set(key, toRaw(value));
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }

  static removeSession(key: SessionKeys): void {
    sessionMemory.remove(key);
  }

  static clearSession(): void {
    sessionMemory.clear();
  }

  static clearAll() {
    sessionMemory.clear();
    localMemory.clear();
  }
}

window.addEventListener("beforeunload", function () {
  ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
});

/**
 * @description 存储
 */
function storageChange(e: any) {
  const { key, newValue, oldValue } = e;

  if (!key) {
    Persistent.clearAll();
    return;
  }

  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal();
    }
    if (APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession();
    }
  }
}

window.addEventListener("storage", storageChange);

initPersistentMemory();
