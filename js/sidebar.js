// 初始化语法高亮
hljs && hljs.initHighlightingOnLoad();
// sidebar
$(function() {
    var viewport = document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    viewport.setAttribute('content', 'width=device-width, initial-scale=1');
    $('html')[0].appendChild(viewport);
    function wrapByA(href) {
        return '<a href="' +
                (href === '没有了' ? 'javascript:void(0)' : ('./' + href + '.html')) +
                '">' + href + '</a>';
    }
    function wrapByTag(source, tag) {
        return tag === 'a' ?
               wrapByA(source) :
               '<' + tag + '>' + source + '</' + tag + '>';
    }
    // 获得视窗大小
    function getViewport(target) {
        // 使用指定窗口，默认使用当前窗口
        target = target || window;
        // 以此检查 IE8及以前-> 标准模式 -> 怪异模式
        var width = window.innerWidth || document.documentElement.clientWidth  || document.body.clientWidth;
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return {
            'width': width,
            'height': height
        };
    }
    // 滚动到指定 id 的位置
    function scrollTo(name, el) {
        if (name === '返回顶部' || !name) $body.animate({scrollTop: 0}, 500);
        else if (el) el.animate({scrollTop: $('#' + name).offset().top - 100}, 500);
        else $body.animate({scrollTop: $('#' + name).offset().top}, 500);
    }
    var url = window.location.href;
    var currentTitle = decodeURI(url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.')));
    var $sidebar = $('#sidebar'); // 导航条
    var $hideCatalog = $('#hideCatalog'); // 隐藏目录图片
    var $showCatalog = $('#showCatalog'); // 显示目录图片
    var $catalog = $('#catalog'); // 隐藏侧栏按钮
    var $title = $('#title'); // 文章标题
    var $container = $('#container'); // 文章内容
    var $body = $('html, body');
    var category = ['HTML', 'CSS', 'Javascript', 'NodeJS', 'VueJS', '移动Web', '工具', '协议', '安全', '后端', '其他']; // 目录分类
    var items = [
        ['meta标签', 'href和src', 'link', 'script', 'HTML语义化', 'HTML5', 'canvas', 'svg'],
        ['选择器', '盒式模型', '元素种类', '元素定位', '元素居中', '伪类伪元素', '格式化上下文', 'CSS Hack', 'CSS3', 'CSS怪异现象', '颜色和长度', '百分比'],
        ['数据类型', '数组字符串与对象', '循环', '作用域链', '原型链', '闭包', '事件', '同源策略', 'Class', 'JSONP', 'this', 'jquery', 'promise', 'Generator', 'Typescript'],
        ['commonJS', 'package.json', 'path', 'process', 'webpack', 'plugins', 'loader'],
        ['安装', '实例', '模版', '组件', 'mixins', 'router', 'vuex'],
        ['响应式布局', 'bootstrap', 'viewport'],
        ['抓包工具', 'chrome devtools', 'git'],
        ['HTTP'],
        ['CSRF', 'XSS'],
        ['Thinkphp5.1', 'htaccess'],
        ['路径匹配', '浏览器渲染', '设计策略', 'cookie', '头疼的兼容', '命名规范', '字符编码', 'bat']
    ];
    // 插入侧栏
    var str = '';
    for (var i = 0; i < category.length; i++) {
        str += wrapByTag('<img src="../images/slide_down.png">' + category[i], 'h3');
        for (var j = 0, tmp = '', insertedId = ''; j < items[i].length; j++) {
            insertedId = items[i][j] === currentTitle ? ' id="currentItem" ' : '';
            tmp += '<div' + insertedId + '>' + wrapByA(items[i][j]) + '</div>';
        }
        str += wrapByTag(tmp, 'section');
    }
    $sidebar.append(str);

    // SE
    $catalog.append('<section id="searchContainer"><input id="searchInput" type="text" placeholder="搜索文章（支持正则）"/><section id="searchResult"></section></section>');
    var $searchInput = $('#searchInput');
    var $searchResult = $('#searchResult');
    var liIndex = 0;
    $searchResult.css('display', 'none');
    $searchInput.keyup(function(event) {
        var value = $searchInput.val(), str = '';
        value = value || ' ';
        // 遍历出匹配的 li
        items.forEach(function(item) {
            item.forEach(function(el) {
                var reg = null;
                if (/\/.+\/i?g?m?/.test(value)) { // 支持正则
                    reg = eval(value);
                } else {
                    reg = eval('/' + value + '/i');
                }
                if (reg.test(el)) {
                    str += wrapByTag(el.replace(reg, '<span>' + el.match(reg) + '</span>'), 'li');
                }
            });
        });
        // 将 li 插入到 html
        if (value.trim() === '' || str.trim() === '') {
            $searchResult.css('display', 'none');
        } else if ((event.keyCode < 37 || event.keyCode > 40) && event.keyCode !== 13){
            $searchResult.css('display', 'block');
            $searchResult.html(str);
            // 为 li 添加点击事件
            $('#searchResult li').each(function() {
                $(this).click(function() {
                    window.open('./' + this.innerText + '.html');
                });
            });
        }
        // 如果按钮为 enter 则自动跳转到第一个 li
        if (str.trim() === '') { return; }
        var list = $('#searchResult li');
        switch (event.keyCode) {
            case 13: {
                var index = list.toArray().findIndex(function(element) {
                    return element.style.backgroundColor === 'rgb(239, 239, 239)';
                });
                index === -1 ? list.eq(0).click() : list.eq(index).click();
                break;
            }
            case 37: break;
            case 38: {
                if (liIndex > 0) {
                    liIndex--;
                }
                if (liIndex < list.length) {
                    list.eq(liIndex).css('background-color', '');
                }
                if (liIndex > 0) {
                    list.eq(liIndex - 1).css('background-color', '#efefef');
                }
                break;
            }
            case 39: break;
            case 40: {
                if (liIndex > 0) {
                    list.eq(liIndex - 1).css('background-color', '');
                }
                if (liIndex < list.length) {
                    list.eq(liIndex).css('background-color', '#efefef');
                    liIndex++;
                }
                break;
            }
            default: {
                liIndex = 0;
            }
        }
    });
    $container.click(function() {
        $searchResult.css('display', 'none');
    });
    /*
    侧栏结构：
    <aside id="sidebar">
    	<section id="catalog">
            <img id="hideCatalog">
		      目录
            /////////////////////////////////// 插入 SE
            <section>
                <input id="searchInput">
                <section id="searchResult">
                    <li>搜索出来的条目</li>
                </section>
            </section>
        </section>
        //////////////////////////////////////// 此处开始插入
        //////////////////////////////////////// 第一层循环
		<h3>
            <img src="../images/slide_down.png">
            catalog 类别
        </h3>
        //////////////////////////////////////// 第二层循环
        <section>
            <div>
                <a>
                    items 条目
                </a>
            </div>
        </section>
    </aside>
    */
    // 点击类别开关子项
    var isBright = true; // 是否处于白天模式
    var arrBrightDown = '../images/slide_down.png'; // 白天模式下的下箭头
    var arrBrightUp = '../images/slide_up.png'; // 白天模式下的右箭头
    var arrDarkDown = '../images/slide_down_dark.png'; // 夜间模式下的下箭头
    var arrDarkUp = '../images/slide_up_dark.png'; // 夜间模式下的右箭头
    var $itemHead = $('#sidebar h3'); // catalog
    $itemHead.each(function(){
        var that = $(this),
            img = that.children();
        that.click(function() {
            if (img.attr('src') === arrBrightDown || img.attr('src') === arrDarkDown) {
                img.attr('src', isBright ? arrBrightUp : arrDarkUp);
            } else {
                img.attr('src', isBright ? arrBrightDown : arrDarkDown);
            }
            that.next().slideToggle('slow');
        });
    });
    // 绘制直线
    var lineLength = getViewport().width / 3;
    $title.after('<svg title="点击切换样式" style="display: block; margin: auto; width:' + lineLength + 'px" xmlns="http://www.w3.org/2000/svg" version="1.1" height="1px"><path id="line" d="M 0 0 L ' + lineLength + ' 0" style="stroke: #000; stroke-dasharray: ' + lineLength + '; stroke-dashoffset: ' + lineLength + '; fill: none;"/></svg>');
    var $line = $('#line');
    // 文章标题事件
    $title.mouseover(function() {
        $title.animate({
                'padding-top': '1%',
                'padding-bottom': '1%'
            },'fast');
        $line.animate({
            'stroke-dashoffset': 0
        }, 'fast');
    });
    $title.mouseout(function() {
        $title.animate({
                'padding-top': '0',
                'padding-bottom': '0'
            },'fast');
        $line.animate({
            'stroke-dashoffset': lineLength
        }, 'fast');
    });
    // 文章标题点击后变换样式
    var $theme = $('link').eq(2); // 主题颜色
    var $codeStyle = $('link').eq(1); // 代码颜色
    var $itemBlockImg = $('#sidebar h3 img');
    var $hideSidebarImg = $('#hideCatalog');
    $title.click(function () {
        $theme.attr('href', isBright ? '../css/dark.css' : '../css/bright.css');
        $codeStyle.attr('href', isBright ? '../css/styles/agate.css' : '../css/styles/default.css');
        $line.css('stroke', isBright ? '#fff' : '#000');
        $hideSidebarImg.attr('src', isBright ? '../images/catalog_dark.png' : '../images/catalog.png');
        $itemBlockImg.each(function(index, el) {
            var src = el.src;
            el.src = isBright ?
                     src.substring(0, src.lastIndexOf('.')) + '_dark.png' :
                     src.substring(0, src.lastIndexOf('_')) + '.png';
        });
        $('a').each(function(index, el) {
            el.href = isBright ? el.href + '?theme=dark' : el.href.replace('?theme=dark', '');
        });
        isBright = !isBright;
    });
    if (url.indexOf('?theme=dark') >= 0) $title.click();
    function widthAndMargin(start, end, piece, time) {
        // width: start% -> end%
        // margin: 0 4% -> 0 5%
        // piece: 动画分段数量（关键帧数量）
        // time：动画时长（s，秒）
        var valInc = (end - start) / piece;
        var timeInc = time * 1000 / piece;
        var widthStart, widthInc;
        if (start < end) {
        	widthStart = 4;
        	widthInc = 1 / piece;
        } else {
        	widthStart = 5;
        	widthInc = - 1 / piece;
        }
        for (var i = start, delay = 0; i !== end; i += valInc, widthStart +=  widthInc,delay += timeInc) {
            (function() {
                var percentage = i + '%';
                var margin = '0 ' + widthStart + '%';
                setTimeout(function() {
                    $container.css({
                        'width': percentage,
                        'margin': margin
                    });
                }, delay);
            })();
        }
        // 进行最后一次更新
        setTimeout(function() {
        	widthStart += widthInc;
            $container.css({
                'width': end + '%',
                'margin': '0 ' + widthStart + '%'
            });
        }, time * 1000);
    }
    // 折叠目录
    $hideCatalog.attr('title', '点击隐藏侧栏');
    $hideCatalog.click(function(event) {
        $sidebar.animate({ // 侧栏隐藏
            'width': '0',
            'padding': '0'
        }, 'slow', function() {
            $sidebar.css('display', 'none');
            // 允许重新展开侧栏
            $showCatalog.css('display', 'block');
        });
        widthAndMargin(65, 90, 25, 1);
        // 阻止事件冒泡：
        event.stopPropagation(); // 非IE
        window.event.cancelBubble = true; // IE
    });

    // 展开目录
    $showCatalog.attr('title', '点击显示侧栏');
    $showCatalog.click(function() {
        var width = getViewport().width;
        var padding;
        // 如果视窗大小小于 400 px
        if (width < 400) {
            width = '100%';
            padding = '0';
        } else {
            width = '25%';
            padding = '1%';
        }
        $sidebar.css('display', 'inline-block');
        $showCatalog.css('display', 'none');
        $sidebar.animate({
                'width': width,
                'padding': padding
            },'slow');
		widthAndMargin(90, 65, 20, 0.5);
    });
    $('a').not('.self').attr('target', '_blank'); // 所有链接默认新标签打开

    // 去除多余的字符
    function getName (str) {
        return str.replace(/[\s$@#&;()/.]/g, '');
    }
    var $subTitle = $('#container>section>h2'); // 一级子标题
    var subTitleNav = ''; // 子标题导航 html 字符串
    var subTitleToggleString = ''; // 子标题导航开关
    var subTitleBlockNumber = 4;
    for (var i = 1; i <= subTitleBlockNumber; i++) {
        subTitleToggleString += '<div class="block' + i + '"></div>';
    }
    subTitleToggleString = '<div id="subTitleToggle">' + subTitleToggleString + '</div>';

    // 点击后子标题置顶到窗口
    var currentH2 = decodeURI(url.substring(url.indexOf('#') + 1));
    currentH2 = currentH2.replace(/\?theme=(dark)|(bright)/, '');
    $subTitle.each(function() {
        var name = getName(this.innerHTML);
    	// $(this).html('<a height="50%" id="' + name + '" href="#' + name + '">' + name + '</a>');
        // 子标题包裹为超链接
        $(this).wrap('<a style="height: 50%; margin: 0; padding: 0; text-decoration: none; color: #000;" id="' + name + '" href="#' + name + '"></a>');
        // 点击后滑动窗口
        $(this).click(function() {
            scrollTo(name);
        });
        if (this.innerHTML === currentH2) $(this).click();
        subTitleNav += '<div class="subTitleItem">' + this.innerHTML + '</div>';
        // if ()
    });
    subTitleNav = '<div id="subTitleNav">' + subTitleNav + '<div class="subTitleItem">返回顶部</div></div>';
    // 右下角子标题导航
    // 添加 html 元素
    $('body').append(subTitleNav + subTitleToggleString);
    // 设置跳转事件
    var $subTitleItem = $('.subTitleItem');
    var $subTitleToggle = $('#subTitleToggle');
    var $subTitleBlock = $('#subTitleToggle div');
    $subTitleItem.each(function(){
        var name = getName(this.innerHTML);
        var that = $(this);
        that.click(function(event) {
             scrollTo(name);
        });
        // that.mousedown(function() {
        //     that.css({
        //         'backgroundColor': '#888',
        //         'color': '#fff'
        //     });
        // });
        // that.mouseup(function() {
        //     that.css({
        //         'backgroundColor': '#fff',
        //         'color': '#000'
        //     });
        // });
    });
    var isLeave = false; // 判断光标是否已经离开导航面板
    var isShow = false; // 判断导航块是否已经出现
    var itemInterval = 50; // 导航项动画间隔
    var blockInterval = 100; // 块动画间隔
    // 展开子标题导航
    function showBlock(event) {
        var time = 0;
        // 块消失
        for (i = $subTitleBlock.length; i >= 0; i--, time += blockInterval) {
            (function() {
                var delay = time;
                var j = i;
                setTimeout(function() {
                    $subTitleBlock.eq(j).hide('fast');
                }, delay);
            })();
        }
        // 导航项出现
        for (i = $subTitleItem.length - 1; i >= 0 ; i--, time += itemInterval) {
            (function() {
                var delay = time;
                var j = i;
                setTimeout(function() {
                    if (!isLeave) {
                        $subTitleItem.eq(j).fadeIn(100);
                    }
                }, delay);
            })();
        }
        isShow = true;
        // 取消事件冒泡
        event.stopPropagation(); // 非IE
        window.event.cancelBubble = true; // IE
    }
    // 隐藏子标题导航
    function hideBlock() {
        isLeave = true; // 加锁，不让导航项出现
        // 导航项消失
        for (var time = 0, i = 0; i < $subTitleItem.length ; i++, time += itemInterval) {
            (function() {
                var delay = time;
                var j = i;
                setTimeout(function() {
                    $subTitleItem.eq(j).fadeOut(100);
                }, delay);
            })();
        }
        // 块出现
        for (i = 0; i < $subTitleBlock.length; i++, time += blockInterval) {
            (function() {
                var delay = time;
                var j = i;
                setTimeout(function() {
                    $subTitleBlock.eq(j).show('fast');
                }, delay);
            })();
        }
        setTimeout(function() {
            isLeave = false; // 开锁，允许导航项出现
        }, $subTitleItem.length * itemInterval + $subTitleBlock.length * blockInterval);
        isShow = false;
    }
    $subTitleToggle.attr('title', '点击显示子标题导航');
    $subTitleToggle.click(showBlock);
    document.body.onclick = hideBlock;
    // $subTitleNav.mouseleave(hideBlock);
    // 滚动条到底时隐藏导航开关、隐藏子标题导航
    var showable = true; // 标志是否可以隐藏导航开关
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight === scrollHeight) {
            $subTitleToggle.stop().hide('slow');
            showable = true;
        } else {
            if (showable) {
                $subTitleToggle.stop().show('slow');
                showable = false;
            }
        }
        if (isShow) {
            hideBlock();
        }
    });

    // 追加上一篇和下一篇操作
    var preTitle = '没有了', nextTitle = '没有了', index = 0;
    if (currentTitle === 'index') {
        nextTitle = items[0][0];
    } else {
        var allItems = [];
        items.forEach(function(el) {
            el.forEach(function(ele) {
                allItems.push(ele);
            });
        });
        index = allItems.indexOf(currentTitle);
        if (index !== 0) preTitle = allItems[index - 1];
        if (index !== allItems.length - 1) nextTitle = allItems[index + 1];
    }
    preTitle = wrapByA(preTitle);
    nextTitle = wrapByA(nextTitle);
    $('.refer').after('<div id="footer" ><div class="prePage">上一篇：' + preTitle + '</div><div class="nextPage">下一篇：' + nextTitle + '</div></div>');

    // 将不是目前浏览的条目收起来
    items.forEach(function(item, index) {
        if (item.indexOf(currentTitle) === -1) {
            $itemHead.eq(index).click();
        }
    });
    // 将当前浏览的条目展开
    if (currentTitle !== 'index') {
        setTimeout(function() {
            scrollTo('currentItem', $sidebar);
            var el = $('#currentItem > a');
            el.animate({
                'font-size': '1.25rem',
                'font-weight': 900
            },1000, function() {
                el.animate({
                    'font-size': '1rem',
                    'font-weight': 'bold'
                },1000);
            });
        }, 500);
    }
    // $('html').eq(0).css('font-size', getRootFontSize()); // 设置 html（根） 字体大小
    // 侧栏高度自适应
    // $(window).on("load resize",function(){
    //     var h = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
    //     $sidebar.css("height", h);
    // });
    //
    // 目录结构部分
    // div#catalogFrame
    //     img
    //     div
    // 点击后 slideUp 和 slideDown
    var dir = $('#catalogFrame img');
    dir.click(function() {
        var brother = $(this).next().next();
        console.dir(brother);
        if (typeof brother !== 'undefined' && brother.prop('tagName') === 'DIV') {
            brother.toggle(500);
        }
    });
    $('table').attr({
        'border': 1,
        'cellpadding': 1,
        'cellspacing': 0
    });
});
