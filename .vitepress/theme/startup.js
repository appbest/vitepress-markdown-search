/** 全局组件配置 */

// 全局样式
import 'vitepress/dist/client/theme-default/styles/code.css';
import 'vitepress/dist/client/theme-default/styles/vars.css';
import 'vitepress/dist/client/theme-default/styles/custom-blocks.css';
import 'vitepress/dist/client/theme-default/styles/layout.css';

// vitepress 1.2.2样式
// import 'vitepress/dist/client/theme-default/styles/vars.css';
// import 'vitepress/dist/client/theme-default/styles/layout.css';
// import 'vitepress/dist/client/theme-default/styles/code.css';
// import 'vitepress/dist/client/theme-default/styles/custom-blocks.css';
// import 'vitepress/dist/client/theme-default/styles/sidebar-links.css';

// import 'qveui/dist/fonts/iconfont.css';
// import 'qveui/dist/styles/index.less';

import '../../packages/assets/styles/index.less';
import './styles/index.css';

import quick from 'quick.lib';

//引入编辑组件搜索组件
import code from '../../packages';

/**
 * 组件库
 */
// const components = {
//   SearchBox,
// };

const install = function(app, opts) {
  // 判断是否安装
  if (install.installed) return;

  // Object.keys(components).forEach(key => {
  //   app.component(key, components[key]);
  // });

  // 引入测试js库
  app.use(quick, {
    init: true,
  });

  // 引入测试UI
  // app.use(qveui, {
  //   init: true,
  //   log: { isPrint: true },
  // });

  // 引入组件库
  app.use(code, {
    plus: true,
    log: true,
  });
};

// 导出该组件
export default {
  install,
};
