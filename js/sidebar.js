$(function() {
	function surroundedByTag(source, tag) {
		if (tag === 'a') {
			return '<a href="./' + source + '.html">' + source + '</a><br>';
		} else {
			return '<'+ tag + '>' + source + '</' + tag + '>';
		}
	}
	var $sidebar = $('#sidebar'); // 导航条
	var $catalog = $('#catalog'); // 目录
	var $hideCatalog = $('#hideCatalog'); // 隐藏目录图片
	var $showCatalog = $('#showCatalog'); // 显示目录图片
	var $container = $('#container'); // 文章内容
	var category = ['HTML', 'CSS', 'Javascript', '移动Web', '调试', '协议', '安全', '其他']; // 目录分类
	// 具体条目
	var items = [
			['meta标签', 'href和src', 'link', 'script', 'HTML语义化', 'HTML5'],
			['选择器', '盒式模型', '元素种类', '元素定位', '元素居中', '伪类伪元素', '格式化上下文', 'CSS Hack', 'CSS3', 'CSS怪异现象', '颜色和长度'],
			['作用域链', '原型链', '闭包', '事件', '同源策略', '字符编码', 'JSONP', 'this'],
			['响应式布局', 'bootstrap'],
			['抓包工具', 'chrome devtools'],
			['HTTP'],
			['CSRF', 'XSS'],
			['浏览器渲染', '设计策略', 'cookie']
		];
	for (var i = 0; i < category.length; i++) {
		$sidebar.append(surroundedByTag(category[i], 'h3'));
		for (var j = 0; j < items[i].length; j++) {
			$sidebar.append(surroundedByTag(surroundedByTag(items[i][j], 'a'), 'div'));
		}
	}
	var $itemLink = $('#sidebar>div>a');
	// 折叠目录
	$hideCatalog.click(function(event) {
		$sidebar.animate({ // 侧栏隐藏
			'width': '0',
			'padding': '0',
			'margin': '0'
		},'slow');
		$itemLink.animate({
			'font-size': '0'
		}, 'slow');
		for (var i = 0, delay = 0; i <= 25; i += 0.3, delay += 10) { // 正文栏目占据 90%
			(function() {
				var percentage = (65 + i) + '%';
				var margin = '0 ' + (4 + i / 25) + '%';
				setTimeout(function() {
					$container.css({
						'width': percentage,
						'margin': margin
					});
				}, delay);
			})();
		}
		// 阻止事件冒泡：
		event.stopPropagation(); // 非IE
		window.event.cancelBubble = true; // IE
	});
	var $itemDiv = $('#sidebar div');
	$itemDiv.mouseover(function() {
		this.style.backgroundColor = '#ccc';
	});
	$itemDiv.mouseout(function() {
		this.style.backgroundColor = '#f2f2f2';
	});
	$('a').attr('target', '_blank'); // 所有链接默认新标签打开
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
	$('html').eq(0).css('font-size', getRootFontSize());
});