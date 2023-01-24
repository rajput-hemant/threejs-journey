import * as THREE from "three";

import Core from "../core";
import Time from "../utils/Time";
import Debug from "../utils/Debug";
import Resources from "../utils/Resources";
import waterVertexShader from "../../shaders/water/vertex.glsl";
import waterFragmentShader from "../../shaders/water/fragment.glsl";

export default class Base {
	core: Core;
	scene: THREE.Scene;
	resources: Resources;
	geometry?: THREE.BufferGeometry;
	texture?: any = {};
	material?: THREE.ShaderMaterial;
	mesh?: THREE.Mesh;
	debug?: Debug;
	time?: Time;
	debugObject: any = {};

	constructor() {
		this.core = new Core();
		this.scene = this.core.scene!;
		this.resources = this.core.resources!;
		this.debug = this.core.debug;
		this.time = this.core.time;

		this.debugObject.elevation = this.core.debug!.ui!.addFolder({
			title: "Elevation",
		});
		this.debugObject.frequency = this.core.debug!.ui!.addFolder({
			title: "Frequency",
		});
		this.debugObject.colors = this.core.debug!.ui!.addFolder({
			title: "Colors",
		});
		this.debugObject.speed = this.core.debug!.ui!.addFolder({
			title: "Speed",
		});

		this.debugObject.colors.depthColor = "#186691";
		this.debugObject.colors.surfaceColor = "#9bd8ff";

		this.setGeometry();
		this.setTexture();
		this.setMaterial();
		this.update();
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(5, 5, 512, 512);
	}

	setTexture() {}

	setMaterial() {
		/**
		 * ShaderMaterial is a material that allows you to use your own shaders
		 * with little bit of built-in THREE.js specific code.
		 */
		this.material = new THREE.ShaderMaterial({
			vertexShader: waterVertexShader,
			fragmentShader: waterFragmentShader,
			side: THREE.DoubleSide,
			uniforms: {
				uTime: { value: 0 },

				uBigWavesElevation: { value: 0.2 },
				uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
				uBigWavesSpeed: { value: 0.75 },

				uSmallWavesElevation: { value: 0.15 },
				uSmallWavesFrequency: { value: 3 },
				uSmallWavesSpeed: { value: 0.2 },
				uSmallWavesIterations: { value: 4 },

				uDepthColor: {
					value: new THREE.Color(this.debugObject.colors.depthColor),
				},
				uSurfaceColor: {
					value: new THREE.Color(this.debugObject.colors.surfaceColor),
				},
				uColorOffset: { value: 0.08 },
				uColorMultiplier: { value: 5 },
			},
		});

		// Debug

		// Big Waves Elevation
		this.debugObject.elevation.addInput(
			this.material.uniforms.uBigWavesElevation,
			"value",
			{
				min: 0,
				max: 1,
				step: 0.001,
				label: "BigWaves",
			}
		);

		// Small Waves Elevation
		this.debugObject.elevation.addInput(
			this.material.uniforms.uSmallWavesElevation,
			"value",
			{
				min: 0,
				max: 1,
				step: 0.001,
				label: "SmallWaves",
			}
		);

		// Frequency Big WavesX
		this.debugObject.frequency.addInput(
			this.material.uniforms.uBigWavesFrequency.value,
			"x",
			{
				min: 0,
				max: 10,
				step: 0.001,
				label: "BigWaveX",
			}
		);

		// Frequency Big WavesY
		this.debugObject.frequency.addInput(
			this.material.uniforms.uBigWavesFrequency.value,
			"y",
			{
				min: 0,
				max: 10,
				step: 0.001,
				label: "BigWaveY",
			}
		);

		// Frequency Small Waves
		this.debugObject.frequency.addInput(
			this.material.uniforms.uSmallWavesFrequency,
			"value",
			{
				min: 0,
				max: 30,
				step: 0.001,
				label: "SmallWave",
			}
		);

		// Iterations Small Waves
		this.debugObject.colors.addInput(
			this.material.uniforms.uSmallWavesIterations,
			"value",
			{
				min: 0,
				max: 5,
				step: 1,
				label: "Iterations",
			}
		);

		// Speed Big Waves
		this.debugObject.speed.addInput(
			this.material.uniforms.uBigWavesSpeed,
			"value",
			{
				min: 0,
				max: 4,
				step: 0.001,
				label: "BigWaves",
			}
		);

		// Speed Small Waves
		this.debugObject.speed.addInput(
			this.material.uniforms.uSmallWavesSpeed,
			"value",
			{
				min: 0,
				max: 4,
				step: 0.001,
				label: "SmallWaves",
			}
		);

		// Depth Color
		this.debugObject.colors
			.addInput(this.debugObject.colors, "depthColor", {
				min: 0,
				max: 10,
				step: 0.001,
				label: "Depth",
			})
			.on("change", () =>
				this.material!.uniforms.uDepthColor.value.set(
					this.debugObject.colors.depthColor
				)
			);

		// Surface Color
		this.debugObject.colors
			.addInput(this.debugObject.colors, "surfaceColor", {
				min: 0,
				max: 10,
				step: 0.001,
				label: "Surface",
			})
			.on("change", () =>
				this.material!.uniforms.uSurfaceColor.value.set(
					this.debugObject.colors.surfaceColor
				)
			);

		// Offset
		this.debugObject.colors.addInput(
			this.material.uniforms.uColorOffset,
			"value",
			{
				min: 0,
				max: 1,
				step: 0.001,
				label: "Offset",
			}
		);

		// Multiplier
		this.debugObject.colors.addInput(
			this.material.uniforms.uColorMultiplier,
			"value",
			{
				min: 0,
				max: 10,
				step: 0.001,
				label: "Multiplier",
			}
		);

		// Mesh
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.rotation.x = -Math.PI * 0.5;
		this.mesh.position.z = -0.5;

		// Add mesh to scene
		this.scene.add(this.mesh);
	}

	update() {
		this.material!.uniforms.uTime.value = this.time!.elapsed;
	}
}
