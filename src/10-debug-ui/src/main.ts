import gsap from "gsap";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import "./style.css";

/**
 * Debug
 */
const gui = new dat.GUI({ closed: true, width: 400 });

const parameters = {
	color: "#ff0000",
	spin: () => {
		gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
	},
};

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
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Debug
/**
 * what this does is it creates a slider that goes from -3 to 3 with a step of 0.01 to change the value of the y position of the mesh
 */
// gui.add(mesh.position, "y", -3, 3, 0.01);
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("Elevation");

/**
 * this will create a checkbox that will toggle the visibility of the mesh
 */
gui.add(mesh, "visible").name("Visibility");

/**
 * this will create a checkbox that will toggle the wireframe of the mesh
 */
gui.add(mesh.material, "wireframe").name("Wireframe");

/**
 * this will create a color picker that will change the color of the mesh
 * we cant use the color property of the material directly because it is a THREE.Color object and not a string
 * so we need to create a new property in the parameters object and then we can use the onChange method to update the color of the material
 */
gui
	.addColor(parameters, "color")
	.onChange(() => material.color.set(parameters.color))
	.name("Color");

/**
 * this will create a button that will spin the mesh
 * we cant use the spin method directly because it is a function and not a boolean
 * so we need to create a new property (spin function) in the parameters object to be able to use it
 */
gui.add(parameters, "spin").name("Spin");

/**
 * Sizes
 */
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
