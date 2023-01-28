import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Core from "../Core";
import Sizes from "../utils/Sizes";

export default class Camera {
	core: Core;
	canvas: HTMLElement;
	sizes: Sizes;
	scene: THREE.Scene;

	instance?: THREE.PerspectiveCamera;
	orbitControls?: OrbitControls;

	constructor() {
		this.core = new Core();
		this.canvas = this.core.canvas!;
		this.sizes = this.core.sizes!;
		this.scene = this.core.scene!;

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
		this.instance.position.set(4, 1, -4);
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
