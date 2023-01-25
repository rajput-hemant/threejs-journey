import * as THREE from "three";

import Core from "../core";
import Time from "../utils/Time";
import Debug from "../utils/Debug";
import Resources from "../utils/Resources";

export default class Base {
	core: Core;
	scene: THREE.Scene;
	resources: Resources;
	geometry?: THREE.BufferGeometry;
	texture?: any = {};
	material?: THREE.PointsMaterial;
	points?: THREE.Points;
	mesh?: THREE.Mesh;
	debug?: Debug;
	time?: Time;
	debugObject: any = {};
	params: any = {};

	constructor() {
		this.core = new Core();
		this.scene = this.core.scene!;
		this.resources = this.core.resources!;
		this.debug = this.core.debug;
		this.time = this.core.time;

		// Parameters
		this.params.count = 200000;
		this.params.size = 0.005;
		this.params.radius = 5;
		this.params.branches = 3;
		this.params.spin = 1;
		this.params.randomness = 0.5;
		this.params.randomnessPower = 3;
		this.params.insideColor = "#ff6030";
		this.params.outsideColor = "#1b3984";

		this.generateGalaxy();
		this.setDebug();
		this.update();
	}

	generateGalaxy() {
		if (this.points) {
			this.geometry!.dispose();
			this.material!.dispose();
			this.scene.remove(this.points!);
		}
		this.setGeometry();
		this.setMaterial();
		this.setPoints();
	}

	setGeometry() {
		/**
		 * Geometry
		 */
		this.geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(this.params.count * 3);
		const colors = new Float32Array(this.params.count * 3);

		const insideColor = new THREE.Color(this.params.insideColor);
		const outsideColor = new THREE.Color(this.params.outsideColor);

		for (let i = 0; i < this.params.count; i++) {
			const i3 = i * 3;

			// Position
			const radius = Math.random() * this.params.radius;

			const branchAngle =
				((i % this.params.branches) / this.params.branches) * Math.PI * 2;

			const randomX =
				Math.pow(Math.random(), this.params.randomnessPower) *
				(Math.random() < 0.5 ? 1 : -1) *
				this.params.randomness *
				radius;

			const randomY =
				Math.pow(Math.random(), this.params.randomnessPower) *
				(Math.random() < 0.5 ? 1 : -1) *
				this.params.randomness *
				radius;

			const randomZ =
				Math.pow(Math.random(), this.params.randomnessPower) *
				(Math.random() < 0.5 ? 1 : -1) *
				this.params.randomness *
				radius;

			positions[i3] = Math.cos(branchAngle) * radius + randomX;
			positions[i3 + 1] = randomY;
			positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ;

			// Color
			const mixedColor = insideColor.clone();
			mixedColor.lerp(outsideColor, radius / this.params.radius);

			colors[i3] = mixedColor.r;
			colors[i3 + 1] = mixedColor.g;
			colors[i3 + 2] = mixedColor.b;
		}

		this.geometry.setAttribute(
			"position",
			new THREE.BufferAttribute(positions, 3)
		);
		this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
	}

	setMaterial() {
		this.material = new THREE.PointsMaterial({
			size: this.params.size,
			sizeAttenuation: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			vertexColors: true,
		});
	}

	setPoints() {
		this.points = new THREE.Points(this.geometry, this.material);
		this.scene.add(this.points);
	}

	setDebug() {
		this.debugObject.stars = this.debug!.ui!.addFolder({
			title: "Stars",
		});
		this.debugObject.galaxy = this.debug!.ui!.addFolder({
			title: "Galaxy",
		});
		this.debugObject.random = this.debug!.ui!.addFolder({
			title: "Randomness",
		});
		this.debugObject.color = this.debug!.ui!.addFolder({
			title: "Colors",
		});

		this.debugObject.stars
			.addInput(this.params, "count", {
				label: "Count",
				min: 100,
				max: 1000000,
				step: 100,
			})
			.on("change", (e: THREE.Event) => {
				if (e.last) this.generateGalaxy();
			});

		this.debugObject.galaxy
			.addInput(this.params, "radius", {
				label: "Radius",
				min: 0.01,
				max: 20,
				step: 0.01,
			})
			.on("change", (e: THREE.Event) => {
				if (e.last) this.generateGalaxy();
			});

		this.debugObject.galaxy
			.addInput(this.params, "branches", {
				label: "Branches",
				min: 2,
				max: 20,
				step: 1,
			})
			.on("change", (e: THREE.Event) => {
				if (e.last) this.generateGalaxy();
			});

		this.debugObject.random
			.addInput(this.params, "randomness", {
				label: "Intensity",
				min: 0,
				max: 2,
				step: 0.001,
			})
			.on("change", (e: THREE.Event) => {
				if (e.last) this.generateGalaxy();
			});

		this.debugObject.random
			.addInput(this.params, "randomnessPower", {
				label: "Power",
				min: 1,
				max: 10,
				step: 0.001,
			})
			.on("change", (e: THREE.Event) => {
				if (e.last) this.generateGalaxy();
			});

		this.debugObject.color
			.addInput(this.params, "insideColor", {
				label: "Inside",
			})
			.on("change", (e: THREE.Event) => {
				if (e.last) this.generateGalaxy();
			});

		this.debugObject.color
			.addInput(this.params, "outsideColor", {
				label: "Outside",
			})
			.on("change", (e: THREE.Event) => {
				if (e.last) this.generateGalaxy();
			});
	}

	setTexture() {}

	update() {}
}
