/**
 * 在打包时生成额外的配置文件。可以用一些全局变量配置文件，这样就可以直接从外部更改文件，而不需要重新打包
 */
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../constant';
import fs, { writeFileSync } from 'fs-extra';
import chalk from "chalk";

import { getEnvConfig, getRootPath } from '../utils';
import { getConfigFileName } from '../getConfigFileName';

import pkg from '../../package.json';

// 创建配置
function createConfig(
  {
    configName,
    config,
    configFileName = GLOB_CONFIG_FILE_NAME
  }: { configName: string; config: any; configFileName?: string } = { configName: '', config: {} }
) {
  try {
    const windowConf = `window.${configName}`;
    // 确保该变量不会被修改
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '');
    fs.mkdirp(getRootPath(OUTPUT_DIR));
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

    console.log(chalk.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`);
    console.log(chalk.gray(OUTPUT_DIR + '/' + chalk.green(configFileName)) + '\n');
  } catch (error) {
    console.log(chalk.red('configuration file configuration file failed to package:\n' + error));
  }
}

// 运行构建配置
export function runBuildConfig() {
  const config = getEnvConfig();
  const configFileName = getConfigFileName(config);
  createConfig({ config, configName: configFileName });
}
