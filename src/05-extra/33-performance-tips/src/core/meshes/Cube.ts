import * as THREE from "three";

import Core from "../Core";
import Time from "../utils/Time";
import Debug from "../utils/Debug";

export default class Cube {
	core: Core;
	time?: Time;
	scene: THREE.Scene;
	debug?: Debug;
	cube?: THREE.Mesh;
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
		this.cube = new THREE.Mesh(
			new THREE.BoxGeometry(2, 2, 2),
			new THREE.MeshStandardMaterial()
		);
		this.cube.castShadow = true;
		this.cube.receiveShadow = true;
		this.cube.position.set(-5, 0, 0);

		this.scene.add(this.cube);
	}

	setDebug() {}

	update() {}
}
