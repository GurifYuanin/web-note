function addOnceClickEventById(id, fn) {
	var el = document.getElementById(id);
	if (el.innerHTML.trim() === '') el.innerText = '开始渲染';
	el.addEventListener('click', function() {
		el.parentNode.removeChild(el);
		fn();
	});
}

function value2color(str) {
	return new THREE.Color(Number.parseInt(str.substring(1), 16));
}

function initRenderer( el, options ) {
	if (!el) {
		console.error('no element to mount');
		return;
	}
	if (Object.prototype.toString.call(el).toLowerCase() === '[object string]')
		el = document.getElementById(el);
	options = options || {
		width: 250,
		height: 250
	};
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( options.width, options.height );
	el.appendChild( renderer.domElement );
	return renderer;
}

function initCamera( options ) {
	options = options || {
		fov: 45,
		aspect: 1,
		near: .1,
		far: 2000
	};
	var camera = new THREE.PerspectiveCamera( options.fov, options.aspect, options.near, options.far );
	camera.position.set(0, 1, 5);
	return camera;
}

function initScene( objects ) {
	var scene = new THREE.Scene();
	for (var i = 0; i < arguments.length; i++) {
		scene.add(arguments[i]);
	}
	return scene;
}
function initBox() {
	return new THREE.BoxGeometry(1, 1, 1);
}
function initMesh(geometry, material) {
	return new THREE.Mesh(geometry, material);
}

function initAmbientLight(color) {
	var light = new THREE.AmbientLight(color || 0xffffff);
	return light;
}

function initPointLight(color) {
	var light = new THREE.PointLight(color || 0xffffff, 1, 100);
	return light;
}

