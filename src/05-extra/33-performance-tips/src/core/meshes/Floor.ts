import * as THREE from "three";

import Core from "../Core";
import Time from "../utils/Time";
import Debug from "../utils/Debug";

export default class Floor {
	core: Core;
	time?: Time;
	scene: THREE.Scene;
	floor?: THREE.Mesh;
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
		this.floor = new THREE.Mesh(
			new THREE.PlaneGeometry(10, 10),
			new THREE.MeshStandardMaterial()
		);
		this.floor.position.set(0, -2, 0);
		this.floor.rotation.x = -Math.PI * 0.5;
		this.floor.castShadow = true;
		this.floor.receiveShadow = true;

		this.scene.add(this.floor);
	}

	setDebug() {}

	update() {}
}
