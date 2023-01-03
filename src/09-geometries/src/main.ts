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

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

const geometry = new THREE.BufferGeometry();

/**
 * vertices for a triangle
 */
// const vertices = new Float32Array([
// 	//  x,   y,   z
// 	0, 0, 0,

// 	0, 1, 0,

// 	1, 0, 0,
// ]);

/**
 * vertices for n random triangles
 *
 * (50 * 3 * 3): 50 triangles, 3 vertices per triangle, 3 components per vertex (x, y, z)
 */
const vertices = new Float32Array(50 * 3 * 3);

for (let i = 0; i < 50 * 3 * 3; i++) {
	vertices[i] = (Math.random() - 0.5) * 4;
}

/**
 * here we are setting the position attribute of the geometry
 * and we are passing the vertices array as the first argument
 * and the number of components per vertex as the second argument
 * in this case we have 3 components per vertex (x, y, z)
 * so we pass 3 as the second argument
 * the third argument is optional and it is used to specify the type of the data
 * in this case we are passing Float32Array (default) as the third argument
 */
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

const material = new THREE.MeshBasicMaterial({
	color: 0xff0000,
	wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
