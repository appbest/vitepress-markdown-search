/**
 * 读取Markdown 标题
 * date:2021/02/24
 */

const fs = require('fs');
const path = require('path');
const markdown = require('vitepress/dist/node/markdown/markdown');
const mdBll = markdown.createMarkdownRenderer();
// 文档路径
const { version } = require('../../package.json');

/**
  * 全站查询的文件名
  */
const KeywordName = '../keywords.json';

/**
  * 读取文件
  * @param {*} filePath 文件完整路径
  * @param {*} callback 读取返回
  */
const read = (filePath, callback) => {
  fs.readFile(filePath, 'utf8', callback);
};

/**
  * 判断文件是否存在
  * @param {*} filePath 
  * @param {*} callback 
  */
const test = (filePath, callback) => {
  fs.existsSync(filePath, callback);
};

/**
  * 写入文件
  * @param {*} filePath 文件完整路径
  * @param {*} body 写入内容
  * @param {*} callback 完成回调
  */
const write = (filePath, body, callback) => {
  fs.writeFile(filePath, body, 'utf8', callback);
};

/**
  * 全局搜索初始化
  * @param {*} sidebar 导航数据
  */
const KeywordInit = (sidebar, docsPath) => {
  // 搜索关键词
  let words = {};
  // 异步序号缓存
  let _arr = [];
  // 处理的总页数
  let _total = 0;

  const _filePath = path.join(__dirname, KeywordName);
  console.log('Search path', _filePath);
  // 异步读取文件
  read(_filePath, err => {
    console.log(!err ? 'is exist' : 'create file');

    if (err) {
      // 没有搜索数据， 循环路径采集生成数据
      for (let key in sidebar) {
        // console.log(key);
        for (let i = 0; i < sidebar[key].length; i++) {
          let _item = sidebar[key][i];
          _total++;
          // 路径
          const _url = docsPath + _item.link;
          getPageKeyword(_url, i, (index, pages) => {
            // 赋值
            words[_item.link] = pages;
            //异步序号
            _arr.push(index);
            if (_arr.length == _total) {
              // 表示所有的异步页面都读取完成
              // 创建新的查询数据
              write(_filePath, JSON.stringify(words), err => {
                if (err) {
                  console.log('bll.KeywordInit.err', err);
                }
              });
              console.log('bll.KeywordInit', _total);
            }
          });
        }
      }
    }
  });
};

/**
  * 采集页面关键词
  * @param {*} file 文件url
  * @param {*} index 文件异步序号
  * @param {*} callback 读取后回调处理
  */
const getPageKeyword = (file, index, callback) => {
  // 取出静态路径
  const _root = path.join(__dirname, '../../');

  // 替换文件，组合文件静态路径
  const _filePath = _root + file.replace(/[/]/g, '\\') + '.md';
  // console.log('ddd', _filePath);

  // 异步读取文件
  read(_filePath, (err, content) => {
    if (!err) {
      // 读取到文件内容
      // console.log('read', content);
      const { html, data } = mdBll.render(content);
      // const _md = mdBll.render(content);
      //获取文件修改时间
      const _info = fs.statSync(_filePath);

      //console.log('data', data);

      // 采集页面
      const _page = {
        // 最后修改的时间
        last: _info.mtime.getTime(),
        // 二级标题名
        children: data.headers,
      };

      //console.log('read.page' + file, _page);

      callback(index, _page);

      //  console.log('read.info', _info.mtime.getTime());
    } else {
      console.log('getPageKeyword.err：' + file, err);
    }
  });
};

module.exports = {
  KeywordName,
  KeywordInit,
  version,
  // read,
  // write,
};
