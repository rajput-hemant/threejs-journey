import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
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
 * Models
 */
/**
 * Draco is a library for compressing and decompressing 3D geometric meshes and point clouds (https://en.wikipedia.org/wiki/Point_cloud).
 *
 * We can use Service Worker to load the decoder, for that we need to copy the decoder from node_modules/three/examples/jsm/libs/draco to public/draco and then set the path to the decoder.
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

/**
 * GLTF is a file format for 3D models
 *
 */
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// gltfLoader.load(
// 	// "/models/Duck/glTF/Duck.gltf",
// 	// "/models/Duck/glTF-Draco/Duck.gltf",
// 	// "/models/FlightHelmet/glTF/FlightHelmet.gltf",
// 	"/models/Fox/glTF/Fox.gltf",
// 	(gltf) => {
// 		gltf.scene.scale.set(0.1, 0.1, 0.1);
// 		// gltf.scene.position.set(0, 0, 0);
// 		// gltf.scene.rotation.y = Math.PI * 0.5;
// 		// while (gltf.scene.children.length) {
// 		// 	const child = gltf.scene.children[0];
// 		// 	scene.add(child);
// 		// }
// 		scene.add(gltf.scene);
// 	}
// );

let mixer: THREE.AnimationMixer | null = null;
gltfLoader.load("/models/Fox/glTF/Fox.gltf", (gltf) => {
	mixer = new THREE.AnimationMixer(gltf.scene);
	const action = mixer.clipAction(gltf.animations[2]);

	action.play();

	gltf.scene.scale.set(0.1, 0.1, 0.1);
	scene.add(gltf.scene);
});

/**
 * Floor
 */
const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(30, 30),
	new THREE.MeshStandardMaterial({
		color: "#444444",
		metalness: 0,
		roughness: 0.5,
	})
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;

scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

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
	1000
);
camera.position.set(-2, 6, 15);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
	const elapsedTime = clock.getElapsedTime();
	const deltaTime = elapsedTime - previousTime;
	previousTime = elapsedTime;

	// Update Mixer
	if (mixer) {
		mixer.update(deltaTime);
	}

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
