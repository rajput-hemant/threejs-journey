import "./style.css";
import Experience from "./experience/Experience";

new Experience(document.querySelector("canvas.webgl") as HTMLElement);

// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "dat.gui";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// /**
//  * Loaders
//  */
// const gltfLoader = new GLTFLoader();
// const textureLoader = new THREE.TextureLoader();
// const cubeTextureLoader = new THREE.CubeTextureLoader();

// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI();
// const debugObject = {
// 	envMapIntensity: 5,
// };

// // Canvas
// const canvas: HTMLElement = document.querySelector("canvas.webgl")!;

// // Scene
// const scene = new THREE.Scene();

// /**
//  * Update all materials
//  */
// const updateAllMaterials = () => {
// 	scene.traverse((child) => {
// 		if (
// 			child instanceof THREE.Mesh &&
// 			child.material instanceof THREE.MeshStandardMaterial
// 		) {
// 			// child.material.envMap = environmentMap
// 			child.material.envMapIntensity = debugObject.envMapIntensity;
// 			child.material.needsUpdate = true;
// 			child.castShadow = true;
// 			child.receiveShadow = true;
// 		}
// 	});
// };

// /**
//  * Environment map
//  */
// const environmentMap = cubeTextureLoader.load([
// 	"/textures/environmentMap/px.jpg",
// 	"/textures/environmentMap/nx.jpg",
// 	"/textures/environmentMap/py.jpg",
// 	"/textures/environmentMap/ny.jpg",
// 	"/textures/environmentMap/pz.jpg",
// 	"/textures/environmentMap/nz.jpg",
// ]);

// environmentMap.encoding = THREE.sRGBEncoding;

// // scene.background = environmentMap
// scene.environment = environmentMap;

// debugObject.envMapIntensity = 0.4;
// gui
// 	.add(debugObject, "envMapIntensity")
// 	.min(0)
// 	.max(4)
// 	.step(0.001)
// 	.onChange(updateAllMaterials);

// /**
//  * Models
//  */
// let foxMixer: THREE.AnimationMixer;

// gltfLoader.load("/models/Fox/glTF/Fox.gltf", (gltf) => {
// 	// Model
// 	gltf.scene.scale.set(0.02, 0.02, 0.02);
// 	scene.add(gltf.scene);

// 	// Animation
// 	foxMixer = new THREE.AnimationMixer(gltf.scene);
// 	const foxAction = foxMixer.clipAction(gltf.animations[0]);
// 	foxAction.play();

// 	// Update materials
// 	updateAllMaterials();
// });

// /**
//  * Floor
//  */
// const floorColorTexture = textureLoader.load("textures/dirt/color.jpg");
// floorColorTexture.encoding = THREE.sRGBEncoding;
// floorColorTexture.repeat.set(1.5, 1.5);
// floorColorTexture.wrapS = THREE.RepeatWrapping;
// floorColorTexture.wrapT = THREE.RepeatWrapping;

// const floorNormalTexture = textureLoader.load("textures/dirt/normal.jpg");
// floorNormalTexture.repeat.set(1.5, 1.5);
// floorNormalTexture.wrapS = THREE.RepeatWrapping;
// floorNormalTexture.wrapT = THREE.RepeatWrapping;

// const floorGeometry = new THREE.CircleGeometry(5, 64);
// const floorMaterial = new THREE.MeshStandardMaterial({
// 	map: floorColorTexture,
// 	normalMap: floorNormalTexture,
// });
// const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// floor.rotation.x = -Math.PI * 0.5;
// scene.add(floor);

// /**
//  * Lights
//  */
// const directionalLight = new THREE.DirectionalLight("#ffffff", 4);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.far = 15;
// directionalLight.shadow.mapSize.set(1024, 1024);
// directionalLight.shadow.normalBias = 0.05;
// directionalLight.position.set(3.5, 2, -1.25);
// scene.add(directionalLight);

// gui
// 	.add(directionalLight, "intensity")
// 	.min(0)
// 	.max(10)
// 	.step(0.001)
// 	.name("lightIntensity");
// gui
// 	.add(directionalLight.position, "x")
// 	.min(-5)
// 	.max(5)
// 	.step(0.001)
// 	.name("lightX");
// gui
// 	.add(directionalLight.position, "y")
// 	.min(-5)
// 	.max(5)
// 	.step(0.001)
// 	.name("lightY");
// gui
// 	.add(directionalLight.position, "z")
// 	.min(-5)
// 	.max(5)
// 	.step(0.001)
// 	.name("lightZ");

// /**
//  * Sizes
//  */
// const sizes = {
// 	width: window.innerWidth,
// 	height: window.innerHeight,
// };

// window.addEventListener("resize", () => {
// 	// Update sizes
// 	sizes.width = window.innerWidth;
// 	sizes.height = window.innerHeight;

// 	// Update camera
// 	camera.aspect = sizes.width / sizes.height;
// 	camera.updateProjectionMatrix();

// 	// Update renderer
// 	renderer.setSize(sizes.width, sizes.height);
// 	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(
// 	35,
// 	sizes.width / sizes.height,
// 	0.1,
// 	100
// );
// camera.position.set(6, 4, 8);
// scene.add(camera);

// // Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
// 	canvas: canvas,
// 	antialias: true,
// });
// renderer.physicallyCorrectLights = true;
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.CineonToneMapping;
// renderer.toneMappingExposure = 1.75;
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setClearColor("#211d20");
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// /**
//  * Animate
//  */
// const clock = new THREE.Clock();
// let previousTime = 0;

// const tick = () => {
// 	const elapsedTime = clock.getElapsedTime();
// 	const deltaTime = elapsedTime - previousTime;
// 	previousTime = elapsedTime;

// 	// Update controls
// 	controls.update();

// 	// Fox animation
// 	if (foxMixer) {
// 		foxMixer.update(deltaTime);
// 	}

// 	// Render
// 	renderer.render(scene, camera);

// 	// Call tick again on the next frame
// 	window.requestAnimationFrame(tick);
// };

// tick();
