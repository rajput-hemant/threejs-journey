import * as THREE from "three";

import Core from "../Core";
import Debug from "../utils/Debug";
import Resources from "../utils/Resources";

export default class Environment {
	core: Core;
	scene: THREE.Scene;
	resources: Resources;
	sunlight?: THREE.DirectionalLight;
	environmentMap?: any = {};
	debug?: Debug;
	debugObject?: any = {};

	constructor() {
		this.core = new Core();
		this.scene = this.core.scene!;
		this.resources = this.core.resources!;
		this.debug = this.core.debug;

		// Setup
		this.setEnvironmentMap();
		this.setSunlight();
	}

	setEnvironmentMap() {
		this.environmentMap = this.core.resources!.items.environmentMap;
		this.environmentMap.encoding = THREE.sRGBEncoding;

		this.scene.background = this.environmentMap;
		this.scene.environment = this.environmentMap;

		this.debugObject.envMapIntensity = 2.5;
	}

	setSunlight() {
		this.sunlight = new THREE.DirectionalLight("#ffffff", 3);
		this.sunlight.castShadow = true;
		this.sunlight.shadow.mapSize.set(1024, 1024);
		this.sunlight.shadow.camera.far = 15;
		this.sunlight.shadow.normalBias = 0.05;
		this.sunlight.position.set(0.25, 3, -2.25);

		this.scene.add(this.sunlight);
	}
}
