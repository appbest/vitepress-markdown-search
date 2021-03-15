/** vue原生方法 */
import * as $vue from './vue.api';
/** 读取配置文件中的版本号*/
//import pkg from '../package.json';
//const version = pkg.version;
import { version } from '../package.json';

/** js 组件代码运行 */
import CodeRun from './components/code/run.vue';

/** 搜索文本框 */
import SearchBar from './components/search/bar.vue';

// 开发环境下调试样式
//if (process.env.NODE_ENV === 'development') {
//import './assets/styles/index.less';
//}

/**
 * 组件库
 */
const components = {
  CodeRun,
  SearchBar,
};

/**
 * vue 组件挂载
 * @param {*} app
 * @param {*} opts
 */
const install = function(app, opts) {
  opts = opts || {};
  // console.log('install');

  // 判断是否安装
  if (install.installed) return;

  Object.keys(components).forEach(key => {
    app.component(key, components[key]);
  });

  let _resp = `version:${version}`;

  if (typeof window !== 'undefined' && opts.plus) {
    // 全局挂载
    let $plus = {
      version,
      vue: $vue,
    };

    if (window.$plus) {
      // 添加其它自定义外挂
      for (let key in window.$plus) {
        $plus[key] = window.$plus[key];
      }
    }

    // 全局原生挂载
    window.$plus = $plus;
    _resp += ';window.$plus';
    // 读取当前外挂的组件
    _resp += '[';
    // 显示外挂的key
    for (let _key in $plus) {
      _resp += _key + ',';
    }
    _resp += `];`;
  }

  // 调试日志
  if (typeof opts.log !== 'undefined') {
    //调试日志输出
    console.log('quick.run', _resp);
  }
};

// 导出该组件
export default {
  install,
};

export { version, CodeRun, SearchBar };
