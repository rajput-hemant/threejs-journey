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
	material?: THREE.MeshStandardMaterial;
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
		this.resource = this.resources.items.leePerrySmith;

		this.setTexture();
		this.setMaterial();
		this.setModel();
	}

	setGeometry() {}

	setTexture() {
		this.texture.mapTexture = this.resources.items.mapTexture;
		this.texture.mapTexture.encoding = THREE.sRGBEncoding;
		this.texture.normalTexture = this.resources.items.normalTexture;
	}

	setMaterial() {
		this.material = new THREE.MeshStandardMaterial({
			map: this.texture.mapTexture,
			normalMap: this.texture.normalTexture,
		});
	}

	setModel() {
		this.model = this.resource.scene.children[0];
		this.model!.rotation.y = Math.PI * 0.5;
		this.model!.material = this.material!;

		this.scene.add(this.model!);

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

	setDebug() {}

	update() {}
}
