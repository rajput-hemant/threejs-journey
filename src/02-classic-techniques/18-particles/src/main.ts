import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas: HTMLElement = document.querySelector("canvas.webgl")!;

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/2.png");

/**
 * Particles
 */
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
const particlesGeometry = new THREE.BufferGeometry();

const count = 5000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
	positions[i] = (Math.random() - 0.5) * 10;
	colors[i] = Math.random();
}

particlesGeometry.setAttribute(
	"position",
	new THREE.BufferAttribute(positions, 3)
);

particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particlesMaterials = new THREE.PointsMaterial({
	size: 0.1,
	sizeAttenuation: true, // this will resize the material w.r.t to the distance from the camera
	// color: "#ff88cc",
	transparent: true,
	alphaMap: particleTexture,
	/**
	 * properties below are used to remove the transparent pixels
	 */
	// alphaTest: 0.001, // this will (remove/not render) the transparent pixels
	// depthTest: false, // this will render the particles on top of the other objects, but depth testing might create bugs if you have other objects in your scene
	depthWrite: false,
	blending: THREE.AdditiveBlending, // this will add the color of the pixel to the color of the pixel below it/already drawn
	vertexColors: true,
});

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterials);
scene.add(particles);

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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update Particles
	// particles.rotation.y = elapsedTime * 0.2;

	for (let i = 0; i < count; i++) {
		const i3 = i * 3;

		const x = particlesGeometry.attributes.position.array[i3];
		// @ts-ignore
		particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
			elapsedTime + x
		);

		particlesGeometry.attributes.position.needsUpdate = true;
	}

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
