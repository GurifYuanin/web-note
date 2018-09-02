function formatDate(t){if((t=t||new Date)instanceof Date){let e=t.getFullYear(),n=t.getMonth()+1;n=n<10?"0"+n:n;let i=t.getDate();i=i<10?"0"+i:i;let a=t.getHours();a=a<10?"0"+a:a;let s=t.getMinutes();s=s<10?"0"+s:s;let o=t.getSeconds();return`${e}-${n}-${i} ${a}:${s}:${o=o<10?"0"+o:o}`}return/^\d+$/.test(t)?formatDate(new Date(Number.parseInt(t))):t}function wrapByA(t,e,n){return"<a "+(n?"target="+n+" ":"")+'href="'+("没有了"===t?"javascript:void(0)":"./"+t+".html")+'">'+(e||t)+"</a>"}function wrapByTag(t,e){return"a"===e.toLowerCase()?wrapByA(t):"<"+e+">"+t+"</"+e+">"}function filterName(t){return t.replace(/[\s$@#&;()\/.'"]/g,"")}function getViewport(t){return{width:(t=t||window).innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:t.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}}function scrollTo(t,e){"返回顶部"!==t&&t?e?e.animate({scrollTop:$("#"+t).offset().top-100},500):$("html, body").animate({scrollTop:$("#"+t).offset().top},500):$("html, body").animate({scrollTop:0},500)}function getSuffix(t){return t.substring(t.lastIndexOf(".")+1)}function $Notify(){this.win=document.createElement("div"),this.win.setAttribute("class","notify"),this.win.style.opacity="0",this.win.style.zIndex="3",document.body.appendChild(this.win),this.timeout=null}hljs&&hljs.initHighlightingOnLoad?hljs.initHighlightingOnLoad():$(function(){hljs&&hljs.initHighlightingOnLoad()}),$Notify.prototype.info=function(t){t.duration=t.duration||2e3;var e=this.win;e.innerText=t.content,e.style.opacity="1",e.style.transition="all 1s",this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.style.opacity="0"},t.duration)},$(function(){var t=document.createElement("meta"),e=document.createElement("link"),n=document.createElement("script");n.setAttribute("src","/static/js/auto-push-to-baidu.js"),e.setAttribute("rel","shortcut icon"),e.setAttribute("href","../images/web-note.ico"),e.setAttribute("type","image/vnd.microsoft.icon"),t.setAttribute("name","viewport"),t.setAttribute("content","width=device-width, initial-scale=1"),document.head.appendChild(t),document.head.appendChild(e),document.head.appendChild(n);for(var i=window.location.href,a=decodeURI(i.substring(i.lastIndexOf("/")+1,i.lastIndexOf("."))),s=$("#sidebar"),o=$("#hideCatalog"),r=$("#showCatalog"),l=$("#catalog"),c=$("#title"),d=$("#container"),u=["HTML","CSS","Javascript","NodeJS","VueJS","移动Web","工具","协议","安全","测试","后端","其他"],p=[["DOM","meta标签","href和src","link","script","HTML语义化","HTML5","canvas","svg"],["选择器","盒式模型","元素种类","元素定位","元素居中","伪类伪元素","格式化上下文","CSS Hack","CSS3","CSS怪异现象","颜色和长度","百分比"],["数据类型","数组字符串与对象","循环","作用域链","原型链","闭包","事件","复制粘贴","RegExp","XMLHttpRequest","Class","JSONP","this","jquery","promise","Generator","async","Typescript"],["commonJS","package.json","path","file system","process","webpack","plugins","loader"],["安装","实例","模版","组件","mixins","router","vuex"],["响应式布局","bootstrap","viewport"],["抓包工具","chrome devtools","git","sublime 插件"],["HTTP"],["CSRF","XSS","同源策略"],["karma","Vue Test Utils"],["Thinkphp5.1","htaccess"],["路径匹配","浏览器渲染","设计策略","cookie","头疼的兼容","命名规范","字符编码","算法规范","bat"]],m="",h=0;h<u.length;h++){m+=wrapByTag('<img src="../images/slide_down.png">'+u[h],"h3");for(var f=0,g="";f<p[h].length;f++)g+="<div"+(p[h][f]===a?' id="currentItem" ':"")+">"+wrapByA(p[h][f])+"</div>";m+=wrapByTag(g,"section")}s.append(m),l.append('<section id="searchContainer"><input id="searchInput" type="text" placeholder="搜索文章"/><section id="searchResult"></section></section>');var y=$("#searchInput"),v=$("#searchResult"),b=0;function w(t){var e="";return p.forEach(function(n,i){n.forEach(function(n){try{var a=new RegExp(t,"i");a.test(n)&&(e+=wrapByTag(wrapByA(n,n.replace(a,'<span class="filteredHightLight">'+n.match(a)+"</span>")+' <span class="filteredCategory">('+u[i]+")</span>","_blank"),"li"))}catch(t){}})}),e}v.css("display","none"),y.keyup(function(t){var e=y.val()||"",n=""===e.trim()?"":w(e);if(""===n.trim()){if(v.slideUp(),""===e.trim())return;var i=e.split("");i=function(t){var e=[];if(window.Set)e=[...new Set(t)];else for(var n=[],i=0;i<t.length;i++){for(var a=!0,s=0;s<t.length;s++)if(t[i]===t[s]&&i!==s){-1===n.indexOf(t[i])&&(n.push(t[i]),e.push(t[i])),a=!1;break}a&&e.push(t[i])}return e}(i);for(var a=[],s=0;s<i.length;s++)n=(a=w(i[s])).length>n.length?a:n;if(""===n)return}(t.keyCode<37||t.keyCode>40)&&13!==t.keyCode&&(v.html(n),v.stop(!0,!0).slideDown());var o=$("#searchResult li");switch(t.keyCode){case 13:var r=o.toArray().findIndex(function(t){return"rgb(239, 239, 239)"===t.style.backgroundColor});r=-1===r?0:r,window.open("./"+o.eq(r)[0].innerText.replace(/\s\(.+\)$/,"")+".html");break;case 37:break;case 38:b>0&&b--,b<o.length&&o.eq(b).css("background-color",""),b>0&&o.eq(b-1).css("background-color","rgb(239, 239, 239)");break;case 39:break;case 40:b>0&&o.eq(b-1).css("background-color",""),b<o.length&&(o.eq(b).css("background-color","rgb(239, 239, 239)"),b++);break;default:b=0}}),d.click(function(){v.css("display","none")});var x=!0,T=$("#sidebar h3");T.each(function(){var t=$(this),e=t.children();t.click(function(){"../images/slide_down.png"===e.attr("src")||"../images/slide_down_dark.png"===e.attr("src")?e.attr("src",x?"../images/slide_up.png":"../images/slide_up_dark.png"):e.attr("src",x?"../images/slide_down.png":"../images/slide_down_dark.png"),t.next().slideToggle("slow")})});var k=getViewport().width/3;c.after('<svg title="点击切换样式" style="display: block; margin: auto; width:'+k+'px" xmlns="http://www.w3.org/2000/svg" version="1.1" height="1px"><path id="line" d="M 0 0 L '+k+' 0" style="stroke: #000; stroke-dasharray: '+k+"; stroke-dashoffset: "+k+'; fill: none;"/></svg>');var C=$("#line");c.mouseover(function(){c.animate({"padding-top":"1%","padding-bottom":"1%"},"fast"),C.animate({"stroke-dashoffset":0},"fast")}),c.mouseout(function(){c.animate({"padding-top":"0","padding-bottom":"0"},"fast"),C.animate({"stroke-dashoffset":k},"fast")});var A=new $Notify,E=document.createElement("textarea");E.style.display="none",document.body.appendChild(E),$(".hljs").each(function(t,e){var n=document.createElement("div"),i=document.createElement("div");n.setAttribute("class","codeType"),i.setAttribute("class","codeCopy"),i.setAttribute("title","点击复制代码");var a=e.getAttribute("class").split(" ")[0];n.innerText=a,i.style.right=8*n.innerText.length+(10-n.innerText.length)+"px",i.onclick=function(){DataTransfer&&window.clipboardData instanceof DataTransfer?window.clipboardData.setData("text",e.innerText.replace(a,"")):(E.style.display="inline-block",E.value=e.innerText.substring(1,e.innerText.lastIndexOf("\n")),E.select(),document.execCommand("copy"),E.style.display="none"),A.info({content:"已经复制到剪切板"})},e.appendChild(n),e.appendChild(i)});var I=$("link").eq(2),S=$("link").eq(1),L=$("#sidebar h3 img"),H=$("#hideCatalog");function M(t,e,n,i){var a,s,o=(e-t)/n,r=1e3*i/n;t<e?(a=4,s=1/n):(a=5,s=-1/n);for(var l=t,c=0;l!==e;l+=o,a+=s,c+=r)!function(){var t=l+"%",e="0 "+a+"%";setTimeout(function(){d.css({width:t,margin:e})},c)}();setTimeout(function(){a+=s,d.css({width:e+"%",margin:"0 "+a+"%"})},1e3*i)}c.click(function(){I.attr("href",x?"../css/dark.css":"../css/bright.css"),S.attr("href",x?"../css/styles/agate.css":"../css/styles/default.css"),C.css("stroke",x?"#fff":"#000"),H.attr("src",x?"../images/catalog_dark.png":"../images/catalog.png"),L.each(function(t,e){var n=e.src;e.src=x?n.substring(0,n.lastIndexOf("."))+"_dark.png":n.substring(0,n.lastIndexOf("_"))+".png"}),$("a").each(function(t,e){e.href=x?e.href+"?theme=dark":e.href.replace("?theme=dark","")}),$(".codeCopy").toggleClass("codeDark"),x=!x}),i.indexOf("?theme=dark")>=0&&c.click(),o.attr("title","点击隐藏侧栏"),o.click(function(t){s.animate({width:"0",padding:"0"},"slow",function(){s.css("display","none"),r.css("display","block")}),M(65,90,25,1),t.stopPropagation(),window.event.cancelBubble=!0}),r.attr("title","点击显示侧栏"),r.click(function(){var t,e=getViewport().width;e<400?(e="100%",t="0"):(e="25%",t="1%"),s.css("display","inline-block"),r.css("display","none"),s.animate({width:e,padding:t},"slow"),M(90,65,20,.5)}),$("a").not(".self").attr("target","_blank");var D=$("#container>section>h2"),O="",_="";for(h=1;h<=4;h++)_+='<div class="block'+h+'"></div>';_='<div id="subTitleToggle">'+_+"</div>";var q=decodeURI(i.substring(i.indexOf("#")+1));q=q.replace(/\?theme=(dark)|(bright)/,""),D.each(function(){var t=filterName(this.innerHTML);$(this).wrap('<a style="height: 50%; margin: 0; padding: 0; text-decoration: none; color: #000;" id="'+t+'" href="#'+t+'"></a>'),$(this).click(function(){scrollTo(t)}),this.innerHTML===q&&$(this).click(),O+='<div class="subTitleItem">'+this.innerHTML+"</div>"}),O='<div id="subTitleNav">'+O+'<div class="subTitleItem">返回顶部</div></div>',$("body").append(O+_);var N=$(".subTitleItem"),j=$("#subTitleToggle"),R=$("#subTitleToggle div");N.each(function(){var t=filterName(this.innerHTML);$(this).click(function(e){scrollTo(t)})});var B=!1,W=!1,V=50,P=100;function U(){B=!0;for(var t=0,e=0;e<N.length;e++,t+=V)!function(){var n=e;setTimeout(function(){N.eq(n).fadeOut(100)},t)}();for(e=0;e<R.length;e++,t+=P)!function(){var n=e;setTimeout(function(){R.eq(n).show("fast")},t)}();setTimeout(function(){B=!1},N.length*V+R.length*P),W=!1}j.attr("title","点击显示子标题导航"),j.click(function(t){var e=0;for(h=R.length;h>=0;h--,e+=P)!function(){var t=h;setTimeout(function(){R.eq(t).hide("fast")},e)}();for(h=N.length-1;h>=0;h--,e+=V)!function(){var t=h;setTimeout(function(){B||N.eq(t).fadeIn(100)},e)}();W=!0,t.stopPropagation(),window.event.cancelBubble=!0}),document.body.onclick=U;var J=!0;$(window).scroll(function(){var t=$(this).scrollTop(),e=$(document).height();t+$(this).height()===e?(j.stop().hide("slow"),J=!0):J&&(j.stop().show("slow"),J=!1),W&&U()});var X="没有了",z="没有了",F=0;if("index"===a)z=p[0][0];else{var Y=[];p.forEach(function(t){t.forEach(function(t){Y.push(t)})}),0!==(F=Y.indexOf(a))&&(X=Y[F-1]),F!==Y.length-1&&(z=Y[F+1])}function G(t){var e=window.getComputedStyle?getComputedStyle(t).width:t.currentStyle.width;return 0===(e=Number.parseInt(e))?t.clientWidth||t.scrollWidth||t.offsetWidth||500:e}function K(t){return t?t.naturaWidth?.2*t.naturaWidth:.2*G(t):50}function Q(){mt.style.opacity=ht.style.opacity=0,nt&&clearTimeout(nt),nt=setTimeout(function(){mt.style.display=ht.style.display="none"},1e3)}function Z(t,e){var n=ot.lastChild;if(n instanceof HTMLImageElement&&t){var i=getViewport(),a=i.height/2-t.clientY,s=i.width/2-t.clientX;a=e?a/2:Math.sqrt(a),s=e?s/2:Math.sqrt(s);var o=Number.parseInt(n.style.paddingLeft),r=Number.parseInt(n.style.paddingRight),l=Number.parseInt(n.style.paddingTop),c=Number.parseInt(n.style.paddingBottom);e?o+=s-r:o-=s-r,e?r-=s:r+=s,e?c+=a-l:c-=a-l,e?l+=a:l-=a,n.style.paddingLeft=Math.max(o,0)+"px",n.style.paddingRight=Math.max(r,0)+"px",n.style.paddingTop=Math.max(l,0)+"px",n.style.paddingBottom=Math.max(c,0)+"px"}}function tt(){var t=ot.lastChild,e=G(t);t.style.width=e-K(t)+"px"}function et(t){if(ot.lastChild instanceof HTMLImageElement)for(var e=ot.lastChild,n=$("#container figure>img").toArray(),i=0;i<n.length;i++)if(n[i].src===e.src){t?i-1>=0?e.src=n[i-1].src:A.info({content:"已经是第一张了"}):i+1<n.length?e.src=n[i+1].src:A.info({content:"已经是最后一张了"});break}}X=wrapByA(X),z=wrapByA(z),$(".refer").after('<div id="footer" ><div class="prePage">上一篇：'+X+'</div><div class="nextPage">下一篇：'+z+"</div></div>"),p.forEach(function(t,e){-1===t.indexOf(a)&&T.eq(e).click()}),"index"===a||/.+\/html\/$/.test(a)||setTimeout(function(){scrollTo("currentItem",s);var t=$("#currentItem > a");t.animate({"font-size":"1.25rem","font-weight":900},1e3,function(){t.animate({"font-size":"1rem","font-weight":"bold"},1e3)})},500);var nt=null,it=null,at=null,st=document.createElement("div"),ot=document.createElement("div"),rt=document.createElement("div"),lt=document.createElement("div"),ct=document.createElement("div"),dt=document.createElement("div"),ut=document.createElement("div"),pt=null;ut.innerText="↓",ut.setAttribute("title","下载"),ut.setAttribute("class","closeImg"),ut.style.right="200px",ut.onclick=function(){if(ot.lastChild instanceof HTMLImageElement){var t=ot.lastChild.src,e=document.createElement("a");e.setAttribute("download",t),e.setAttribute("href",t),e.setAttribute("target","_blank"),e.click()}},ct.innerText="-",ct.setAttribute("title","缩小"),ct.setAttribute("class","closeImg"),ct.style.right="150px",ct.onmousedown=function(){tt(),it&&clearInterval(it),it=setInterval(tt,200)},ct.onmouseup=function(){it&&clearInterval(it)},dt.innerText="+",dt.setAttribute("title","放大"),dt.setAttribute("class","closeImg"),dt.style.right="100px",dt.onmousedown=function(){yt(),at&&clearInterval(at),at=setInterval(yt,200)},dt.onmouseup=function(){at&&clearInterval(at)},rt.innerText="x",rt.setAttribute("title","关闭"),rt.setAttribute("class","closeImg"),rt.onclick=function(){ot.lastChild instanceof HTMLImageElement&&(ot.removeChild(ot.lastChild),ot.style.display="none",st.style.display="none",ft.style.display="none",gt.style.display="none",Q())},lt.innerText="r",lt.setAttribute("class","closeImg"),lt.style.right="50px",lt.setAttribute("title","复原"),lt.onclick=function(){ot.lastChild instanceof HTMLImageElement&&(ot.lastChild.style.padding="0px",pt&&(ot.lastChild.style.width=pt+"px"))},st.setAttribute("class","mask"),ot.appendChild(ut),ot.appendChild(ct),ot.appendChild(dt),ot.appendChild(lt),ot.appendChild(rt),ot.setAttribute("class","imgContainer"),ot.onclick=Q,window.addEventListener("scroll",Q),document.body.appendChild(st),document.body.appendChild(ot);var mt=document.createElement("div"),ht=document.createElement("div"),ft=document.createElement("div"),gt=document.createElement("div");function yt(){var t=ot.lastChild,e=G(t);t.style.width=e+K(t)+"px"}function vt(t){var e=document.createElement("div");e.setAttribute("class","oneComment");var n=document.createElement("div"),i=document.createElement("div"),a=document.createElement("div"),s=document.createElement("div");i.innerText=t.username||"匿名",i.setAttribute("class","commentUsername"),a.innerText=t.create_time+" #"+t.floor,a.setAttribute("class","commentTime"),s.innerText=t.comment_content,s.setAttribute("class","commentSection"),n.appendChild(i),n.appendChild(a)||formatDate(new Date),e.appendChild(n),e.appendChild(s),Tt.appendChild(e)}function bt(){xt.innerText="共 "+wt+" 条评论"}mt.innerText="-",ht.innerText="+",mt.style.opacity=ht.style.opacity=0,mt.style.borderRadius="5px 0 0 5px",ht.style.borderRadius="0 5px 5px 0",mt.style.marginLeft="-1px",ht.style.marginRight="-1px",mt.setAttribute("class","scaleDiv"),ht.setAttribute("class","scaleDiv"),mt.setAttribute("title","缩小图像"),ht.setAttribute("title","放大图像"),ft.innerText="←",gt.innerText="→",ft.setAttribute("title","上一张"),gt.setAttribute("title","下一张"),ft.setAttribute("class","changeImg"),gt.setAttribute("class","changeImg"),gt.style.right="0",ft.style.display="none",gt.style.display="none",ft.onclick=function(){et(!0)},gt.onclick=function(){et(!1)},mt.onclick=function(t){tt(),Z(t,!1)},ht.onclick=function(t){yt(),Z(t,!0)},document.body.appendChild(mt),document.body.appendChild(ht),document.body.appendChild(ft),document.body.appendChild(gt),$("#container figure>img").each(function(){var t=$(this);t.attr("title","点击放大"),t.click(function(){var e=document.createElement("img");e.setAttribute("class","tmpImg"),e.setAttribute("title","点击右键打开缩放菜单"),e.setAttribute("src",t.attr("src")),ot.style.display=st.style.display="block",e.oncontextmenu=function(t){return nt&&clearTimeout(nt),mt.style.display=ht.style.display="block",mt.style.opacity=ht.style.opacity=1,ht.style.left=t.pageX+"px",mt.style.left=t.pageX-50+"px",mt.style.top=ht.style.top=t.pageY+"px",t.preventDefault(),t.returnValue=!1,!1},ft.style.display="",gt.style.display="",ot.appendChild(e),setTimeout(function(){pt=G(e),e.style.width=pt+"px"},0),e.style.padding="0px"})}),function(){var t=$("#catalogFrame img");t.length&&t.click(function(){var t=$(this).next().next();void 0!==t&&"DIV"===t.prop("tagName").toUpperCase()&&t.toggle(500)});var e=$("table");e.length&&(e.attr({border:1,cellpadding:1,cellspacing:0}),e.each(function(){$(this).parent().css("overflow","auto")}))}();var wt=0,xt=document.createElement("div");xt.style.margin="10px 0",xt.style.fontWeight="bold",xt.style.textAlign="center",bt(),d.append(xt);var Tt=document.createElement("div");d.append(Tt);var kt=document.createElement("div");kt.setAttribute("class","oneComment");var Ct=document.createElement("div"),$t=document.createElement("textarea"),At=document.createElement("div"),Et=document.createElement("button"),It=document.createElement("button"),St=document.createElement("input");St.setAttribute("type","text"),St.setAttribute("placeholder","若为空，则表示匿名评论"),St.setAttribute("class","appendCommentUsername"),Ct.setAttribute("class","commentSection"),Ct.innerText="用户名：",Ct.appendChild(St),$t.style.width="100%",$t.style.borderRadius="5px",$t.setAttribute("rows","10"),At.style.textAlign="center",Et.innerText="评论",Et.setAttribute("class","button button-primary"),Et.onclick=function(){""===$t.value.trim()?A.info({content:"请选择填写内容再评论"}):$.ajax({type:"POSt",url:"/index.php/note/Comment/addComment",dataType:"json",data:{article:a,username:St.value,content:$t.value},success:function(t){t.status?(vt(t.comment),$t.value="",A.info({content:"添加评论成功！"}),wt++,bt()):A.info({content:t.message||"添加评论失败"})}})},It.innerText="清空",It.onclick=function(){$t.value=""},It.setAttribute("class","button"),At.appendChild(Et),At.appendChild(It),kt.appendChild(Ct),kt.appendChild($t),kt.appendChild(At),d.append(kt),$.ajax({type:"GET",url:"/index.php/note/Comment/getCommentList",data:{article:a},dataType:"json",success:function(t){t.forEach(vt),wt=t.length,bt()}})});