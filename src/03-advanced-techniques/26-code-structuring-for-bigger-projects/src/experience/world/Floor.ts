import * as THREE from "three";

import Experience from "../Experience";
import Resources from "../utils/Resources";

export default class Floor {
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
		this.geometry = new THREE.CircleGeometry(5, 64);
	}

	setTexture() {
		this.texture!.color = this.resources.items.grassColorTexture;
		this.texture!.color.encoding = THREE.sRGBEncoding;
		this.texture!.color.repeat.set(1.5, 1.5);
		this.texture!.color.wrapS = THREE.RepeatWrapping;
		this.texture!.color.wrapT = THREE.RepeatWrapping;

		this.texture!.normal = this.resources.items.grassNormalTexture;
		this.texture!.normal.repeat.set(1.5, 1.5);
		this.texture!.normal.wrapS = THREE.RepeatWrapping;
		this.texture!.normal.wrapT = THREE.RepeatWrapping;
	}

	setMaterial() {
		this.material = new THREE.MeshStandardMaterial({
			map: this.texture!.color,
			normalMap: this.texture!.normal,
		});
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.rotation.x = -Math.PI * 0.5;
		// this.mesh.position.y = -0.5;
		this.mesh.receiveShadow = true;

		this.scene.add(this.mesh);
	}
}
