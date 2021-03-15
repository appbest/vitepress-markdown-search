<!-- 运行组件模型 -->
<script >
import { ref, reactive, onMounted, markRaw } from '../../vue.api';
import { html, lib } from 'quick.lib';
import * as quick from 'quick.lib';
import { codeUnpack } from './code.js';

export default {
  props: {
    /** 可编辑模式 */
    editable: {
      type: Boolean,
      default: false,
    },
    /** 类库名 */
    dll: {
      type: String,
      default: '',
    },
    /** 初始自动执行 */
    auto: {
      type: Boolean,
      default: false,
    },
    /** 不压缩代码 */
    mini: {
      type: Boolean,
      default: false,
    },
    /** 不执行解码ubb */
    ubb: {
      type: Boolean,
      default: false,
    },
    /** 输出调试日志 */
    test: {
      type: Boolean,
      default: false,
    },
    /** Code层样式定义 */
    styled: {
      type: String,
      default: '',
    },
    // 传入组件绑定的参数
    pars: {
      type: [String, Object, Array, Number],
      default: null,
    },
  },
  setup (props, { attrs }) {
    /**
     * 代码组件
     */
    const codeRef = ref(null);
    /**
     * 当前组件对象
     */
    const the = reactive({
      // 动态组件
      component: null,
      // 传入参数
      props: props.pars,

      /** 提示消息 */
      msg: '',
      /** 执行语言 */
      lang: 'vue'
    });

    /** 获取代码 */
    const getCodeByRef = () => {
      let _code
      // 取出代码标签对象
      let _dom = codeRef.value.getElementsByTagName('pre');
      if (_dom) {
        if (_dom.length < 1) {
          throw new Error('no find code pre dom')
        }
        // 取出代码
        _code = _dom[0].innerHTML;
      }
      //console.log('code:', _code);
      // 清除html 标签
      return html.tagDel(_code).trim();
    };

    /** 运行代码 */
    const btnDo = () => {
      log(the.lang + ' ...');


      try {

        // 可编辑代码
        let _code = getCodeByRef();

        if (props.test) { console.log('code', _code); }

        if (!props.ubb) {
          // 默认 html 转ubb
          _code = quick.lib.ubbDecode(_code);
          if (props.test) { console.log('ubb', _code); }
        }

        if (!props.mini) {
          // 默认压缩代码
          _code = quick.html.mini(_code);
          if (props.test) { console.log('mini', _code); }
        }

        switch (the.lang) {
          case 'vue':
            doVue(_code)
            break;
          case 'js':
            doJs(_code)
            break;
          default:
            throw new Error('not code lang')
        }

      } catch (e) {
        console.error(e);
        log('btnDo.lang:' + the.lang + ',error:' + e.message);
      }

    };

    /** 执行vue 代码 */
    const doVue = (_code) => {
      // 服务器模板内容解析
      const _view = codeUnpack(_code);

      if (_view.style) {

        // 必须是http开头或者https开头，结尾为'/'
        let _styleId = window.location.href.replace(/^http(s)?:\/\/(.*?)\//, '');
        _styleId = 'qkcss_' + _styleId.replace(/\//g, '_')
        //  console.log('style', _styleId)

        // 是否已经添加了样式
        if (!document.getElementById(_styleId)) {
          // 将新样式添加到头部
          let style = document.createElement("style");
          style.type = "text/css";
          style.id = _styleId;
          if (_view.style.lang) {
            style.rel = "stylesheet/" + _view.style.lang;
          }
          style.innerHTML = _view.style.body;

          document
            .getElementsByTagName("HEAD")
            .item(0)
            .appendChild(style);
        }

      }

      // console.log('component', typeof _view.component)
      if (_view.component) {
        //  console.log('component', _view.component.template)
        // 绑定组件
        the.component = markRaw(_view.component);
      }

      log('');
    }

    /** 执行vue 代码 */
    const doJs = (_code) => {
      const _class = quick[props.dll];
      // 执行代码(传入代码，类库名，类库)
      let _resp = quick.bll.run(_code, props.dll, _class);
      // 输出结果
      log(_resp);
    }

    /** 撤销重置 */
    const btnUndo = () => {
      log('');
      the.component = markRaw({ template: '' });
    }

    /** 打印输出 */
    const log = (cont) => {
      if (typeof cont == 'string') {
        // 转html 显示 正则表达式中的特殊字符
        // 替换空格
        //cont = cont.replace(/\t/gi, '&nbsp;');
        //换行
        cont = cont.replace(/\n/g, '<br>');
        // \t 匹配 tab键
        cont = cont.replace(/\s/g, '&nbsp;&nbsp;');
      } else {
        cont = JSON.stringify(cont, null, 2);
      }

      the.msg = cont;
    }

    onMounted(() => {
      // 初始化取出语言
      let _lang = codeRef.value.querySelector('div[class*=language]').className;
      // 去除语言标识
      _lang = _lang.replace('language-', '')
      // 去除行号标识
      the.lang = _lang.replace(' line-numbers-mode', '')
      // 是否自动运行
      if (props.auto) {
        btnDo()
      }
    });
    return { btnDo, btnUndo, the, codeRef };
  },
};

</script>
<template>
  <div class="lib-code-run">
    <!-- 动态组件-->
    <div id="code-model-bind"
         class="model-bind">
      <component :is="the.component"
                 v-bind="the.props" />
    </div>

    <div class="model-resp"
         v-html="the.msg" />

    <div class="tools">
      <i class="code-btn code-btn-do"
         @click="btnDo"
         title="执行代码">></i>
      <i class="code-btn code-btn-undo"
         @click="btnUndo"
         title="重置恢复">{}</i>
    </div>
    <div class="code"
         ref="codeRef"
         :style="styled"
         :class="{'edit':editable}"
         :contentEditable="editable">
      <slot></slot>
    </div>
  </div>
</template>