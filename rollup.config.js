import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel'; //让代码支持es6语法
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser'; //压缩代码
import json from 'rollup-plugin-json';

/**
 * 当前编译模式
 */
const mode = {
  out: {
    min: true,
  },
  // 输出配置
  output: {},
};

// 按配置输出
switch (process.env.NODE_ENV) {
  case 'esm':
    // 组件模块 按需引用的代码打包
    mode.out.esm = true;
    mode.out.min = true;
    mode.output = [
      {
        file: 'dist/lib/quick.run.umd.js',
        name: 'quick.run',
        format: 'umd',
      },
      {
        file: 'dist/lib/quick.run.es.js', // 打包后输出文件
        format: 'esm',
        name: 'quick.run', // 打包后的内容会挂载到window，name就是挂载到window的名称
        sourcemap: true, // 代码调试  开发环境填true
      },
    ];
    break;
}

console.log(JSON.stringify(mode.out), 'mode:' + process.env.NODE_ENV);

export default [
  {
    input: 'packages/index.js',
    // 分离不打包
    external: ['vue', 'vitepress', 'qveui', 'quick.lib'],
    output: mode.output,
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**', // 排除node_modules 下的文件
      }),
      resolve({
        extensions: ['.vue', '.js', '.css'],
      }),
      vue({
        template: {
          isProduction: true,
        },
      }),
      // json读取
      json(),
      // 开发环境不压缩代码
      mode.out.min && terser(),
      copy({
        targets: [
          { src: 'packages/assets/styles/*.less', dest: 'dist/styles' },
          { src: 'packages/styles/index.css', dest: 'dist/styles' },
          { src: 'packages/assets/fonts/*', dest: 'dist/fonts' },
          { src: 'packages/assets/img/*', dest: 'dist/img' },
        ],
      }),
    ],
  },
];
