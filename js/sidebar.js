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
	var category = ['HTML', 'CSS', 'Javascript', '移动Web', '调试', '协议', '其他']; // 目录分类
	// 具体条目
	var items = [
					['meta标签', 'href和src', 'link', 'HTML语义化', 'HTML5'],
					['选择器', '盒式模型', '元素种类', '元素定位', '元素居中', '伪类伪元素', '格式化上下文', 'CSS Hack', 'CSS3', 'CSS怪异现象', '颜色和长度'],
					['原型链', '闭包', '事件', '插件', '同源策略', '字符编码', 'JSONP'],
					['响应式布局', 'bootstrap'],
					['抓包工具', 'chrome devtools'],
					['HTTP'],
					['浏览器渲染', '设计策略', 'cookie']
				];
	for (var i = 0; i < category.length; i++) {
		$sidebar.append(surroundedByTag(category[i], 'h3'));
		for (var j = 0; j < items[i].length; j++) {
			$sidebar.append(surroundedByTag(surroundedByTag(items[i][j], 'a'), 'div'));
		}
	}
	// 折叠目录
	$hideCatalog.click(function(event) {
		$sidebar.animate({
			'left': '-20%'
		},'slow');
		$container.animate({
			'left': '5%'
		},'slow');
		$showCatalog.fadeIn('fast');
		// 阻止事件冒泡：
		event.stopPropagation(); // 非IE
		window.event.cancelBubble = true; // IE
	});
	// 展示目录
	$showCatalog.click(function(event) {
		$sidebar.animate({
			'left': '0%'
		},'slow');
		$container.animate({
			'left': '25%'
		},'slow');
		$showCatalog.fadeOut('fast');
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
});