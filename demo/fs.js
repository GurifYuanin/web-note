var fs = require('fs');

var buffer = new Buffer.alloc(1024);

fs.open('./box_demo.html', 'r', (err, fd) => {
	fs.read(fd, buffer, 0, buffer.length, 0, (err, num, buf) => {
		console.log(num);
		console.log(buf === buffer);
	});
});