import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl")!;

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

/**
 * defining position of mesh,
 * can be defined anywhere b/w mesh & renderer initialization
 * posiiton is a Vector3 object
 */
mesh.position.x = 0.7;
mesh.position.y = -0.6;
mesh.position.z = 1;
scene.add(mesh);

/**
 * gives length of mesh
 */
console.log(mesh.position.length());

/**
 * it reduces length of vector to 1
 */

console.log(mesh.position.normalize());
/**
 * set x, y, z value of vector at once
 */
mesh.position.set(0.7, -0.6, 1);

/**
 * reorder axes
 */
mesh.rotation.reorder("ZYX");

/**
 * rotate vector on an axis
 */
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;
mesh.rotation.z = Math.PI * 0.25;

// Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * scale vector's axis
 */
mesh.scale.x = 1.5;
mesh.scale.y = 0.5;
mesh.scale.z = 0.5;
// mesh.scale.set(1.5, 0.5, 0.5);

// Sizes
const sizes = {
	width: 800,
	height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/**
 * distance b/w mesh vector & camera vector
 */
console.log(mesh.position.distanceTo(camera.position));

camera.lookAt(mesh.position);

/**
 * creating a group object to handle multiple meshes as a group
 */
const group = new THREE.Group();

const cubeA = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: "blue" })
);
const cubeB = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: "green" })
);

cubeB.position.x = 2;

group.add(cubeA);
group.add(cubeB);

scene.add(group);

group.rotation.x = 1;

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
