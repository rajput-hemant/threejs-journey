import * as THREE from "three";

import Core from "../core";
import Resources from "../utils/Resources";
import Debug from "../utils/Debug";
import Time from "../utils/Time";
import vertexShader from "../../shaders/test/vertex.glsl";
import fragmentShader from "../../shaders/test/fragment.glsl";

export default class Base {
	core: Core;
	scene: THREE.Scene;
	resources: Resources;
	geometry?: THREE.BufferGeometry;
	texture?: any = {};
	material?: THREE.ShaderMaterial | THREE.RawShaderMaterial;
	mesh?: THREE.Mesh;
	debug?: Debug;
	debugObject?: any = {};
	time?: Time;

	constructor() {
		this.core = new Core();
		this.scene = this.core.scene!;
		this.resources = this.core.resources!;
		this.debug = this.core.debug;
		this.time = this.core.time;

		this.debugObject!.material = this.core.debug!.ui?.addFolder({
			title: "Material",
		});

		this.setGeometry();
		this.setTexture();
		this.setMaterial();
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
	}

	setTexture() {}

	setMaterial() {
		/**
		 * ShaderMaterial is a material that allows you to use your own shaders
		 * with little bit of built-in THREE.js specific code.
		 */
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			side: THREE.DoubleSide,
		});

		this.mesh = new THREE.Mesh(this.geometry, this.material);

		this.scene.add(this.mesh);
	}

	update() {}
}
