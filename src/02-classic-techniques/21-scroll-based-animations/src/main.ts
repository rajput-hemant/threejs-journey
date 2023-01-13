import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import gsap from "gsap";

/**
 * Debug
 */
const gui = new dat.GUI();

const params = {
	materialColor: "#ffeded",
};

gui.addColor(params, "materialColor").onChange(() => {
	material.color.set(params.materialColor);
	particlesMaterial.color.set(params.materialColor);
});

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
// Textures
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
gradientTexture.magFilter = THREE.NearestFilter;

// Material
const material = new THREE.MeshToonMaterial({
	color: params.materialColor,
	gradientMap: gradientTexture,
});

// Meshes
const objectDistance = 4;
const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);

const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);

const mesh3 = new THREE.Mesh(
	new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
	material
);

/**
 * this is to position the objects at a certain distance from each other on the y axis
 */
mesh1.position.y = -objectDistance * 0;
mesh2.position.y = -objectDistance * 1;
mesh3.position.y = -objectDistance * 2;

mesh1.position.x = 2;
mesh2.position.x = -2;
mesh3.position.x = 2;

scene.add(mesh1, mesh2, mesh3);

const sectionMeshes = [mesh1, mesh2, mesh3];

/**
 * Particles
 */
// Geometry
const particlesCount = 200;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
	positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
	positions[i * 3 + 1] =
		objectDistance * 0.5 -
		Math.random() * objectDistance * sectionMeshes.length;
	positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
	"position",
	new THREE.BufferAttribute(positions, 3)
);

// Material
const particlesMaterial = new THREE.PointsMaterial({
	color: params.materialColor,
	size: 0.03,
	sizeAttenuation: true,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Lights
 */
const directionalLights = new THREE.DirectionalLight(0xffffff, 1);
directionalLights.position.set(1, 1, 0);
scene.add(directionalLights);

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
// Group
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(
	35,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.z = 8;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Scroll
 */
let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener("scroll", () => {
	scrollY = window.scrollY;

	const newSection = Math.floor(scrollY / sizes.height);
	if (newSection !== currentSection) {
		currentSection = newSection;

		gsap.to(sectionMeshes[currentSection].rotation, {
			duration: 1.5,
			ease: "power32.inOut",
			x: "+=6",
			y: "+=3",
			z: "+=1.5",
		});
	}
});

/**
 * Cursor
 */
const cursor = {
	x: 0,
	y: 0,
};
window.addEventListener("mousemove", (e) => {
	/**
	 * x, y ~ -0.5, 0.5
	 */
	cursor.x = e.clientX / sizes.width - 0.5;
	cursor.y = e.clientY / sizes.width - 0.5;
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let prevTime = 0;

const tick = () => {
	const elapsedTime = clock.getElapsedTime();
	const deltaTime = elapsedTime - prevTime;
	prevTime = elapsedTime;

	// Animate Camera
	/**
	 * this is to move the camera up and down based on the scroll position
	 * the scroll position is divided by the height of the viewport and multiplied by the distance between the objects
	 */
	camera.position.y = (-scrollY / sizes.height) * objectDistance;

	const parallaxX = cursor.x * 0.5;
	const parallaxY = -cursor.y * 0.5;
	/**
	 * to achive parallax effect as well as scrolling effect, we need to add the camera to a group and then set position of the group
	 */
	// cameraGroup.position.x = parallaxX;
	// cameraGroup.position.y = parallaxY;

	/**
	 * this is to add a smooth transition (ease-in effect) between the camera position and the parallax position
	 */
	cameraGroup.position.x +=
		(parallaxX - cameraGroup.position.x) * deltaTime * 5;
	cameraGroup.position.y +=
		(parallaxY - cameraGroup.position.y) * deltaTime * 5;

	// Animate Meshes
	for (const mesh of sectionMeshes) {
		mesh.rotation.x += deltaTime * 0.1;
		mesh.rotation.y += deltaTime * 0.12;
	}

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
