import { cacheCipher } from "@/settings/encryptionSetting";
import type { EncryptionParams } from "@/utils/cipher";

import { AesEncryption } from "@/utils/cipher";
import { isNullOrUnDef } from "@/utils/is";

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string; // key 前缀
  storage: Storage; // 存储方法
  hasEncrypt: boolean; // 是否加密
  timeout?: Nullable<number>; // 过期时间
}

/**
 * @description 创建存储器
 * @param prefixKey 存储前缀
 * @param storage 存储方法
 * @param key 加密 key
 * @param iv 加盐 key
 * @param timeout 过期时间
 * @param hasEncrypt 开启加密
 */
export const createStorage = (
  {
    prefixKey = '',
    storage = sessionStorage,
    key = cacheCipher.key,
    iv = cacheCipher.iv,
    timeout = null,
    hasEncrypt = true
  }: Partial<CreateStorageParams> = {}
) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }

  const encryption = new AesEncryption({ key, iv });

  /**
   * 缓存类
   * 构造参数可以传递到 sessionStorage、localStorage、
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    private encryption: AesEncryption;
    private hasEncrypt: boolean;

    /**
     * @param {*} storage
     */
    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /**
     *  设置写入高速缓存
     * @param {string} key
     * @param {*} value
     * @expire 过期时间(秒)
     * @memberof Cache
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null
      });
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
    }

    /**
     * 根据 key 获取数据
     */
    get(key: string, def: any = null) {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      try {
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key);
      } catch (e) {
        return def;
      }
    }

    /**
     * 根据密钥删除缓存
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * 删除此实例的所有缓存
     */
    clear(): void {
      this.storage.clear();
    }
  };

  return new WebStorage();
};
