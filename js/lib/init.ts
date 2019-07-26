// 初始化语法高亮
import $ from 'jquery';

if (window.hljs) {
  if (window.hljs.initHighlightingOnLoad) {
    window.hljs.initHighlightingOnLoad();
  } else {
    $(function () {
      window.hljs && window.hljs.initHighlightingOnLoad();
    });
  }
}