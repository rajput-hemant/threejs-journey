import * as THREE from "three";

import Camera from "./Camera";
import Core from "../Core";
import Sizes from "../utils/Sizes";

export default class Renderer {
	core: Core;
	canvas: Element;
	sizes: Sizes;
	scene: THREE.Scene;
	camera: Camera;
	instance?: THREE.WebGLRenderer;

	constructor() {
		this.core = new Core();
		this.canvas = this.core.canvas!;
		this.sizes = this.core.sizes!;
		this.scene = this.core.scene!;
		this.camera = this.core.camera!;

		this.setRenderer();
	}

	setRenderer() {
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		
		this.instance.shadowMap.enabled = true;
		this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	resize() {
		this.instance!.setSize(this.sizes.width, this.sizes.height);
		this.instance!.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	update() {
		this.instance!.render(this.scene, this.camera.instance!);
	}
}
