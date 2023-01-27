import * as THREE from "three";

import Core from "../Core";
import Time from "../utils/Time";
import Debug from "../utils/Debug";

export default class Sphere {
	core: Core;
	time?: Time;
	scene: THREE.Scene;
	sphere?: THREE.Mesh;
	debug?: Debug;
	debugObject: any = {};

	constructor() {
		this.core = new Core();
		this.time = this.core.time;
		this.debug = this.core.debug;
		this.scene = this.core.scene!;

		// Setup
		this.setMesh();
		this.setDebug();
	}

	setMesh() {
		this.sphere = new THREE.Mesh(
			new THREE.SphereGeometry(1, 32, 32),
			new THREE.MeshStandardMaterial()
		);
		this.sphere.position.set(5, 0, 0);
		this.sphere.castShadow = true;
		this.sphere.receiveShadow = true;

		this.scene.add(this.sphere);
	}

	setDebug() {}

	update() {}
}
