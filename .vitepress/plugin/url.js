/**
 * 打包网站的路径
 * 目录名与文件名，请使用小写
 */
let base = '/docs/';

// 开发环境使用 easy-mock 数据，正式环境使用 json 文件
//if (process.env.NODE_ENV === 'development') {
// if (process.env.npm_lifecycle_event === 'dev') {
//   base = '/docs/';
// }

/**
 * 顶部导航
 */
const nav = [
  { text: '主页', link: '/' },
  {
    text: '代码组件',
    link: 'code/',
  },
  {
    text: '更多',
    link: '',
    items: [
      { text: '码云', link: 'https://gitee.com/qve/docs' },
      { text: 'Github', link: 'https://github.com/appbest/QuickDocs' },
      { text: 'NPM 更新', link: 'https://www.npmjs.com/package/quick.lib' },
    ],
  },
];

/**
 * 左侧导航分类
 */
let sidebar = {
  // 文档根目
  '': [
    {
      text: '介绍',
      link: 'index',
    },
  ],
  // 文档目录
  'code/': [
    {
      text: '介绍',
      link: 'index',
    },
    {
      text: 'MarkDown 组件',
      link: 'run',
    },
    {
      text: '搜索组件',
      link: 'Search',
    },

    {
      text: '语法高亮',
      link: 'prism',
    },
  ],
};

let _sidebar = {};

// 路径处理
for (let k in sidebar) {
  let _key = base + k;
  console.log('sidebar', _key);
  sidebar[k].forEach(e => {
    e.link = k + e.link;
    if (e.children) {
      // 有下级
      e.children.forEach(item => {
        // let _path=e.link||'';
        // 补充路径
        item.link = e.link + item.link;
      });
    }
  });

  _sidebar[_key] = sidebar[k];
}

sidebar = _sidebar;

// array.forEach(element => {

// });

/**
 * 外挂
 */
const plugins = {
  '@vssue/vuepress-plugin-vssue': {
    platform: 'github',

    owner: 'artskin',
    repo: 'vuepress',
    clientId: 'be6226886eb40a308a27',
    clientSecret: 'e0b8c567ae32beb6cf994c064ecc69c0571c9f70',
  },
  gitalk: true,
  'demo-block': true,
  'vuepress-plugin-typescript': true,
  typescript: {
    tsLoaderOptions: {},
  },
  axios: true,
};

//export { base, nav, sidebar, plugins };

module.exports = {
  base,
  nav,
  sidebar,
  plugins,
};
