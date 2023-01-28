import * as THREE from "three";

import Core from "../Core";
import Base from "../meshes/Base";
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
			this.environment = new Environment();
			this.base = new Base();
		});
	}

	update() {
		this.base?.update();
	}
}
