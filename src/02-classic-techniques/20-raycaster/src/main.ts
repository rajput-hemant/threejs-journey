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
 * Objects
 */
const object1 = new THREE.Mesh(
	new THREE.SphereGeometry(0.5, 16, 16),
	new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object1.position.x = -2;

const object2 = new THREE.Mesh(
	new THREE.SphereGeometry(0.5, 16, 16),
	new THREE.MeshBasicMaterial({ color: "#ff0000" })
);

const object3 = new THREE.Mesh(
	new THREE.SphereGeometry(0.5, 16, 16),
	new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object3.position.x = 2;

scene.add(object1, object2, object3);

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();

// const rayOrigin = new Vector3(-3, 0, 0);
// const rayDirection = new Vector3(10, 0, 0);
// /**
//  * rayDirection needs to be normalized, otherwise the raycaster will not work
//  * therfore, we need to call normalize() on the rayDirection
//  */
// rayDirection.normalize();

// raycaster.set(rayOrigin, rayDirection);

// const intersect  = raycaster.intersectObject(object1);

// const intersects = raycaster.intersectObjects([object1, object2, object3]);

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
 * Mouse
 */
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (e) => {
	/**
	 * mouse.x & mouse.y = -1 ~ 1
	 */
	mouse.x = (e.clientX / sizes.width) * 2 - 1;
	mouse.y = -(e.clientY / sizes.height) * 2 + 1;

	/**
	 * we will cast ray in the tick function instead of mousemove event handler function,
	 * because mousemove event is fired more frequently than tick function
	 */
});

/**
 * this is to add click eventlistner on objects
 */
window.addEventListener("click", () => {
	if (currentIntersect) {
		// console.log("clicked");

		switch (currentIntersect.object) {
			case object1:
				console.log("clicked object1");
				break;
			case object2:
				console.log("clicked object2");
				break;
			case object3:
				console.log("clicked object3");
				break;
		}
	}
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

let currentIntersect: THREE.Intersection | null;

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Animate Object
	object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
	object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
	object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

	// cast a ray
	raycaster.setFromCamera(mouse, camera);

	// const rayOrigin = new Vector3(-3, 0, 0);
	// const rayDirection = new Vector3(1, 0, 0);
	// rayDirection.normalize();

	// raycaster.set(rayOrigin, rayDirection);

	const objects = [object1, object2, object3];
	const intersects = raycaster.intersectObjects(objects);

	for (const object of objects) {
		object.material.color.set("#ff0000");
	}

	for (const intersect of intersects) {
		(
			(intersect.object as THREE.Mesh).material as THREE.MeshBasicMaterial
		).color.set("#0000ff");
	}

	/**
	 * this is to detect mouse enter and mouse leave event
	 */
	if (intersects.length) {
		if (currentIntersect === null) {
			console.log("mouse enter");
		}
		currentIntersect = intersects[0];
	} else {
		if (currentIntersect) {
			console.log("mouse leave");
		}
		currentIntersect = null;
	}

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
