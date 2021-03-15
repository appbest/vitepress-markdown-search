# Quick.Code

> 一个 MarkDown 文档内 js 与 vue 3.x 组件代码在线编辑与执行

- [npmjs ](http://npmjs.com/package/qveui)
- [轻量级UI库 Vue 3](https://qve.gitee.io/docs/)

最常用的镜像地址：

https://github.com.cnpmjs.org
https://hub.fastgit.org

## 更新

- 1.0.8
  `2021-3-15`
  -  `quick.lib` 升级为 `0.3.3`

- 1.0.6
  `2021-2-21`

  - 适配搜索组件

- 1.0.5 [bug]
- 1.0.4 [bug]
  `2021-2-21`

  - `vitepress` 升级到 `0.12.2`
  - `vue` 升级到 `3.0.5`
  - 适配主题
  - 侧边栏适配
  - 搜索适配
  - 代码运行库适配`CodeRun`

- 1.0.3
  `2020-10-17`

  - `CodeRun` 代码组件更新样式绑定

- 1.0.2
  `2020-10-17`

  - `CodeRun` JS 代码组件

## `CodeRun` 代码在线调试组件

| 属性     | 说明                           | 类型    | 默认值   |
| -------- | ------------------------------ | ------- | -------- |
| editable | 代码可编辑                     | Boolean | false    |
| auto     | 初始自动执行                   | Boolean | false    |
| mini     | 不执行压缩 unmini,默认需要压缩 | Boolean | false    |
| ubb      | 不执行解码 ubb,默认需要转换    | Boolean | false    |
| styled   | code 层样式定义                | String  |          |
| dll      | quick.lib 需调试的 api 名称    | String  | 私有参数 |
| pars     | 初始传入组件绑定的参数         | -       | 私有参数 |

组件内包含的代码需要加语言类别，目前只支持 `js` `vue`

> js 代码结尾必须加 `;`

### 执行代码 Jscript

- 调试 quick.lib 库中的 json 函数

````
<CodeRun dll="json" styled="height:20rem" ubb editable>

```js
// js语言类别 在线测试执行代码
return 1+1;
     ```
</CodeRun>
````

### 执行组件 VUE

````
<CodeRun editable>

```vue
<template>
  <div class="code-index-page">
    <Badge dot>消息</Badge>
    <Badge :text="the.tag.text">消息数</Badge>
    <Button style="margin: 0 0.5rem;" type="primary" @click="onTagEvent">
      <Icon type="icon-jiahao" /> 加消息数
    </Button>
  </div>
</template>

<script>
// 在线调试不支持引入
//import { reactive } from 'vue';

export default {
  setup() {
    // 使用外挂方式引入，具体查看demo
    const $plus = window.$plus;
    const reactive = $plus.vue.reactive;
    // 组件变量
    const the = reactive({
      tag: {
        text: 9,
      },
    });

    /** 标签事件 */
    const onTagEvent = () => {
      console.log('onTagEvent:', the.tag.text);
      the.tag.text = the.tag.text + 1;
    };

    return { the, onTagEvent };
  },
};
</script>

<style lang="less">
.code-index-page {
  .qv-badge {
    margin: 0.5rem;
  }
}
</style>

        ```
</CodeRun>
````

## 快速开始

可快速搭建 vue 3.x 项目技术文档

- [查看在线代码测试文档](https://qve.gitee.io/docs/)

- [创建文档 vitePress](https://github.com/vuejs/vitepress)

- 安装组件

```bash
# npm 安装
npm i quick.run

# 调试vue
npm run dev

# 打包项目
npm run build
```

## vite 清除缓存目录，解决部分热更新问题

`/node_modules/.vite_opt_cache`

## 项目依赖

- [quick.lib](https://www.npmjs.com/package/quick.lib)

## 项目依赖

- [quick.lib](https://www.npmjs.com/package/quick.lib)
- [quick.run](https://www.npmjs.com/package/quick.run)

- [vitePress](https://github.com/vuejs/vitepress)

## 注意事项

### 二级目录路径问题

- 目录名与文件名，请使用小写

- 新`vitepress`已经解决，无需以下处理。

- vitepress 0.8.1 及以下

  需要发布为二级目录时，调试正常正式发布时会导致路径错误，
  需要修改以下文件。

  `node_modeules\vitepress\dist\client\app\utils.js`

  第 20 行（把整个 base 路径删除了导致 Bug 修改为 1 正常取值）

  ```js
  //pagePath = pagePath.slice(base.length).replace(/\//g, '_') + '.md';

  // 网站路径替换为文档目录
  pagePath = 'docs/' + pagePath.slice(base.length);
  pagePath = pagePath.replace(/\//g, '_') + '.md';
  // console.log(base,pagePath);
  ```