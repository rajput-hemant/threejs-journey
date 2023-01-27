import * as THREE from "three";

import Core from "../Core";
import Time from "../utils/Time";
import Debug from "../utils/Debug";

export default class TorusKnot {
	core: Core;
	time?: Time;
	scene: THREE.Scene;
	torusKnot?: THREE.Mesh;
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
		this.torusKnot = new THREE.Mesh(
			new THREE.TorusKnotGeometry(1, 0.4, 128, 32),
			new THREE.MeshStandardMaterial()
		);
		this.torusKnot.castShadow = true;
		this.torusKnot.receiveShadow = true;

		this.scene.add(this.torusKnot);
	}

	setDebug() {}

	update() {}
}
