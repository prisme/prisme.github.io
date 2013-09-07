define(["three"], function(THREE) {
	'use strict';

	var camera, scene, renderer, controls;
	var geometry, material, mesh;
	var W, H;

	init();
	animate();

	function init() {
		W = window.innerWidth,
		H = window.innerHeight;

		scene = new THREE.Scene();
		renderer = new THREE.WebGLRenderer();
		camera = new THREE.PerspectiveCamera(60, W / H, 1, 5000);
		camera.position.z = 500;

		renderer.setSize(W, H);
		var container = document.getElementById('scene')
		container.appendChild(renderer.domElement);
		container.className += 'active';

		// controls = new THREE.TrackballControls( camera, renderer.domElement );
		// controls.rotateSpeed = 0.5;
		// controls.addEventListener( 'change', render );

		geometry = new THREE.IcosahedronGeometry(400, 0);
		material = new THREE.MeshNormalMaterial({
			shading: THREE.FlatShading,
			wireframe: true,
			wireframeLinewidth: 1,
			transparent: true,
			opacity: 0.3
		});
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);


		window.addEventListener('resize', onWindowResize, false);
	}

	function animate() {
		requestAnimationFrame(animate);
		// controls.update();
		var time = Date.now() * 0.0017;

		mesh.rotation.x = time * 0.03;
		mesh.rotation.y = time * 0.07;

		render();
	}

	function onWindowResize() {
		camera.aspect = W / H;
		camera.updateProjectionMatrix();
		renderer.setSize(W, H);
		render();
	}

	function render() {
		renderer.render(scene, camera);
	}
});