import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import Core from "../Core";
import Time from "../utils/Time";
import Debug from "../utils/Debug";

const points = [
	{
		position: new THREE.Vector3(1.55, 0.3, -0.6),
		element: document.querySelector(".point-0") as HTMLElement,
	},
	{
		position: new THREE.Vector3(0.5, 0.8, -1.6),
		element: document.querySelector(".point-1") as HTMLElement,
	},
	{
		position: new THREE.Vector3(1.6, -1.3, -0.7),
		element: document.querySelector(".point-2") as HTMLElement,
	},
];

export default class Base {
	core: Core;
	time?: Time;
	scene: THREE.Scene;
	debug?: Debug;
	debugObject: any = {};

	model?: GLTF;

	private raycaster: THREE.Raycaster;

	constructor() {
		this.core = new Core();
		this.time = this.core.time;
		this.debug = this.core.debug;
		this.scene = this.core.scene!;
		this.raycaster = new THREE.Raycaster();

		// Setup
		this.setDebug();
		this.setModel();
	}

	setModel() {
		this.model = this.core.resources!.items.DamagedHelmet;
		this.model!.scene.scale.set(2.5, 2.5, 2.5);
		this.model!.scene.rotation.y = Math.PI * 0.5;

		this.scene.add(this.model!.scene);

		this.updateAllMaterials();
	}

	updateAllMaterials = () => {
		this.scene.traverse((child) => {
			if (
				child instanceof THREE.Mesh &&
				child.material instanceof THREE.MeshStandardMaterial
			) {
				// child.material.envMap = environmentMap
				child.material.envMapIntensity =
					this.core.world!.environment!.debugObject.envMapIntensity;
				child.material.needsUpdate = true;
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	};

	setDebug() {}

	update() {
		if (this.core.resources!.sceneReady)
			// Go through each point
			points.forEach((point) => {
				const screenPosition = point.position.clone();
				/**
				 * project method will take the position and project it on the screen
				 */
				screenPosition.project(this.core.camera!.instance!);

				/**
				 * Set the raycaster origin to the point position
				 */
				this.raycaster.setFromCamera(
					screenPosition,
					this.core.camera!.instance!
				);
				/**
				 * Intersect the raycaster with the all the objects in the scene
				 */
				const intersects = this.raycaster.intersectObjects(
					this.scene.children,
					true // recursively check all the children
				);

				/**
				 * If there is no intersection, then the point is visible
				 * Else, the point is not visible
				 */
				if (intersects.length === 0) {
					point.element.classList.add("visible");
				} else {
					const intersectDistance = intersects[0].distance;
					const pointDistance = point.position.distanceTo(
						this.core.camera!.instance!.position
					);
					if (intersectDistance < pointDistance) {
						point.element.classList.remove("visible");
					} else {
						point.element.classList.add("visible");
					}
				}

				const translateX = screenPosition.x * this.core.sizes!.width * 0.5;
				const translateY = -screenPosition.y * this.core.sizes!.height * 0.5;
				point.element.style.transform = `translate(${translateX}px, ${translateY}px)`;
			});
	}
}
