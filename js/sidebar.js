$(function() {
	function surroundedByTag(source, tag) {
		if (tag === 'a') {
			return '<a href="html/' + source + '.html">' + source + '</a><br>';
		} else {
			return '<'+ tag + '>' + source + '</' + tag + '>';
		}
	}
	var $sidebar = $('#sidebar');
	var category = ['HTML & CSS', 'SASS / SCSS', 'Javascript', 'Protocol', '优化'];
	var items = [
					['mate标签','元素类型', '元素定位', '元素居中', '盒式模型', 'href和src', '选择器', 'canvas'],
					[],
					['原型链', '闭包', '事件', '插件'],
					['HTTP'],
					[]
				];
	for (var i = 0; i < category.length; i++) {
		$sidebar.append(surroundedByTag(category[i], 'p'));
		for (var j = 0; j < items[i].length; j++) {
			$sidebar.append(surroundedByTag(items[i][j], 'a'));
		}
	}
});