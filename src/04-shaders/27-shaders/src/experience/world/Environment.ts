import * as THREE from "three";

import Experience from "../Experience";
import Debug from "../utils/Debug";
import Resources from "../utils/Resources";

export default class Environment {
	experience: Experience;
	scene: THREE.Scene;
	resources: Resources;
	sunlight?: THREE.DirectionalLight;
	enviromentMap?: any = {};
	debug?: Debug;
	debugFolder?: dat.GUI;

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene!;
		this.resources = this.experience.resources!;
		this.debug = this.experience.debug;

		if (this.debug?.active) {
			this.debugFolder = this.debug.ui!.addFolder("environment");
		}

		// this.setSunlight();
		// this.setEnvironmentMap();
	}

	setSunlight() {
		this.sunlight = new THREE.DirectionalLight("#ffffff", 4);
		this.sunlight.castShadow = true;
		this.sunlight.shadow.camera.far = 15;
		this.sunlight.shadow.mapSize.set(1024, 1024);
		this.sunlight.shadow.normalBias = 0.05;
		this.sunlight.position.set(3.5, 2, -1.25);

		this.scene.add(this.sunlight);

		// Debug
		if (this.debug?.active) {
			this.debugFolder!.add(this.sunlight, "intensity")
				.name("sunlightIntensity")
				.min(0)
				.max(10)
				.step(0.001);

			this.debugFolder!.add(this.sunlight.position, "x")
				.name("sunlightX")
				.min(-10)
				.max(10)
				.step(0.001);

			this.debugFolder!.add(this.sunlight.position, "y")
				.name("sunlightY")
				.min(-10)
				.max(10)
				.step(0.001);

			this.debugFolder!.add(this.sunlight.position, "z")
				.name("sunlightZ")
				.min(-10)
				.max(10)
				.step(0.001);
		}
	}

	setEnvironmentMap() {
		this.enviromentMap!.intensity = 0.5;
		this.enviromentMap!.texture = this.resources.items.environmentMapTexture;
		this.enviromentMap!.texture.encoding = THREE.sRGBEncoding;

		this.scene.environment = this.enviromentMap!.texture;

		const updateMaterials = () => {};

		updateMaterials();

		// Debug
		if (this.debug?.active) {
			this.debugFolder!.add(this.enviromentMap!, "intensity")
				.name("enviromentMapIntensity")
				.min(0)
				.max(1)
				.step(0.001)
				.onChange(updateMaterials);
		}
	}
}
