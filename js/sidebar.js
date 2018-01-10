$(function() {
	function surroundedByTag(source, tag) {
		if (tag === 'a') {
			return '<a href="./' + source + '.html">' + source + '</a><br>';
		} else {
			return '<'+ tag + '>' + source + '</' + tag + '>';
		}
	}
	var $sidebar = $('#sidebar'); // 导航条
	var $catalog = $('#catalog'); // “目录”
	var $container = $('#container'); // 文章内容
	var category = ['HTML & CSS', 'SASS / SCSS', 'Javascript', 'Protocol', '优化']; // 目录分类
	// 具体条目
	var items = [
					['mate标签','元素类型', '元素定位', '元素居中', '盒式模型', 'href和src', '选择器', 'canvas'],
					[],
					['原型链', '闭包', '事件', '插件'],
					['HTTP'],
					[]
				];
	for (var i = 0; i < category.length; i++) {
		$sidebar.append(surroundedByTag(category[i], 'h3'));
		for (var j = 0; j < items[i].length; j++) {
			$sidebar.append(surroundedByTag(surroundedByTag(items[i][j], 'a'), 'div'));
		}
	}
	// 折叠目录
	$catalog.click(function(event) {
		$sidebar.animate({
			'left': '-20%'
		},'slow');
		$container.animate({
			'left': '5%'
		},'slow');
		// 阻止事件冒泡：
		event.stopPropagation(); // 非IE
		window.event.cancelBubble = true; // IE
	});
	// 展示目录
	$sidebar.click(function(event) {
		$sidebar.animate({
			'left': '0%'
		},'slow');
		$container.animate({
			'left': '25%'
		},'slow');
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