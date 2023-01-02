import * as THREE from "three";

import "./style.css";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl")!;

// Sizes
const sizes = {
	width: 800,
	height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// const aspectRatio = sizes.width / sizes.height;

/**
 * If aspect ratio isn't provided, the camera will be stretched or squished
 */
// const camera = new THREE.OrthographicCamera(
// 	-1 * aspectRatio,
// 	1 * aspectRatio,
// 	1,
// 	-1,
// 	0.1,
// 	1000
// );

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

/**
 * Cursor position
 */
const cursor = {
	x: 0,
	y: 0,
};

window.addEventListener("mousemove", (event) => {
	/**
	 * why -0.5?
	 *
	 * because we want the cursor to be in the center of the screen
	 * and the cursor position is in the top left corner
	 * so we need to subtract half of the screen size
	 * to get the cursor in the center
	 *
	 * why y is negative?
	 *
	 * because the y axis is inverted in the screen
	 * so we need to invert it again
	 */
	cursor.x = event.clientX / sizes.width - 0.5;
	cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
// const clock = new THREE.Clock();

const tick = () => {
	// const elapsedTime = clock.getElapsedTime();

	// Update objects
	// mesh.rotation.y = elapsedTime;

	// camera.position.x = cursor.x * 3;
	// camera.position.y = cursor.y * 3;

	/**
	 * why sin and cos?
	 *
	 * because we want the camera to move in a circle
	 * so we need to use the sin and cos functions
	 * to get the x and z position of the camera
	 * and the y position is the cursor position
	 * so we can move the camera up and down with the mouse
	 * and we multiply the result by 3 to get a bigger movement
	 */
	camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
	camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
	camera.position.y = cursor.y * 3;
	/**
	 * why lookAt?
	 *
	 * because we want the camera to look at the center of the cube
	 * so we need to pass the position of the cube to the lookAt method
	 */
	camera.lookAt(mesh.position);

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
