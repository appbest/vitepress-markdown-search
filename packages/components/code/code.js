import { html } from 'quick.lib';

/**
 * 解析远程视图组件
 * @param {*} resp 组件内容
 * @param {object} props 初始化组件参数
 *  返回{component,js:{body,attr},template:{body,attr},version,style:{body,attr,lang}}
 */
const codeUnpack = (resp, props) => {
  if (!resp) {
    return;
  }
  // 定义动态组件
  let _view = {};
  //  console.log('view', resp);
  try {
    // 服务器模板内容解析
    _view = html.unpack(resp);
    //  console.log('view', _view);
    // 解析JS 组件代码
    if (_view.js && _view.js.body) {
      // try {

      // 替换语法 兼容 es6 import
      let _index = _view.js.body.indexOf('export default');
      let _body;
      if (_index >= 0) {
        _body = _view.js.body.substr(0, _index) || '';
        _body +=
          ' return ' + _view.js.body.substr(_index + 'export default'.length);
      }
      // console.log('tpl-b', _body);
      // 组件传入的参数
      props = props || {};
      // eslint-disable-next-line no-new-func
      let _component = new Function('props', _body); // 局部函数内声明
      _view.component = _component(props); // 传入组件参数绑定
    }
    _view.component = _view.component || {};

    if (_view.template && _view.template.body) {
      // 绑定解析的模板
      _view.component.template = _view.template.body || '';
    }
  } catch (err) {
    // console.log('tplBind:' + JSON.stringify(option));
    // console.log('tplBindResp:' + resp);
    // console.log('tpl', err);
    _view.error = err;
    _view.component = {
      template: `<div class='model-error'><b>组件解析失败！</b><div>请检查代码规范与错误</div>${err}</div>`,
    };

    // throw err;
  }
  // console.log('tpl-r', _view);
  return _view;
};

export { codeUnpack };
