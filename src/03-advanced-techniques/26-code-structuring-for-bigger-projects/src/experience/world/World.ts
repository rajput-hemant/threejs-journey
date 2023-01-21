import * as THREE from "three";

import Experience from "../Experience";
import Environment from "./Environment";

export default class World {
	experience: Experience;
	scene: THREE.Scene;
	environment?: Environment;
	resourses: any;

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene!;
		this.resourses = this.experience.resources!;

		const testMesh = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshStandardMaterial({
				// wireframe: true
			})
		);

		this.scene.add(testMesh);

		/**
		 * When all the resourses are loaded, we can start the experience
		 */
		this.resourses.on("ready", () => {
			// Setup
			this.environment = new Environment();
		});
	}
}
