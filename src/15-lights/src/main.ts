import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas: HTMLElement = document.querySelector("canvas.webgl")!;

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 *
 * AmbientLight will light up all the objects in the scene equally.
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// gui.add(ambientLight, "intensity", 0, 1, 0.01);

/**
 * DirectionalLight will have a sun like effect as the light (parrallel rays) will come from a specific direction
 */
const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

/**
 * HemisphereLight is similar to the AmbientLight but it will have a different color for the sky and the ground.
 */
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);

/**
 * PointLight will emit light in all directions from a specific point.
 * It will have a falloff (decay) effect as the distance from the light increases.
 *
 * The decline in illumination with distance is called falloff or attenuation.
 *
 * The falloff is controlled by the distance and decay properties of the light.
 */
const pointLight = new THREE.PointLight(0xffffff, 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

/**
 * The RectAreaLight is a light source positioned at a specific point in space,
 * which emits light uniformly across the face of a rectangular plane.
 * This light type can be used to simulate light sources such as bright windows or strip lighting.
 *
 * It has a width and height property to define the size of the light.
 *
 * It only works with MeshStandardMaterial and MeshPhysicalMaterial.
 */
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
/**
 * The lookAt() method is used to make the light look at a specific point in space, in this case the center of the scene.
 */
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

const spotlight = new THREE.SpotLight(
	0x78ff00,
	0.5,
	10, // light will fade after this distance
	Math.PI / 12, // angle, in this case it is 15 degrees
	0.25, // penumbra, this is used to create a soft edge
	1 // decay
);
spotlight.position.set(0, 2, 3);
scene.add(spotlight);

/**
 * The target property is used to make the light look at a specific point in space.
 *
 * In order to make this work, we need to add the target to the scene.
 * Because the target property is not a Vector3.
 */
spotlight.target.position.x = -0.75;
scene.add(spotlight.target);

/**
 * Helpers
 */
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
	hemisphereLight,
	0.1
);
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(
	directionalLight,
	0.2
);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

const spotlightHelper = new THREE.SpotLightHelper(spotlight);
scene.add(spotlightHelper);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
	new THREE.TorusGeometry(0.3, 0.2, 32, 64),
	material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

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
camera.position.z = 2;
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

	// Update objects
	sphere.rotation.y = 0.1 * elapsedTime;
	cube.rotation.y = 0.1 * elapsedTime;
	torus.rotation.y = 0.1 * elapsedTime;

	sphere.rotation.x = 0.15 * elapsedTime;
	cube.rotation.x = 0.15 * elapsedTime;
	torus.rotation.x = 0.15 * elapsedTime;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
