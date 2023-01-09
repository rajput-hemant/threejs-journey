import * as THREE from "three";
import gsap from "gsap";

import "./style.css";

// Canvas
const canvas = document.querySelector("canvas.webgl")!;

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
	width: 800,
	height: 600,
};

// Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// clock object to keep track of time
// const clock = new THREE.Clock();

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

const tick = () => {
	// 	const elapsedTime = clock.getElapsedTime();
	// 	console.log(elapsedTime);

	// 	// update objects
	// 	// mesh.rotation.x = elapsedTime * Math.PI;
	// 	mesh.rotation.y = elapsedTime * Math.PI;
	// 	// mesh.rotation.z = elapsedTime * Math.PI;

	// 	mesh.position.x = Math.sin(elapsedTime);
	// 	mesh.position.y = Math.cos(elapsedTime);

	// render
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();
