import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import CANNON, { Vec3 } from "cannon";

/**
 * Debug
 */
const gui = new dat.GUI();
const debugObject = {
	createSphere: () => {},
	createBox: () => {},
	reset: () => {},
};

/**
 * Base
 */
// Canvas
const canvas: HTMLElement = document.querySelector("canvas.webgl")!;

// Scene
const scene = new THREE.Scene();

/**
 * Sounds
 */
const sound = new Audio("/sounds/hit.mp3");

const playSound = (collision: any) => {
	/**
	 * this is the velocity of the object that hit the other object
	 * we can use this to determine how hard the object hit the other object
	 */
	const impactStrength = collision.contact.getImpactVelocityAlongNormal();

	if (impactStrength > 1.5) {
		sound.volume = Math.random();
		sound.currentTime = 0;
		sound.play();
	}
};

/**
 * Textures
 */
// const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
	"/textures/environmentMaps/0/px.png",
	"/textures/environmentMaps/0/nx.png",
	"/textures/environmentMaps/0/py.png",
	"/textures/environmentMaps/0/ny.png",
	"/textures/environmentMaps/0/pz.png",
	"/textures/environmentMaps/0/nz.png",
]);

/**
 * Physics
 */
// World
const world = new CANNON.World();
/**
 * broadphase: the algorithm used to detect collisions between objects
 * by default it checks all the objects in the world against each other, which is very inefficient
 * SAPBroadphase is a good alternative, it checks objects against each other only if they are close to each other
 */
world.broadphase = new CANNON.SAPBroadphase(world);
/**
 * allowSleep: if true, bodies that are at rest will fall asleep and won't be checked for collisions until they move again
 */
world.allowSleep = true;
world.gravity.set(0, -9.82, 0);

// Materials
// const concreteMaterial = new CANNON.Material("concrete");
// const plasticMaterial = new CANNON.Material("plastic");
const defaultMaterial = new CANNON.Material("default");

// const concretePlasticContactMaterial = new CANNON.ContactMaterial(
// 	concreteMaterial,
// 	plasticMaterial,
// 	{
// 		friction: 0.1,
// 		restitution: 0.7, // bounciness
// 	}
// );
// world.addContactMaterial(concretePlasticContactMaterial);

const defaultContactMaterial = new CANNON.ContactMaterial(
	defaultMaterial,
	defaultMaterial,
	{
		friction: 0.1,
		restitution: 0.7, // bounciness
	}
);
world.addContactMaterial(defaultContactMaterial);
/**
 * either set the material on the object body or set the defaultContactMaterial like below
 */
world.defaultContactMaterial = defaultContactMaterial;

// Sphere body
// const sphereShape = new CANNON.Sphere(0.5);
// const sphereBody = new CANNON.Body({
// 	mass: 1,
// 	shape: sphereShape,
// 	position: new CANNON.Vec3(0, 3, 0),
// 	// material: plasticMaterial,
// 	// material: defaultMaterial,
// });
// sphereBody.applyLocalForce(
// 	new CANNON.Vec3(150, 0, 0), // force
// 	new CANNON.Vec3(0, 0, 0) // local position
// );
// world.addBody(sphereBody);

// Floor
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body({
	mass: 0, // this means that the body is static
	shape: floorShape,
	// material: concreteMaterial,
	// material: defaultMaterial,
});
// Rotate the floor 90 degrees to make it horizontal
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
world.addBody(floorBody);

/**
 * Test sphere
 */
// const sphere = new THREE.Mesh(
// 	new THREE.SphereGeometry(0.5, 32, 32),
// 	new THREE.MeshStandardMaterial({
// 		metalness: 0.3,
// 		roughness: 0.4,
// 		envMap: environmentMapTexture,
// 		envMapIntensity: 0.5,
// 	})
// );
// sphere.castShadow = true;
// sphere.position.y = 0.5;
// scene.add(sphere);

/**
 * Floor
 */
const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(500, 500),
	new THREE.MeshStandardMaterial({
		color: "#777777",
		metalness: 0.3,
		roughness: 0.4,
		envMap: environmentMapTexture,
		envMapIntensity: 0.5,
	})
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
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
camera.position.set(-3, 3, 3);
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * utils
 */
const objectToUpdate: any[] = [];

// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
	metalness: 0.3,
	roughness: 0.4,
	envMap: environmentMapTexture,
});

/**
 * This will create a Three.js sphere along with a Cannon.js physics sphere
 * @param radius radius of the sphere
 * @param position position of the sphere
 */
const createSphere = (radius: number, position: THREE.Vector3) => {
	// Three.js mesh
	const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
	mesh.scale.set(radius, radius, radius);
	mesh.castShadow = true;
	mesh.position.copy(position);
	scene.add(mesh);

	// Cannon.js body
	const shape = new CANNON.Sphere(radius);
	const body = new CANNON.Body({
		mass: 1,
		shape,
		position: new CANNON.Vec3(0, 3, 0),
		material: defaultMaterial,
	});
	body.position.copy(position as unknown as CANNON.Vec3);
	/**
	 * This will play a sound when the box collides with the other objects
	 */
	body.addEventListener("collide", playSound);
	world.addBody(body);

	// Save in the updatable objects array
	objectToUpdate.push({
		mesh,
		body,
	});
};

createSphere(0.5, new THREE.Vector3(0, 3, 0));

debugObject.createSphere = () => {
	createSphere(
		Math.random(),
		new THREE.Vector3(Math.random() - 0.5 * 3, 3, Math.random() - 0.5 * 3)
	);
};

// Box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
	metalness: 0.3,
	roughness: 0.4,
	envMap: environmentMapTexture,
});

/**
 * This will create a Three.js Box along with a Cannon.js physics Box
 * @param width width of the box
 * @param height height of the box
 * @param depth depth of the box
 * @param position position of the box
 *
 */
const createBox = (
	width: number,
	height: number,
	depth: number,
	position: THREE.Vector3
) => {
	// Three.js mesh
	const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
	mesh.scale.set(width, height, depth);
	mesh.castShadow = true;
	mesh.position.copy(position);
	scene.add(mesh);

	// Cannon.js body
	const shape = new CANNON.Box(
		new Vec3(width * 0.5, height * 0.5, depth * 0.5)
	);
	const body = new CANNON.Body({
		mass: 1,
		shape,
		position: new CANNON.Vec3(0, 3, 0),
		material: defaultMaterial,
	});
	body.position.copy(position as unknown as CANNON.Vec3);
	/**
	 * This will play a sound when the box collides with the other objects
	 */
	body.addEventListener("collide", playSound);
	world.addBody(body);

	// Save in the updatable objects array
	objectToUpdate.push({
		mesh,
		body,
	});
};

createBox(1, 1, 1, new THREE.Vector3(0, 3, 0));

debugObject.createBox = () => {
	createBox(
		Math.random(),
		Math.random(),
		Math.random(),
		new THREE.Vector3(Math.random() - 0.5 * 3, 3, Math.random() - 0.5 * 3)
	);
};

debugObject.reset = () => {
	for (const object of objectToUpdate) {
		object.body.removeEventListener("collide", playSound);

		// remove body from physical world
		world.remove(object.body);

		// remove mesh from scene
		scene.remove(object.mesh);
	}
};

gui.add(debugObject, "createSphere").name("Click to Create Sphere");
gui.add(debugObject, "createBox").name("Click to Create Box");
gui.add(debugObject, "reset").name("Reset");
/**
 * Animate
 */
const clock = new THREE.Clock();
let prevElapsedTime = 0;

const tick = () => {
	const elapsedTime = clock.getElapsedTime();
	const deltaTime = elapsedTime - prevElapsedTime;

	// Update Physics World
	// sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position);

	/**
	 *  this is used to update the physics world
	 * parameters:
	 * fixedTimeStep - the time step to use for fixed updates
	 * deltaTime - the time elapsed since the last call to step
	 * maxSubSteps - the maximum number of fixed updates to take per function call
	 */
	world.step(1 / 60, deltaTime, 3);

	// sphere.position.copy(sphereBody.position as unknown as THREE.Vector3);

	for (const obj of objectToUpdate) {
		obj.mesh.position.copy(obj.body.position as unknown as THREE.Vector3);

		// this is used to update the rotation of the object
		obj.mesh.quaternion.copy(
			obj.body.quaternion as unknown as THREE.Quaternion
		);
	}

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
