import * as THREE from "three";

import vertexShader from "../../shaders/vertex.glsl";
import fragmentShader from "../../shaders/fragment.glsl";
import Core from "../Core";

export default class Overlay {
	core: Core;
	scene: THREE.Scene;
	geometry?: THREE.PlaneGeometry;
	material?: THREE.ShaderMaterial;
	mesh?: THREE.Mesh;

	constructor() {
		this.core = new Core();
		this.scene = this.core.scene!;

		this.setOverlay();
	}

	setOverlay() {
		this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
		this.material = new THREE.ShaderMaterial({
			transparent: true, // needs to be true if modifying alpha
			uniforms: {
				uAlpha: { value: 1 },
			},
			vertexShader,
			fragmentShader,
		});

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.scene.add(this.mesh);
	}
}
