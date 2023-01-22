import * as THREE from "three";

import Experience from "../Experience";
import Resources from "../utils/Resources";

export default class Base {
	experience: Experience;
	scene: THREE.Scene;
	resources: Resources;
	geometry?: THREE.BufferGeometry;
	texture?: any = {};
	material?: THREE.Material;
	mesh?: THREE.Mesh;

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene!;
		this.resources = this.experience.resources!;

		this.setGeometry(); 
		this.setTexture();
		this.setMaterial();
		this.setMesh();
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
	}

	setTexture() {}

	setMaterial() {
		this.material = new THREE.MeshBasicMaterial();
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material);

		this.scene.add(this.mesh);
	}
}
