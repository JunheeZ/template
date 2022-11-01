import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import chalk from 'chalk';
import pkg from '../../package.json';

async function generateIcon() {
  // 这里面有所有Iconify的图标
  const dir = path.resolve(process.cwd(), 'node_modules/@iconify/json');

  // 获取所有图标的集合分类对象
  const raw = await fs.readJSON(path.join(dir, 'collections.json'));

  // 将分类对象输出到一个数组中
  const collections = Object.entries(raw).map(([id, v]) => ({
    ...(v as any),
    id
  }));

  // 分类数组作为选择项
  const choices = collections.map((item) => ({ key: item.id, value: item.id, name: item.name }));

  // 开始命令行问答
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'useType',
      choices: [
        { key: 'local', value: 'local', name: 'Local' },
        { key: 'onLine', value: 'onLine', name: 'OnLine' }
      ],
      message: 'How to use icons?'
    },
    {
      type: 'list',
      name: 'iconSet',
      choices: choices,
      message: 'Select the icon set that needs to be generated?'
    },
    {
      type: 'input',
      name: 'output',
      message: 'Select the icon set that needs to be generated?',
      default: 'src/components/Icon/data'
    }
  ])
  // 命令行问答的答案
  .then(async (answers) => {
    const { iconSet, output, useType } = answers;
    // 生成图标集合存储的地方
    const outputDir = path.resolve(process.cwd(), output);
    // 确保目录存在。如果目录结构不存在，则会创建它。
    fs.ensureDir(outputDir);
    // 从分类集合信息数组中取出选择的分类
    const genCollections = collections.filter((item) => [iconSet].includes(item.id));
    // 这个数组用来最后在命令行打印分类名称的
    const prefixSet: string[] = [];
    for (const info of genCollections) {
      // 读取指定分类的图标信息文件
      const data = await fs.readJSON(path.join(dir, 'json', `${info.id}.json`));
      if (data) {
        const { prefix } = data;
        const isLocal = useType === 'local';
        const icons = Object.keys(data.icons).map(
          (item) => `${isLocal ? prefix + ':' : ''}${item}`
        );

        await fs.writeFileSync(
          path.join(output, `icons.data.ts`),
          `export default ${isLocal ? JSON.stringify(icons) : JSON.stringify({ prefix, icons })}`
        );
        // 分类处理完成，push类型名称
        prefixSet.push(prefix);
      }
    }
    // ↓将vite的缓存清空
    fs.emptyDir(path.join(process.cwd(), 'node_modules/.vite'));
    console.log(`✨ ${chalk.cyan(`[${pkg.name}]`)}` + ' - Icon generated successfully:' + `[${prefixSet}]`);
  });
}

generateIcon();
