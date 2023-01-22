import * as THREE from "three";

import Core from "../core";
import Resources from "../utils/Resources";
import Environment from "./Environment";
import Base from "./Base";

export default class World {
	core: Core;
	scene: THREE.Scene;
	resources: Resources;
	environment?: Environment;
	base?: Base;

	constructor() {
		this.core = new Core();
		this.scene = this.core.scene!;
		this.resources = this.core.resources!;

		// Setup
		this.base = new Base();
		this.environment = new Environment();
	}

	update() {}
}
