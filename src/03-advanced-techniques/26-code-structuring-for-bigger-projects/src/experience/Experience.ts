import * as THREE from "three";

import sources from "./sources";

import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./world/World";
import Resourses from "./utils/Resources";

declare global {
	interface Window {
		experience: any;
	}
}

let instance: Experience | null;

export default class Experience {
	canvas?: HTMLElement;
	sizes?: Sizes;
	time?: Time;
	scene?: THREE.Scene;
	resources?: Resourses;
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
		this.sizes = new Sizes();
		this.time = new Time();
		this.scene = new THREE.Scene();
		this.resources = new Resourses(sources);
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

	resize() {
		this.camera!.resize();
		this.renderer!.resize();
	}

	update() {
		this.camera!.update();
		this.renderer!.update();
	}
}
