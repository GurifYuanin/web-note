$(function(){function t(t,e){return"a"===e?'<a href="./'+t+'.html">'+t+"</a><br>":"<"+e+">"+t+"</"+e+">"}function n(t){return t=t||window,{width:window.innnerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}}for(var o=$("#sidebar"),e=$("#hideCatalog"),a=$("#showCatalog"),i=$("#title"),d=$("#container"),s=["HTML","CSS","Javascript","NodeJS","VueJS","移动Web","调试","协议","安全","后端","其他"],r=[["meta标签","href和src","link","script","HTML语义化","HTML5","canvas","svg"],["选择器","盒式模型","元素种类","元素定位","元素居中","伪类伪元素","格式化上下文","CSS Hack","CSS3","CSS怪异现象","颜色和长度","百分比"],["数据类型","数组和字符串","循环","作用域链","原型链","闭包","事件","同源策略","JSONP","this","jquery","promise"],["commonJS","package.json","path","process","webpack","plugins","loader"],["安装","实例","模版","组件","mixins","router","vuex"],["响应式布局","bootstrap"],["抓包工具","chrome devtools"],["HTTP"],["CSRF","XSS"],["Thinkphp5.1","htaccess"],["浏览器渲染","设计策略","cookie","头疼的兼容","命名规范","字符编码"]],c=$("html, body"),l=0;l<s.length;l++){o.append(t('<img src="../images/slide_down.png">'+s[l],"h3"));for(var h="",f=0;f<r[l].length;f++)h+=t(t(r[l][f],"a"),"div");o.append(t(h,"section"))}$("#sidebar h3").each(function(){var t=$(this),e=t.children();t.click(function(){"../images/slide_down.png"===e.attr("src")?e.attr("src","../images/slide_up.png"):e.attr("src","../images/slide_down.png"),t.next().slideToggle("slow")})});var u=n().width/3;i.after('<svg style="display: block; margin: auto; width:'+u+'px" xmlns="http://www.w3.org/2000/svg" version="1.1" height="1px"><path id="line" d="M 0 0 L '+u+' 0" style="stroke: #000; stroke-width: 1; stroke-dasharray: '+u+"; stroke-dashoffset: "+u+'; fill: none;"/></svg>');var g=$("#line");function v(t,e,i,n){var o,a,s=(e-t)/i,r=1e3*n/i;t<e?(o=4,a=1/i):(o=5,a=-1/i);for(var c=t,l=0;c!=e;c+=s,o+=a,l+=r)!function(){var t=c+"%",e="0 "+o+"%";setTimeout(function(){d.css({width:t,margin:e})},l)}();setTimeout(function(){o+=a,d.css({width:e+"%",margin:"0 "+o+"%"})},1e3*n)}function p(t){"返回顶部"===t?c.animate({scrollTop:0},500):c.animate({scrollTop:$("#"+t).offset().top},500)}function m(t){return t.replace(/[\s@#&;()/.]/g,"")}i.mouseover(function(t){i.animate({"padding-top":"1%","padding-bottom":"1%"},"fast"),g.animate({"stroke-dashoffset":0},"fast")}),i.mouseout(function(t){i.animate({"padding-top":"0","padding-bottom":"0"},"fast"),g.animate({"stroke-dashoffset":u},"fast")}),e.attr("title","点击隐藏侧栏"),e.click(function(t){o.animate({width:"0",padding:"0"},"slow",function(){o.css("display","none"),a.css("display","block")}),v(65,90,25,1),t.stopPropagation(),window.event.cancelBubble=!0}),a.attr("title","点击显示侧栏"),a.click(function(t){var e,i=n().width;i<400?(i="100%",e="0"):(i="25%",e="1%"),o.css("display","inline-block"),a.css("display","none"),o.animate({width:i,padding:e},"slow"),v(90,65,20,.5)}),$("a").not(".self").attr("target","_blank");var w=$("#container>section>h2"),b="",T="";for(l=1;l<=4;l++)T+='<div class="block'+l+'"></div>';T='<div id="subTitleToggle">'+T+"</div>",w.each(function(){var e=m(this.innerHTML);$(this).wrap('<a style="height: 50%; margin: 0; padding: 0; text-decoration: none; color: #000;" id="'+e+'" href="#'+e+'"></a>'),$(this).click(function(t){p(e)}),b+='<div class="subTitleItem">'+this.innerHTML+"</div>"}),b='<div id="subTitleNav">'+b+'<div class="subTitleItem">返回顶部</div></div>',$("body").append(b+T);var k=$(".subTitleItem"),y=($("#subTitleNav"),$("#subTitleToggle")),S=$("#subTitleToggle div");k.each(function(){var e=m(this.innerHTML);$(this).click(function(t){p(e)})});var x=!1,H=!1,I=50,C=100;function L(){x=!0;for(var e=0,i=0;i<k.length;i++,e+=I)!function(){var t=i;setTimeout(function(){k.eq(t).fadeOut(100)},e)}();for(i=0;i<S.length;i++,e+=C)!function(){var t=i;setTimeout(function(){S.eq(t).show("fast")},e)}();setTimeout(function(){x=!1},k.length*I+S.length*C),H=!1}y.attr("title","点击显示子标题导航"),y.click(function(t){var e=0;for(l=S.length;0<=l;l--,e+=C)!function(){var t=l;setTimeout(function(){S.eq(t).hide("fast")},e)}();for(l=k.length-1;0<=l;l--,e+=I)!function(){var t=l;setTimeout(function(){x||k.eq(t).fadeIn(100)},e)}();H=!0,t.stopPropagation(),window.event.cancelBubble=!0}),document.body.onclick=L;var M=!0;function P(t){return"没有了"===t?'<a href="javascript:void(0)">'+t+"</a>":'<a href="./'+t+'.html">'+t+"</a>"}$(window).scroll(function(){var t=$(this).scrollTop(),e=$(document).height();t+$(this).height()===e?(y.stop().hide("slow"),M=!0):M&&(y.stop().show("slow"),M=!1),H&&L()});var q,J,N,_,O=window.location.href,W=decodeURI(O.substring(O.lastIndexOf("/")+1,O.lastIndexOf("."))),j=!1,B=r.length;for(l=0;l<B;l++){for(f=0;f<r[l].length;f++)if(W===r[l][f]){_=f,j=!0;break}if(j){N=l;break}}q=0===N?0===_?"没有了":r[N][_-1]:0===_?r[N-1][r[N-1].length-1]:r[N][_-1],J=N===B-1?_===r[N].length-1?"没有了":r[N][_+1]:_===r[N].length-1?r[N+1][0]:r[N][_+1],q=P(q),J=P(J),$(".refer").after('<div id="footer" ><div class="prePage">上一篇：'+q+'</div><div class="nextPage">下一篇：'+J+"</div></div>"),$("#catalogFrame img").click(function(t){var e=$(this).next().next();console.dir(e),void 0!==e&&"DIV"===e.prop("tagName")&&e.toggle(500)}),$("table").attr({border:1,cellpadding:1,cellspacing:0})});