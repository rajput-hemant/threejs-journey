import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import "./style.css";

/**
 * Base
 */
// Canvas
const canvas: HTMLElement = document.querySelector("canvas.webgl")!;

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// update camera
	/**
	 * when we change the size of the canvas, we need to update the aspect ratio of the camera
	 */
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// update renderer
	renderer.setSize(sizes.width, sizes.height);
	/**
	 * what is pixel ratio?
	 * pixel ratio is the ratio between the physical pixels and the device independent pixels
	 *
	 * why do we need to set pixel ratio?
	 * if we don't set pixel ratio, the canvas will be blurry on retina devices
	 */
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
	/**
	 * we can use the requestFullscreen() method to make the canvas fullscreen
	 * but this method is not supported by all browsers
	 * so we need to use the webkitRequestFullscreen() method for safari
	 * and the mozRequestFullscreen() method for firefox
	 */

	// const fullscreenElement =
	// 	document.fullscreenElement ||
	// 	document.webkitFullscreenElement ||
	// 	document.mozFullScreenElement;

	// if (!fullscreenElement) {
	// 	if (canvas.requestFullscreen) {
	// 		canvas.requestFullscreen();
	// 	} else if (canvas.webkitRequestFullscreen) {
	// 		canvas.webkitRequestFullscreen();
	// 	} else if (canvas.mozRequestFullscreen) {
	// 		canvas.mozRequestFullscreen();
	// 	}
	// } else {
	// 	if (document.exitFullscreen) {
	// 		document.exitFullscreen();
	// 	} else if (document.webkitExitFullscreen) {
	// 		document.webkitExitFullscreen();
	// 	} else if (document.mozExitFullscreen) {
	// 		document.mozExitFullscreen();
	// 	}
	// }

	const fullscreenElement = document.fullscreenElement;

	if (!fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

/**
 * Animate
 */
// const clock = new THREE.Clock();

const tick = () => {
	// const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
