import * as THREE from "three";

import Base from "./Base";
import Core from "../Core";
import Environment from "./Environment";
import Resources from "../utils/Resources";

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
		/**
		 * When all the Resources are loaded, we can start the experience
		 */
		this.resources.on("ready", () => {
			this.base = new Base();
			this.environment = new Environment();
		});
	}

	update() {
		this.base?.update();
	}
}
