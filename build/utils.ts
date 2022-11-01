import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

export function isDevFn(mode: string): boolean {
  return mode === 'development';
}

export function isProdFn(mode: string): boolean {
  return mode === 'production';
}

/**
 * 是否生成包预览
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true';
}

export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
        console.log("wrapperEnv Error" + error);
      }
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}


/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script;
  const reg = new RegExp('--mode ([a-z]+)');
  const result = reg.exec(script as string) as any;
  if (result) {
    const mode = result[1] as string;
    return ['.env', `.env.${mode}`];
  }
  return ['.env', '.env.production'];
}

/**
 * 获取以指定前缀开始的环境变量
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig(match = 'VITE_GLOB_', confFiles = getConfFiles()) {
  let envConfig = {};
  // 循环文件名
  confFiles.forEach((item) => {
    try {
      // 同步读取根目录下指定的文件，将读取的六传入dotenv输出对象
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
      // 将新获取的对象追加到结果中，相同的覆盖
      envConfig = { ...envConfig, ...env };
    } catch (error) {
      console.log(error);
    }
  });

  // 检查输出结果
  Object.keys(envConfig).forEach((key) => {
    // 如果不是以传入的match变量开的就直接删除
    const reg = new RegExp(`^(${match})`);
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}


/**
 * 获取用户根目录
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}
