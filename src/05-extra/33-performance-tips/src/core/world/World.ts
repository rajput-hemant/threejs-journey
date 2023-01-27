import * as THREE from "three";

import Core from "../Core";
import Resources from "../utils/Resources";
import Environment from "./Environment";
import Floor from "../meshes/Floor";
import Cube from "../meshes/Cube";
import Sphere from "../meshes/Sphere";
import TorusKnot from "../meshes/TorusKnot";

export default class World {
	core: Core;
	scene: THREE.Scene;
	resources: Resources;
	environment?: Environment;
	cube?: Cube;
	sphere?: Sphere;
	torusKnot?: TorusKnot;
	floor?: Floor;

	constructor() {
		this.core = new Core();
		this.scene = this.core.scene!;
		this.resources = this.core.resources!;

		// Setup
		/**
		 * When all the Resources are loaded, we can start the experience
		 */
		// this.resources.on("ready", () => {
		this.cube = new Cube();
		this.sphere = new Sphere();
		this.torusKnot = new TorusKnot();
		this.floor = new Floor();
		this.environment = new Environment();
		// });
	}

	update() {
		this.floor?.update();
	}
}
