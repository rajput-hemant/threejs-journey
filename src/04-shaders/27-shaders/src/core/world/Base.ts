import * as THREE from "three";

import Core from "../core";
import Resources from "../utils/Resources";
import vertexShader from "../../shaders/test/vertex.glsl";
import fragmentShader from "../../shaders/test/fragment.glsl";

export default class Base {
	core: Core;
	scene: THREE.Scene;
	resources: Resources;
	geometry?: THREE.BufferGeometry;
	texture?: any = {};
	material?: THREE.Material;
	mesh?: THREE.Mesh;

	constructor() {
		this.core = new Core();
		this.scene = this.core.scene!;
		this.resources = this.core.resources!;

		this.setGeometry();
		this.setTexture();
		this.setMaterial();
		this.setMesh();
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

		const count = this.geometry.attributes.position.count;
		const randoms = new Float32Array(count);

		for (let i = 0; i < count; i++) {
			randoms[i] = Math.random();
		}

		/**
		 * setting a custom attribute (aRandom) to the geometry,
		 * which will be used in the vertex shader
		 */
		this.geometry.setAttribute(
			"aRandom",
			new THREE.BufferAttribute(randoms, 1)
		);
	}

	setTexture() {}

	setMaterial() {
		this.material = new THREE.RawShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			side: THREE.DoubleSide,
		});
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material);

		this.scene.add(this.mesh);
	}
}
