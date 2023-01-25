import * as THREE from "three";

import Core from "./Core";
import Time from "./utils/Time";
import Debug from "./utils/Debug";
import Resources from "./utils/Resources";

export default class Base {
	core: Core;
	scene: THREE.Scene;
	geometry?: THREE.BufferGeometry;
	texture?: any = {};
	material?: THREE.MeshStandardMaterial;
	depthMaterial?: THREE.MeshDepthMaterial;
	model?: THREE.Mesh;
	time?: Time;
	resources: Resources;
	resource: any;
	debug?: Debug;
	debugObject: any = {};

	constructor() {
		this.core = new Core();
		this.scene = this.core.scene!;
		this.resources = this.core.resources!;
		this.debug = this.core.debug;
		this.time = this.core.time;

		// Setup
		this.resource = this.resources.items.leePerrySmith;

		this.setTexture();
		this.setMaterial();
		this.setModel();
		this.setDebug();
	}

	setGeometry() {}

	setTexture() {
		this.texture.mapTexture = this.resources.items.mapTexture;
		this.texture.mapTexture.encoding = THREE.sRGBEncoding;
		this.texture.normalTexture = this.resources.items.normalTexture;
	}

	private customUniforms = {
		uTime: { value: 0 },
	};

	setMaterial() {
		this.material = new THREE.MeshStandardMaterial({
			map: this.texture.mapTexture,
			normalMap: this.texture.normalTexture,
		});

		this.depthMaterial = new THREE.MeshDepthMaterial({
			depthPacking: THREE.RGBADepthPacking,
		});

		// Material before compile
		this.material.onBeforeCompile = (shader) => {
			shader.uniforms.uTime = this.customUniforms.uTime;

			shader.vertexShader = shader.vertexShader
				.replace(
					"#include <common>",
					`
					#include <common>

					uniform float uTime;

					mat2 get2dRotateMatrix(float _angle) {
						return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
					}
				`
				)
				.replace(
					"#include <beginnormal_vertex>",
					`
					#include <beginnormal_vertex>

					float angle = (position.y + uTime) * 0.5;
					mat2 rotateMatrix = get2dRotateMatrix(angle);

					objectNormal.xz = rotateMatrix * objectNormal.xz;
					`
				)
				.replace(
					"#include <begin_vertex>",
					`
					#include <begin_vertex>

					transformed.xz = rotateMatrix * transformed.xz;
					`
				);
		};

		// Depth material (drop shadows) before compile
		this.depthMaterial.onBeforeCompile = (shader) => {
			shader.uniforms.uTime = this.customUniforms.uTime;

			shader.vertexShader = shader.vertexShader
				.replace(
					"#include <common>",
					`
					#include <common>

					uniform float uTime;

					mat2 get2dRotateMatrix(float _angle) {
						return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
					}
					`
				)
				.replace(
					"#include <begin_vertex>",
					`
					#include <begin_vertex>

					float angle = (position.y + uTime) * 0.5;
					mat2 rotateMatrix = get2dRotateMatrix(angle);

					transformed.xz = rotateMatrix * transformed.xz;
					`
				);
		};
	}

	setModel() {
		this.model = this.resource.scene.children[0];
		this.model!.scale.set(0.6, 0.6, 0.6);
		this.model!.rotation.y = Math.PI * 0.5;
		this.model!.material = this.material!;
		this.model!.customDepthMaterial = this.depthMaterial!;

		this.scene.add(this.model!);

		this.updateMaterials();
	}

	updateMaterials = () => {
		this.scene.traverse((child) => {
			if (
				child instanceof THREE.Mesh &&
				child.material instanceof THREE.MeshStandardMaterial
			) {
				child.material.envMapIntensity = 1;
				child.material.needsUpdate = true;
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	};

	setDebug() {
		this.debug!.ui!.expanded = false;
	}

	update() {
		this.customUniforms.uTime.value = this.time!.elapsed;
	}
}
