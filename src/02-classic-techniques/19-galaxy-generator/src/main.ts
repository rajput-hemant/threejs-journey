import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import "./style.css";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 400 });

// Canvas
const canvas: HTMLElement = document.querySelector("canvas.webgl")!;

// Scene
const scene = new THREE.Scene();

const params = {
	count: 700000, // count of particles/stars
	size: 0.01, // size of a particle/star
	radius: 6, // radius of the galaxy
	branches: 3, // branches of the galaxy
	spin: 2,
	randomness: 0.2,
	randomnessPower: 3,
	inColor: "#ff6030",
	outColor: "#1b3984",
};

let geometry: THREE.BufferGeometry | null;
let material: THREE.PointsMaterial | null;
let points: THREE.Points | null;

const generateGalaxy = () => {
	/**
	 * Destroy old galaxy
	 */
	if (points !== null) {
		geometry?.dispose(); // disposes the geometry from the memory
		material?.dispose(); // Disposes the material from the memory
		scene.remove(points); // removes the points from the scene
	}

	/**
	 * Galaxy
	 */
	geometry = new THREE.BufferGeometry();
	const positions = new Float32Array(params.count * 3);
	const colors = new Float32Array(params.count * 3);

	const inColor = new THREE.Color(params.inColor);
	const outColor = new THREE.Color(params.outColor);

	for (let i = 0; i < params.count; i++) {
		// i * 3 because we have 3 coordinates per star
		const i3 = i * 3;

		/**
		 * Position
		 */
		const radius = Math.random() * params.radius;
		/**
		 * greater the radius, more the star will be away from straight line along the x axis
		 */
		const spinAngle = radius * params.spin;
		/**
		 * it divides the circle into equal parts, hence the branche angle
		 */
		const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2;

		const randomX =
			Math.pow(Math.random(), params.randomnessPower) *
			(Math.random() < 0.5 ? 1 : -1);
		const randomY =
			Math.pow(Math.random(), params.randomnessPower) *
			(Math.random() < 0.5 ? 1 : -1);
		const randomZ =
			Math.pow(Math.random(), params.randomnessPower) *
			(Math.random() < 0.5 ? 1 : -1);

		positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX;
		positions[i3 + 1] = randomY;
		positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

		/**
		 * Color
		 */
		const mixedColor = inColor.clone();
		mixedColor.lerp(outColor, radius / params.radius);

		colors[i3 + 0] = mixedColor.r;
		colors[i3 + 1] = mixedColor.g;
		colors[i3 + 2] = mixedColor.b;
	}

	geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

	/**
	 * Material
	 */
	material = new THREE.PointsMaterial({
		size: params.size,
		sizeAttenuation: true, // make the stars smaller as they get further away or bigger as they get closer
		depthWrite: false,
		blending: THREE.AdditiveBlending,
		vertexColors: true,
	});

	/**
	 * Points
	 */
	points = new THREE.Points(geometry, material);
	scene.add(points);
};

generateGalaxy();

/**
 * in order to make this work, we need to destroy the previously rendered galaxy if any
 */
gui.add(params, "count", 100, 1000000, 100).onFinishChange(generateGalaxy);
gui.add(params, "size", 0.001, 0.1, 0.001).onFinishChange(generateGalaxy);
gui.add(params, "radius", 0.01, 20, 0.01).onFinishChange(generateGalaxy);
gui.add(params, "branches", 2, 20, 1).onFinishChange(generateGalaxy);
gui.add(params, "spin", -5, 5, 0.001).onFinishChange(generateGalaxy);
gui.add(params, "randomness", 0, 2, 0.001).onFinishChange(generateGalaxy);
gui.add(params, "randomnessPower", 1, 10, 0.001).onFinishChange(generateGalaxy);
gui.addColor(params, "inColor").onFinishChange(generateGalaxy);
gui.addColor(params, "outColor").onFinishChange(generateGalaxy);

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
camera.position.x = 3;
camera.position.y = 3;
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
