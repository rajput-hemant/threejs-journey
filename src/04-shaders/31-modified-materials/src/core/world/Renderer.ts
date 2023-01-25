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
	renderer?: THREE.WebGLRenderer;

	constructor() {
		this.core = new Core();
		this.canvas = this.core.canvas!;
		this.sizes = this.core.sizes!;
		this.scene = this.core.scene!;
		this.camera = this.core.camera!;

		this.setRenderer();
	}

	setRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowMap;
		this.renderer.physicallyCorrectLights = true;
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 1;
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	resize() {
		this.renderer!.setSize(this.sizes.width, this.sizes.height);
		this.renderer!.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	update() {
		this.renderer!.render(this.scene, this.camera.instance!);
	}
}
