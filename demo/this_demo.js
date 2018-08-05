function foo () {
	console.log(this.message);
}
foo.call({message: 'hello world'}); // => hello world