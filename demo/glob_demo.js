var glob = require('glob');
glob('../*', {
	dot: true
}, function(error, files) {
	files.forEach(function(el) {
		console.log(el);
	});
});