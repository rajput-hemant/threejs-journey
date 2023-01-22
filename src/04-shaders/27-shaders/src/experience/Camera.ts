import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Sizes from "./utils/Sizes";
import Experience from "./Experience";

export default class Camera {
	experience: Experience;
	canvas: HTMLElement;
	sizes: Sizes;
	scene: THREE.Scene;

	instance?: THREE.PerspectiveCamera;
	orbitControls?: OrbitControls;

	constructor() {
		this.experience = new Experience();
		this.canvas = this.experience.canvas!;
		this.sizes = this.experience.sizes!;
		this.scene = this.experience.scene!;

		this.setCamera();
		this.setOrbitControls();
	}

	setCamera() {
		this.instance = new THREE.PerspectiveCamera(
			75,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		);
		this.instance.position.set(0.25, -0.25, 1);
		this.scene.add(this.instance);
	}

	setOrbitControls() {
		this.orbitControls = new OrbitControls(this.instance!, this.canvas);
		this.orbitControls.enableDamping = true;
	}

	resize() {
		this.instance!.aspect = this.sizes.width / this.sizes.height;
		this.instance!.updateProjectionMatrix();
	}

	update() {
		this.orbitControls!.update();
	}
}
