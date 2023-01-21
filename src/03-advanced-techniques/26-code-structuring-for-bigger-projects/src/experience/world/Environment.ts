import * as THREE from "three";

import Experience from "../Experience";
import Resourses from "../utils/Resources";

export default class Environment {
	experience: Experience;
	scene: THREE.Scene;
	resourses: Resourses;
	sunlight?: THREE.DirectionalLight;
	enviromentMap?: any = {};

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene!;
		this.resourses = this.experience.resources!;

		this.setSunlight();
		this.setEnvironmentMap();
	}

	setSunlight() {
		this.sunlight = new THREE.DirectionalLight("#ffffff", 4);
		this.sunlight.castShadow = true;
		this.sunlight.shadow.camera.far = 15;
		this.sunlight.shadow.mapSize.set(1024, 1024);
		this.sunlight.shadow.normalBias = 0.05;
		this.sunlight.position.set(3.5, 2, -1.25);

		this.scene.add(this.sunlight);
	}

	setEnvironmentMap() {
		this.enviromentMap!.intensity = 0.5;
		this.enviromentMap!.texture = this.resourses.items.environmentMapTexture;
		this.enviromentMap!.texture.encoding = THREE.sRGBEncoding;

		this.scene.environment = this.enviromentMap!.texture;

		const updateMaterials = () => {
			this.scene.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.material.envMap = this.enviromentMap!.texture;
					child.material.needsUpdate = true;
				}
			});
		};

		updateMaterials();
	}
}
