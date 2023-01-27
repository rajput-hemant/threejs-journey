import * as THREE from "three";
import { Pane } from "tweakpane";

import Core from "../Core";
import Debug from "../utils/Debug";
import Resources from "../utils/Resources";

export default class Environment {
	core: Core;
	scene: THREE.Scene;
	resources: Resources;
	sunlight?: THREE.DirectionalLight;
	enviromentMap?: any = {};
	debug?: Debug;
	debugFolder?: Pane;

	constructor() {
		this.core = new Core();
		this.scene = this.core.scene!;
		this.resources = this.core.resources!;
		this.debug = this.core.debug;

		// Setup
		this.setEnvironmentMap();
		this.setSunlight();
	}

	setEnvironmentMap() {}

	setSunlight() {
		this.sunlight = new THREE.DirectionalLight("#ffffff", 1);
		this.sunlight.castShadow = true;
		this.sunlight.shadow.mapSize.set(1024, 1024);
		this.sunlight.shadow.camera.far = 15;
		this.sunlight.shadow.normalBias = 0.05;
		this.sunlight.position.set(0.25, 3, 2.25);

		this.scene.add(this.sunlight);
	}
}
