import * as THREE from "three";

import Experience from "../Experience";
import Resources from "../utils/Resources";
import Environment from "./Environment";
import Base from "./Base";

export default class World {
	experience: Experience;
	scene: THREE.Scene;
	resources: Resources;
	environment?: Environment;
	base?: Base;

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene!;
		this.resources = this.experience.resources!;

		// Setup
		this.base = new Base();
		this.environment = new Environment();
	}

	update() {}
}
