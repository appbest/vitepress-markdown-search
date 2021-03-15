// 主界面
//import Layout from 'vitepress/dist/client/theme-default/Layout.vue';
import Layout from './Layout.vue';
// 找不到
import NotFound from 'vitepress/dist/client/theme-default/NotFound.vue';
// 启动配置
import startup from './startup.js';

export default {
  Layout,
  NotFound,
  // NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    //console.log(siteData.siteData);

    app.use(startup, {
      plus: true,
      log: true,
      siteData: siteData.siteData,
    });
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
  },
};

// // Theme API.
// module.exports = (options, ctx) => ({
//   plugins: ['@vuepress/search', '@vuepress/plugin-nprogress'],
// });
