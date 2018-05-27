$(function() {
    function surroundedByTag(source, tag) {
        if (tag === 'a') {
            return '<a href="./' + source + '.html">' + source + '</a><br>';
        } else {
            return '<' + tag + '>' + source + '</' + tag + '>';
        }
    }
    // 获得视窗大小
    function getViewport(target) {
        // 使用指定窗口，默认使用当前窗口
        target = target || window;
        // 以此检查 IE8及以前-> 标准模式 -> 怪异模式
        var width = window.innnerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return {
            'width': width,
            'height': height
        };
    }
    var $sidebar = $('#sidebar'); // 导航条
    var $hideCatalog = $('#hideCatalog'); // 隐藏目录图片
    var $showCatalog = $('#showCatalog'); // 显示目录图片
    var $title = $('#title'); // 文章标题
    var $container = $('#container'); // 文章内容
    var category = ['HTML', 'CSS', 'Javascript', 'NodeJS', 'VueJS', '移动Web', '调试', '协议', '安全', '后端', '其他']; // 目录分类
    var items = [
        ['meta标签', 'href和src', 'link', 'script', 'HTML语义化', 'HTML5', 'svg'],
        ['选择器', '盒式模型', '元素种类', '元素定位', '元素居中', '伪类伪元素', '格式化上下文', 'CSS Hack', 'CSS3', 'CSS怪异现象', '颜色和长度', '百分比'],
        ['数据类型', '数组和字符串', '作用域链', '原型链', '闭包', '事件', '同源策略', '字符编码', 'JSONP', 'this', 'promise'],
        ['commonJS', 'package.json', 'path', 'process', 'webpack', 'loader'],
        ['安装', '实例', '模版', '组件', 'mixins'],
        ['响应式布局', 'bootstrap'],
        ['抓包工具', 'chrome devtools'],
        ['HTTP'],
        ['CSRF', 'XSS'],
        ['Thinkphp5.1', 'htaccess'],
        ['浏览器渲染', '设计策略', 'cookie', '命名规范']
    ];
    var $body = $('html, body');
    for (var i = 0; i < category.length; i++) {
        $sidebar.append(
            surroundedByTag(
                '<img src="../images/slide_down.png">' + category[i],
                'h3')
            );
        var tmp = '';
        for (var j = 0; j < items[i].length; j++) {
            tmp += surroundedByTag(surroundedByTag(items[i][j], 'a'), 'div');
            // $sidebar.append(surroundedByTag(surroundedByTag(items[i][j], 'a'), 'div'));
        }
        $sidebar.append(surroundedByTag(tmp, 'section'));
    }
    /*
    侧栏结构：
    <aside id="sidebar">
    	<section id="catalog">
            <img id="hideCatalog">
		      目录
        </section>
		<h3>
            <img src="../images/slide_down.png">
            类别
        </h3>
        <section>
            <div>
                <a>
                    条目
                    </a>
                </div>
        </section>
    </aside>
    */
    // 点击类别开关子项
    $('#sidebar h3').each(function(){
        var that = $(this),
            img = that.children();
        that.click(function() {
            if (img.attr('src') === '../images/slide_down.png') {
                img.attr('src', '../images/slide_up.png');
            } else {
                img.attr('src', '../images/slide_down.png');
            }
            that.next().slideToggle('slow');
        });
    });
    // 绘制直线
    var lineLength = getViewport().width / 3;
    $title.after('<svg style="display: block; margin: auto; width:' + lineLength + 'px" xmlns="http://www.w3.org/2000/svg" version="1.1" height="1px"><path id="line" d="M 0 0 L ' + lineLength + ' 0" style="stroke: #000; stroke-width: 1; stroke-dasharray: ' + lineLength + '; stroke-dashoffset: ' + lineLength + '; fill: none;"/></svg>');
    var $line = $('#line');
    // 文章标题事件
    $title.mouseover(function(event) {
        $title.animate({
                'padding-top': '1%',
                'padding-bottom': '1%'
            },
            'fast');
        $line.animate({
            'stroke-dashoffset': 0
        }, 'fast');
    });
    $title.mouseout(function(event) {
        $title.animate({
                'padding-top': '0',
                'padding-bottom': '0'
            },
            'fast');
        $line.animate({
            'stroke-dashoffset': lineLength
        }, 'fast');
    });

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
        for (var i = start, delay = 0; i != end; i += valInc, widthStart +=  widthInc,delay += timeInc) {
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
    $showCatalog.click(function(event) {
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
            },
            'slow');
		widthAndMargin(90, 65, 20, 0.5);
    });
    $('a').attr('target', '_blank'); // 所有链接默认新标签打开

    // 滚动到指定子标题
    function scrollToSubTitle(name) {
        if (name === '返回顶部') {
            $body.animate({scrollTop: 0}, 500);
        } else {
            $body.animate({scrollTop: $('#' + name).offset().top}, 500);
        }
    }
    // 去除多余的字符
    function getName (str) {
        return str.replace(/[\s@#&;()/.]/g, '');
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
    $subTitle.each(function() {
        var name = getName(this.innerHTML);
    	// $(this).html('<a height="50%" id="' + name + '" href="#' + name + '">' + name + '</a>');
        // 子标题包裹为超链接
        $(this).wrap('<a style="height: 50%; margin: 0; padding: 0; text-decoration: none; color: #000;" id="' + name + '" href="#' + name + '"></a>');
        // 点击后滑动窗口
        $(this).click(function(event) {
            scrollToSubTitle(name);
        });
        subTitleNav += '<div class="subTitleItem">' + this.innerHTML + '</div>';
    });
    subTitleNav = '<div id="subTitleNav">' + subTitleNav + '<div class="subTitleItem">返回顶部</div></div>';

    // 右下角子标题导航
    // 添加 html 元素
    $('body').append(subTitleNav + subTitleToggleString);
    // 设置跳转事件
    var $subTitleItem = $('.subTitleItem');
    var $subTitleNav = $('#subTitleNav');
    var $subTitleToggle = $('#subTitleToggle');
    var $subTitleBlock = $('#subTitleToggle div');
    $subTitleItem.each(function(){
        var name = getName(this.innerHTML);
        var that = $(this);
        that.click(function(event) {
             scrollToSubTitle(name);
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
    // 按照视窗大小定义 html 字体大小
    function getRootFontSize() {
        var width = window.innnerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (width > 1200) {
            return 16;
        }
        if (width > 800) {
            return 14;
        }
        if (width > 400) {
            return 12;
        }
        return 10;
    }
    // 追加上一篇和下一篇操作
    {
        function wrapByA(href) {
            if (href === '没有了') {
                return '<a href="javascript:void(0)">' + href + '</a>';
            } else {
                return '<a href="./' + href + '.html">' + href + '</a>';
            }
        }
        var url = window.location.href;
        var currentTitle = decodeURI(url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.')));
        var preTitle, nextTitle, indexX, indexY;
        var flag = false;
        var row = items.length;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < items[i].length; j++) {
                if (currentTitle === items[i][j]) {
                    indexY = j;
                    flag = true;
                    break;
                }
            }
            if (flag) {
                indexX = i;
                break;
            }
        }
        if (indexX === 0){
            if (indexY === 0) {
                preTitle = '没有了';
            } else {
                preTitle = items[indexX][indexY - 1];
            }
        } else {
            if (indexY === 0) {
                preTitle = items[indexX - 1][items[indexX - 1].length - 1];
            } else {
                preTitle = items[indexX][indexY - 1];
            }
        }
        if (indexX === row - 1){
            if (indexY === items[indexX].length - 1) {
                nextTitle = '没有了';
            } else {
                nextTitle = items[indexX][indexY + 1];
            }
        } else {
            if (indexY === items[indexX].length - 1) {
                nextTitle = items[indexX + 1][0];
            } else {
                nextTitle = items[indexX][indexY + 1];
            }
        }
        preTitle = wrapByA(preTitle);
        nextTitle = wrapByA(nextTitle);
        $('.refer').after('<div id="footer" ><div class="prePage">上一篇：' + preTitle + '</div><div class="nextPage">下一篇：' + nextTitle + '</div></div>');
    }

    // $('html').eq(0).css('font-size', getRootFontSize()); // 设置 html（根） 字体大小
    // 侧栏高度自适应
    // $(window).on("load resize",function(){
    //     var h = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
    //     $sidebar.css("height", h);
    // });
    // 目录结构部分
    var dir = $('#catalogFrame img');
    dir.click(function(event) {
        var brother = $(this).next().next();
        console.dir(brother);
        if (typeof brother !== 'undefined' && brother.prop('tagName') === 'DIV') {
            brother.toggle(500);
        }
    });
});
