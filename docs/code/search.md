# Search 搜索组件

 - 通过启用配置引入`bll.js`创建 `keywords.json` 搜索数据源

## Search 搜索引入

- config 配置文件引入

```js
/**
 * 文档路径
 */
const url = require('./plugin/url');

/**
 * 初始化页面的搜索数据
 */
const bll = require('./plugin/bll.js');
bll.KeywordInit(url.sidebar, '/docs/');

```

## url 文档路径

 - url.js

```js

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
      { text: 'NPM 更新', link: 'https://www.npmjs.com/package/quick.run' },
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
      text: '搜索组件',
      link: 'index',
    },
    {
      text: '运行组件',
      link: 'run',
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
        // 补充路径
        item.link = e.link + item.link;
      });
    }
  });

  _sidebar[_key] = sidebar[k];
}

sidebar = _sidebar;

module.exports = {
  base,
  nav,
  sidebar,
  plugins,
};


```

## 生成搜索数据源

引入`plugin/bll.js`