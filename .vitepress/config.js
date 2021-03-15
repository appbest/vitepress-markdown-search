/**
 * 文档路径
 */
const url = require('./plugin/url');
/**
 * 初始化页面的搜索数据
 */
const bll = require('./plugin/bll.js');
bll.KeywordInit(url.sidebar, '/docs/');

module.exports = {
  alias: {
    // 运行组件
    vue: 'vue/dist/vue.esm-bundler.js',
  },
  base: url.base, //基本url
  lang: 'zh-CN',
  title: 'Quick.Run',
  description: 'vitepress 在线文档 search搜索组件与 markdown 中运行与编辑 js代码 与vue 3.x 组件',
  // dist: '/html', //打包位置
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
      },
    ],
    [
      'meta',
      {
        name: 'keywords',
        content: 'quick,qve,js,docs,vite,vue,3.x,web,前端技术,ui,css',
      },
    ],
    // ['link', { href: '/@theme/styles/default.css', rel: 'stylesheet' }],
    // ['link', { rel: 'icon', href: '/favicon.ico' }],
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
    // [
    //   'script',
    //   { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' },
    // ],
  ],

  markdown: {
    // 代码显示行号
    lineNumbers: true,
  },
  themeConfig: {
    // port: 6868, //端口号
    //   dest: 'docs',
    docsDir: 'docs',
    author: 'aibo',
    sidebar: 'auto',
    sidebarDepth: 1,

    logo: 'img/logo.png',
    // search: true,
    // searchMaxSuggestions: 10,
    lastUpdated: true, // 更新时间
    nextLinks: true,
    prevLinks: true,
    nav: url.nav,
    sidebar: url.sidebar,
    // 搜索配置
    // algolia: {
    //   apiKey: 'your_api_key',
    //   indexName: 'index_name',
    // },
  },
  //plugins: url.plugins,
};
