var path = require('path');
// console.log('__dirname: ' + __dirname);
// console.log('__filename: ' + __filename);
// console.dir(process);
console.log(path.basename('a/b/c'));
console.log(path.basename('a/b/c.html'));
console.log(path.dirname('a/b/c'));
console.log(path.dirname('a/b/c.html'));
console.log(path.extname('a/b/c'));
console.log(path.extname('a/b/c.html'));
console.log(path.format({
	root: '/e',
	dir: '/a/b',
	base: 'c.html',
	name: 'd',
	ext: '.xhtml'
}));
console.log(path.parse('a/b/c.html'));
console.log(path.isAbsolute('C:/'));
console.log(path.isAbsolute('/'));
console.log(path.isAbsolute('a/b/c.html'));
console.log(path.join('a/b', 'c.html'));
console.log(path.join('', 'c.html'));
console.log(path.normalize('a/../a/../a/b/c.html'));
console.log(path.normalize('a/b/././c.html'));
console.log(path.resolve('/a/b', 'c.html'));
console.log(path.resolve('/a', '/b', 'c.html'));
console.log(path.resolve('a/b', 'c.html'));
