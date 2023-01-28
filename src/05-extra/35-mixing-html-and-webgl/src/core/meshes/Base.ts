import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import Core from "../Core";
import Time from "../utils/Time";
import Debug from "../utils/Debug";

export default class Base {
	core: Core;
	time?: Time;
	scene: THREE.Scene;
	debug?: Debug;
	debugObject: any = {};

	model?: GLTF;

	constructor() {
		this.core = new Core();
		this.time = this.core.time;
		this.debug = this.core.debug;
		this.scene = this.core.scene!;

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

	update() {}
}
