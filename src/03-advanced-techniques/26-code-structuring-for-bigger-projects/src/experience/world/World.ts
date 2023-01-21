import * as THREE from "three";

import Experience from "../Experience";
import Resources from "../utils/Resources";
import Environment from "./Environment";
import Floor from "./Floor";
import Fox from "./Fox";

export default class World {
	experience: Experience;
	scene: THREE.Scene;
	resources: Resources;
	environment?: Environment;
	floor?: Floor;
	fox?: Fox;

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene!;
		this.resources = this.experience.resources!;

		/**
		 * When all the Resources are loaded, we can start the experience
		 */
		this.resources.on("ready", () => {
			// Setup
			this.floor = new Floor();
			this.fox = new Fox();
			this.environment = new Environment();
		});
	}

	update() {
		this.fox?.update();
	}
}
