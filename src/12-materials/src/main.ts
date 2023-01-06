import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import "./style.css";

/**
 * Debug
 */
const gui = new dat.GUI();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
	"/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

/**
 * Base
 */
// Canvas
const canvas: HTMLElement = document.querySelector("canvas.webgl")!;

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial();
// material.map = doorAmbientOcclusionTexture;
// // material.color.set("red")
// // material.color = new THREE.Color("red");
// material.wireframe = true;
// material.transparent = true;
// // material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

/**
 * Normal material is used to see the normals of the object
 *
 *  What is a normal?
 * A normal is a vector that points in a perpendicular direction to the surface of an object.
 */
// const material = new THREE.MeshNormalMaterial();
// // material.flatShading = true;

/**
 * Matcap material will display color based on the normal of the object
 */
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

/**
 * MeshDepthMaterial will display the depth of the object
 * If the object is closer to the camera, it will be darker and vice versa
 */
// const material = new THREE.MeshDepthMaterial();

/**
 * MeshLambertMaterial will display the object with a Lambertian reflection model
 *
 * It will display the object with a color based on the light source
 */
// const material = new THREE.MeshLambertMaterial();

/**
 * MeshPhongMaterial will display the object with a Phong reflection model
 *
 * It is same as MeshLambertMaterial but it will display the object with a smooth shading
 *
 * It is less performant than MeshLambertMaterial
 */
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff); // color of the specular highlight

/**
 * MeshToonMaterial will display the object with a Toon shading
 */
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture; // this will display the object with a gradient color, need to set the minFilter and magFilter to THREE.NearestFilter

/**
 * MeshStandardMaterial will display the object with a PBR (Physically Based Rendering) material
 *
 * It is the most realistic material
 */
const material = new THREE.MeshStandardMaterial();
material.metalness = 0;
material.roughness = 1;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture; // for this to work, we need more subdivions
material.displacementScale = 0.05;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.1, 1);
material.transparent = true;
material.alphaMap = doorAlphaTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(1).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;

sphere.geometry.setAttribute(
	"uv2",
	new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
/**
 * this is to set aoMap (ambient occlusion map) to the plane geometry
 * it is used to add shadows to the object where texture is darker
 *
 * For this to work, we need to set another set of uv coordinates (duplicate) to the plane geometry named as uv2
 */
plane.geometry.setAttribute(
	"uv2",
	new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
	new THREE.TorusGeometry(0.3, 0.1, 64, 128),
	material
);

torus.geometry.setAttribute(
	"uv2",
	new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

torus.position.x = 1.5;

scene.add(sphere, plane, torus);

const ambientLight = new THREE.AmbientLight("#fff", 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("#fff", 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.x = 4;
scene.add(pointLight);

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
camera.position.y = 0;
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

	sphere.rotation.x = 0.1 * elapsedTime;
	plane.rotation.x = 0.1 * elapsedTime;
	torus.rotation.x = 0.1 * elapsedTime;

	sphere.rotation.y = 0.15 * elapsedTime;
	plane.rotation.y = 0.15 * elapsedTime;
	torus.rotation.y = 0.15 * elapsedTime;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
