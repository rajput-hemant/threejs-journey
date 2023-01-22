import * as THREE from "three";

import Core from "../core";
import Resources from "../utils/Resources";
import Debug from "../utils/Debug";
import Time from "../utils/Time";
import testVertexShader from "../../shaders/test/vertex.glsl";
import testFragmentShader from "../../shaders/test/fragment.glsl";
import flagVertexShader from "../../shaders/test2/vertex.glsl";
import flagFragmentShader from "../../shaders/test2/fragment.glsl";

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

		if (this.debug?.active) {
			this.debugObject!.material =
				this.core.debug!.ui!.addFolder("Flag Material");
		}

		this.setGeometry();
		this.setTexture();
		this.setMaterial();
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
		/**
		 * RawShaderMaterial is a material that allows you to use your own shaders
		 * without any built-in THREE.js specific code.
		 *
		 * Test Shader
		 */
		this.material = new THREE.RawShaderMaterial({
			vertexShader: testVertexShader,
			fragmentShader: testFragmentShader,
			side: THREE.DoubleSide,
		});

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.z = -0.5;

		this.scene.add(this.mesh);

		/**
		 * ShaderMaterial is a material that allows you to use your own shaders
		 * with little bit of built-in THREE.js specific code.
		 *
		 * Flag Shader
		 */
		this.material = new THREE.ShaderMaterial({
			vertexShader: flagVertexShader,
			fragmentShader: flagFragmentShader,
			side: THREE.DoubleSide,
			uniforms: {
				uFrequency: { value: new THREE.Vector2(10, 5) },
				uTime: { value: 0 },
				uColor: { value: new THREE.Color("orange") },
				uTexture: { value: this.texture.flagTexture },
			},
		});

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.scale.y = 2 / 3;

		this.scene.add(this.mesh);

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

	update() {
		this.material!.uniforms.uTime.value = this.time!.elapsed;
	}
}
