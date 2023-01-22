import * as THREE from "three";

import Core from "../core";
import Resources from "../utils/Resources";
import vertexShader from "../../shaders/test2/vertex.glsl";
import fragmentShader from "../../shaders/test2/fragment.glsl";
import Debug from "../utils/Debug";
import Time from "../utils/Time";

export default class Base {
	core: Core;
	scene: THREE.Scene;
	resources: Resources;
	geometry?: THREE.BufferGeometry;
	texture?: any = {};
	material?: THREE.RawShaderMaterial;
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

		if (this.debug?.active) {
			this.debugObject!.material = this.core.debug!.ui!.addFolder("Material");
		}

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

	setTexture() {
		this.texture.flagTexture = this.resources.items.flagTexture;
	}

	setMaterial() {
		this.material = new THREE.RawShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			side: THREE.DoubleSide,
			uniforms: {
				uFrequency: { value: new THREE.Vector2(10, 5) },
				uTime: { value: 0 },
				uColor: { value: new THREE.Color("orange") },
				uTexture: { value: this.texture.flagTexture },
			},
		});

		if (this.debug?.active) {
			this.debugObject!.material!.add(
				this.material!.uniforms.uFrequency.value,
				"x"
			)
				.min(0)
				.max(20)
				.step(0.01)
				.name("frequencyX");

			this.debugObject!.material!.add(
				this.material!.uniforms.uFrequency.value,
				"y"
			)
				.min(0)
				.max(20)
				.step(0.01)
				.name("frequencyY");
		}
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.scale.y = 2 / 3;

		this.scene.add(this.mesh);
	}

	update() {
		this.material!.uniforms.uTime.value = this.time!.elapsed;
	}
}
