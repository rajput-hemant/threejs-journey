import * as THREE from "three";

import Core from "./Core";
import Time from "./utils/Time";
import Debug from "./utils/Debug";
import Resources from "./utils/Resources";

export default class Base {
	core: Core;
	scene: THREE.Scene;
	geometry?: THREE.BufferGeometry;
	texture?: any = {};
	model?: THREE.Mesh;
	time?: Time;
	resources: Resources;
	resource: any;
	debug?: Debug;
	debugObject: any = {};

	constructor() {
		this.core = new Core();
		this.scene = this.core.scene!;
		this.resources = this.core.resources!;
		this.debug = this.core.debug;
		this.time = this.core.time;

		// Setup
		this.resource = this.resources.items.damagedHelmet;

		this.setTexture();
		this.setMaterial();
		this.setModel();
		this.setDebug();
	}

	setGeometry() {}

	setTexture() {}

	setMaterial() {}

	setModel() {
		this.model = this.resource.scene;
		this.model!.scale.set(2, 2, 2);
		this.model!.rotation.y = Math.PI * 0.5;

		this.scene.add(this.model!);

		/* updating materials to add lighting, shadows and stuff */
		this.updateMaterials();
	}

	updateMaterials = () => {
		this.scene.traverse((child) => {
			if (
				child instanceof THREE.Mesh &&
				child.material instanceof THREE.MeshStandardMaterial
			) {
				child.material.envMapIntensity = 1;
				child.material.needsUpdate = true;
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	};

	setDebug() {
		this.debug!.ui!.expanded = false;
	}

	update() {}
}
