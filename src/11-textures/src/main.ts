import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import "./style.css";

/**
 * Textures
 */
// const image = new Image();
// image.src = "/textures/door/color.jpg";
// const texture = new THREE.Texture(image);
// /**
//  * When the image is loaded, we need to update the texture
//  */
// image.onload = () => (texture.needsUpdate = true);

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
	console.log("onStart");
};
loadingManager.onLoad = () => {
	console.log("onLoad");
};
loadingManager.onProgress = () => {
	console.log("onProgress");
};
loadingManager.onError = () => {
	console.log("onError");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
/**
 * The textureLoader can load a texture from a path
 * load method has 4 callbacks
 * 1. load: when the texture is loaded
 * 2. progress: when the texture is loading
 * 3. error: when the texture is not loaded
 * one textureLoader can load multiple textures
 */
const colorTexture = textureLoader.load(
	"/textures/door/color.jpg",
	() => {
		console.log("load");
	},
	() => {
		console.log("progress");
	},
	() => {
		console.log("error");
	}
);
// const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
// const heightTexture = textureLoader.load("/textures/door/height.jpg");
// const normalTexture = textureLoader.load("/textures/door/normal.jpg");
// const ambientOcclusionTexture = textureLoader.load(
// 	"/textures/door/ambientOcclusion.jpg"
// );
// const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
// const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const moire = textureLoader.load(
	"/textures/checkerboard-1024x1024.png"
	// "/textures/checkerboard-8x8.png"
);

/**
 * How many times the texture is repeated across the surface, in each direction U and V.
 */
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
/**
 * this will repeat the texture
 */
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
/**
 * this will repeat and mirror the texture
 * wrapS defines how the texture is wrapped in the U direction
 * wrapT defines how the texture is wrapped in the V direction
 */
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

/**
 * this will offset the texture from the origin in each direction U and V. The offset is a value between 0 and 1.
 */
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

/**
 * this will rotate the texture in radians around the origin in each direction U and V. The rotation is a value between 0 and 1.
 */
// colorTexture.rotation = Math.PI * 0.25;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

/**
 * minFilter defines how the texture is filtered when it is displayed at a smaller size than the original image.
 *
 * THREE.NearestFilter: this will display the texture at its original size.
 *
 * THREE.LinearFilter: this will display the texture at a smaller size.
 *
 * generateMipmaps: this will generate a set of smaller textures that are used when the texture is displayed at a smaller size.
 *
 * in case of minFilter = THREE.NearestFilter, generateMipmaps is set to false (default) to avoid generating the smaller textures.
 */
moire.generateMipmaps = false;
moire.minFilter = THREE.NearestFilter;
/**
 * magFilter defines how the texture is filtered when it is displayed at a larger size than the original image.
 */
moire.magFilter = THREE.NearestFilter;

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
const material = new THREE.MeshBasicMaterial({ map: moire });
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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
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
