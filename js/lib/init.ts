// 初始化语法高亮
if (hljs) {
  if (hljs.initHighlightingOnLoad) {
    hljs.initHighlightingOnLoad();
  } else {
    $(function () {
      hljs && hljs.initHighlightingOnLoad();
    });
  }
}