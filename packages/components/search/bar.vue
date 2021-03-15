<script>
//import { usePageData, useRoute, useSiteDataByRoute, useSiteData } from 'vitepress';
// import { useRouter } from 'vitepress';
import { reactive, ref } from '../../vue.api';

export default {
  props: {
    /** 搜索数据源 */
    words: {
      type: Object,
      default: () => {
        return [];
      },
    },
  },
  setup (props, { emit }) {
    // const pageData = usePageData();
    // const router = useRouter();
    // const siteData = useSiteData();

    const query = ref('');
    const queryWords = ref([]);

    const the = reactive({
      focused: false,
      /** 当前序号 */
      focusIndex: -1,
      /** 关键词 */
      // query: '',
      /** 查询关键词结果 */
      //words: [],
    });

    /** 服务器地址 */
    // const hostUrl = () => {
    //   // let _url = '';
    //   let _url = window.location.href;
    //   let _arr = _url.split('//');
    //   if (_arr.length > 1) {
    //     _url = _arr[0] + '//' + window.location.host;
    //   }
    //   return _url;
    // };

    /**
     * 搜索关键词
     * @param {*} value 输入关键词
     * @param {*} data 查询数据
     */
    const matchQuery = (value, data) => {
      if (!value || value.length < 1 || !data) {
        return;
      }
      // 关键词正则
      value = value.trim().toLowerCase();
      const reg = new RegExp(value);
      const _words = [];

      for (let key in data) {
        // 取出页面
        let _pages = data[key];
        //  console.log('key', key)

        for (let i in _pages.children) {
          let _item = _pages.children[i];
          // 关键词
          if (_item.title) {
            //如果字符串中不包含目标字符会返回-1
            if (_item.title.toLowerCase().match(reg)) {
              _words.push({
                path: key,
                ..._item,
              });
            }
          }
        }
      }

      // 当前搜索结果
      return _words;
    };

    /** 上键 */
    const onUp = () => {
      //  console.log('onUp')
      if (queryWords.value) {
        if (the.focusIndex > 0) {
          the.focusIndex--;
        } else {
          the.focusIndex = queryWords.value.length - 1;
        }
      }
    };

    /** 下键 */
    const onDown = () => {
      // console.log('onDown')

      if (queryWords.value) {
        if (the.focusIndex < queryWords.value.length - 1) {
          the.focusIndex++;
        } else {
          the.focusIndex = 0;
        }
      }
    };

    /**
     * 点击搜索
     */
    const btnSearch = () => {
      const _value = query.value;
      if (!_value || _value.length < 2) {
        if (queryWords.value.length > 0) {
          queryWords.value = [];
        }
        return;
      }
      queryWords.value = matchQuery(_value, props.words);
    };

    /** 跳转按钮 */
    const btnGo = i => {
      if (!queryWords.value) {
        return;
      }

      i = i || the.focusIndex;
      //  console.log('se', i);
      if (i < 0) {
        return;
      }

      // let _url = hostUrl() + siteData.value.base + queryWords.value[i].path;
      let _url = queryWords.value[i].path;
      //  console.log('btnGo' + i + siteData.value.base, hostUrl());

      if (queryWords.value[i].slug) {
        _url += '#' + queryWords.value[i].slug;
      }
      //  console.log(_url)
      // window.location.href = _url
      //  router.go(_url);
      // 向上触发
      emit("onEvent", { cmd: 'go', url: _url })
    };

    /**
     * 设置焦点
     * @param {*} i
     */
    const focus = i => {
      console.log('focus', i);
      if (i > -1) {
        the.focusIndex = i;
      } else {
        // 清除内容，隐藏窗口
        queryWords.value = [];
      }
    };

    return { the, query, queryWords, onUp, onDown, btnSearch, btnGo, focus };
  },
};

</script>

<template>
  <div class="code-search-bar">
    <input class="code-search-input"
           v-model="query"
           @input="btnSearch"
           @keyup.enter="btnGo(null)"
           @keyup.up="onUp"
           @keyup.down="onDown" />

    <i class="code-search-btn"
       @click="btnSearch">搜索</i>

    <ul class="code-search-words"
        @mouseleave="focus(-1)">
      <li v-for="(item,index) in queryWords"
          :key="index"
          :class="{ 'focused': index === the.focusIndex }"
          @click="btnGo(index)"
          @mousedown="btnGo(index)"
          @mouseenter="focus(index)">
        {{item.title}}
      </li>
    </ul>
  </div>
</template>