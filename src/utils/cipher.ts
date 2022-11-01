import { encrypt, decrypt } from 'crypto-js/aes';
import { parse } from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';
import ECB from 'crypto-js/mode-ecb';
import md5 from 'crypto-js/md5';
import UTF8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
import { cacheCipher } from "@/settings/encryptionSetting";
import { cloneDeep } from "lodash-es";

export interface EncryptionParams {
  key: string;
  iv: string;
}

export class AesEncryption {
  private key;
  private iv;

  static instance;

  static getInstance() {
    if (!AesEncryption.instance) {
      AesEncryption.instance = new AesEncryption(cacheCipher);
    }
    return AesEncryption.instance;
  }

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key, iv } = opt;
    if (key) {
      this.key = parse(key);
    }
    if (iv) {
      this.iv = parse(iv);
    }
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv
    };
  }

  // 由 AES 加密
  encryptByAES(cipherText: string) {
    return encrypt(cipherText, this.key, this.getOptions).toString();
  }

  // 由 AES 解密
  decryptByAES(cipherText: string) {
    return decrypt(cipherText, this.key, this.getOptions).toString(UTF8);
  }
}

export const AES = AesEncryption.getInstance();

export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64);
}

export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8);
}

export function encryptByMd5(password: string) {
  return md5(password).toString();
}

/**
 * @description 加密
 */
export function AESEncrypt(json: any) {
  let data;
  try {
    data = JSON.stringify(cloneDeep(json));
  } catch (e) {
    data = cloneDeep(json);
  }

  return encodeURIComponent(AES.encryptByAES(data));
}

/**
 * @description 解密
 */
export function AESDecrypt(code: string) {
  if (!code) return undefined;
  const qr = decodeURIComponent(code);
  return JSON.parse(AES.decryptByAES(qr));
}
