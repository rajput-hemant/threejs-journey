import * as THREE from "three";

import sources from "./sources";

import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./world/World";
import Resources from "./utils/Resources";
import Debug from "./utils/Debug";

declare global {
	interface Window {
		experience: any;
	}
}

let instance: Experience;

export default class Experience {
	debug?: Debug;
	canvas?: HTMLElement;
	sizes?: Sizes;
	time?: Time;
	scene?: THREE.Scene;
	resources?: Resources;
	camera?: Camera;
	renderer?: Renderer;
	world?: World;

	constructor(canvas: HTMLElement | null = null) {
		/**
		 * Singleton
		 * If there is already an instance of Experience, return it
		 */
		if (instance) {
			return instance;
		}
		instance = this;

		/**
		 * Global reference to the experience
		 */
		window.experience = this;

		/**
		 * Canvas
		 */
		this.canvas = canvas!;

		/**
		 * Setup
		 */
		this.debug = new Debug();
		this.sizes = new Sizes();
		this.time = new Time();
		this.scene = new THREE.Scene();
		this.resources = new Resources(sources);
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.world = new World();

		/**
		 * Custom resize event
		 */
		this.sizes.on("resize", () => this.resize());

		/**
		 * Custom tick event
		 */
		this.time.on("tick", () => this.update());
	}

	/**
	 * resize event callback function that resizes the camera and renderer when the window is resized
	 */
	resize() {
		this.camera!.resize();
		this.renderer!.resize();
	}

	update() {
		this.camera!.update();
		this.world!.update();
		this.renderer!.update();
	}

	destory() {
		this.sizes!.off("resize");
		this.time!.off("tick");

		// Traverse the whole scene and dispose of all the objects
		this.scene!.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.geometry.dispose();

				// Loop through all the material properties and dispose of them
				for (const key in child.material) {
					const value = child.material[key];
					if (value && typeof value === "object" && "dispose" in value) {
						value.dispose();
					}
				}
			}
		});

		// Dispose of the scene
		this.camera!.orbitControls?.dispose();
		this.renderer!.renderer?.dispose();

		// Destroy the debug
		this.debug?.ui!.destroy();
	}
}
