// 打开评论页面 window.open 一次性最多打开一个页面
var index = 0;
if (index >= $('#dataList a').length || index < 0) {
	alert('数组越界');
} else {
	var url = $('#dataList a')[index].href.substring($('#dataList a')[index].href.indexOf('/'));
	window.open(url);
}


// 全好评，修改 result：0 -> 满意
var result = 0;
var radio = $('#table1 input[type=radio]');
for (var i = 0; i < radio.length; i++) {
	if (i % 5 === result) {
		radio.eq(i).attr('checked', true);
	}
}