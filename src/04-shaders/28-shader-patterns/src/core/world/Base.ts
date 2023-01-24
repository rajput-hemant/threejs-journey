import * as THREE from "three";

import Core from "../core";
import Resources from "../utils/Resources";
import Debug from "../utils/Debug";
import Time from "../utils/Time";
import vertexShader from "../../shaders/test/vertex.glsl";
import fragmentShader from "../../shaders/test/fragment.glsl";
import fragmentShader2 from "../../shaders/test/fragment2.glsl";
import fragmentShader3 from "../../shaders/test/fragment3.glsl";
import fragmentShader4 from "../../shaders/test/fragment4.glsl";
import fragmentShader5 from "../../shaders/test/fragment5.glsl";
import fragmentShader6 from "../../shaders/test/fragment6.glsl";
import fragmentShader7 from "../../shaders/test/fragment7.glsl";
import fragmentShader8 from "../../shaders/test/fragment8.glsl";
import fragmentShader9 from "../../shaders/test/fragment9.glsl";
import fragmentShader10 from "../../shaders/test/fragment10.glsl";
import fragmentShader11 from "../../shaders/test/fragment11.glsl";
import fragmentShader12 from "../../shaders/test/fragment12.glsl";
import fragmentShader13 from "../../shaders/test/fragment13.glsl";
import fragmentShader14 from "../../shaders/test/fragment14.glsl";
import fragmentShader15 from "../../shaders/test/fragment15.glsl";
import fragmentShader16 from "../../shaders/test/fragment16.glsl";
import fragmentShader17 from "../../shaders/test/fragment17.glsl";
import fragmentShader18 from "../../shaders/test/fragment18.glsl";
import fragmentShader19 from "../../shaders/test/fragment19.glsl";
import fragmentShader20 from "../../shaders/test/fragment20.glsl";
import fragmentShader21 from "../../shaders/test/fragment21.glsl";
import fragmentShader22 from "../../shaders/test/fragment22.glsl";
import fragmentShader23 from "../../shaders/test/fragment23.glsl";
import fragmentShader24 from "../../shaders/test/fragment24.glsl";
import fragmentShader25 from "../../shaders/test/fragment25.glsl";
import fragmentShader26 from "../../shaders/test/fragment26.glsl";
import fragmentShader27 from "../../shaders/test/fragment27.glsl";
import fragmentShader28 from "../../shaders/test/fragment28.glsl";
import fragmentShader29 from "../../shaders/test/fragment28.glsl";
import fragmentShader30 from "../../shaders/test/fragment30.glsl";
import fragmentShader31 from "../../shaders/test/fragment31.glsl";
import fragmentShader32 from "../../shaders/test/fragment32.glsl";
import fragmentShader33 from "../../shaders/test/fragment33.glsl";
import fragmentShader34 from "../../shaders/test/fragment34.glsl";
import fragmentShader35 from "../../shaders/test/fragment35.glsl";
import fragmentShader36 from "../../shaders/test/fragment36.glsl";
import fragmentShader37 from "../../shaders/test/fragment37.glsl";
import fragmentShader38 from "../../shaders/test/fragment38.glsl";
import fragmentShader39 from "../../shaders/test/fragment39.glsl";
import fragmentShader40 from "../../shaders/test/fragment40.glsl";

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

		this.setGeometry();
		this.setTexture();
		this.setMaterial();
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(0.8, 0.8, 32, 32);
	}

	setTexture() {}

	setMaterial() {
		/**
		 * ShaderMaterial is a material that allows you to use your own shaders
		 * with little bit of built-in THREE.js specific code.
		 */
		// Pattern 1
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -2;
		this.scene.add(this.mesh);

		// Pattern 2
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader2,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -1;
		this.scene.add(this.mesh);

		// Pattern 3
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader3,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 0;
		this.scene.add(this.mesh);

		// Pattern 4
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader4,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 1;
		this.scene.add(this.mesh);

		// Pattern 5
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader5,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 2;
		this.scene.add(this.mesh);

		// Pattern 6
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader6,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -2;
		this.mesh.position.z = 1;
		this.scene.add(this.mesh);

		// Pattern 7
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader7,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -1;
		this.mesh.position.z = 1;
		this.scene.add(this.mesh);

		// Pattern 8
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader8,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 0;
		this.mesh.position.z = 1;
		this.scene.add(this.mesh);

		// Pattern 9
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader9,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 1;
		this.mesh.position.z = 1;
		this.scene.add(this.mesh);

		// Pattern 10
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader10,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 2;
		this.mesh.position.z = 1;
		this.scene.add(this.mesh);

		// Pattern 11
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader11,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -2;
		this.mesh.position.z = 2;
		this.scene.add(this.mesh);

		// Pattern 12
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader12,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -1;
		this.mesh.position.z = 2;
		this.scene.add(this.mesh);

		// Pattern 13
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader13,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 0;
		this.mesh.position.z = 2;
		this.scene.add(this.mesh);

		// Pattern 14
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader14,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 1;
		this.mesh.position.z = 2;
		this.scene.add(this.mesh);

		// Pattern 15
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader15,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 2;
		this.mesh.position.z = 2;
		this.scene.add(this.mesh);

		// Pattern 16
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader16,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -2;
		this.mesh.position.z = 3;
		this.scene.add(this.mesh);

		// Pattern 17
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader17,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -1;
		this.mesh.position.z = 3;
		this.scene.add(this.mesh);

		// Pattern 18
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader18,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 0;
		this.mesh.position.z = 3;
		this.scene.add(this.mesh);

		// Pattern 19
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader19,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 1;
		this.mesh.position.z = 3;
		this.scene.add(this.mesh);

		// Pattern 20
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader20,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 2;
		this.mesh.position.z = 3;
		this.scene.add(this.mesh);

		// Pattern 21
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader21,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -2;
		this.mesh.position.z = 4;
		this.scene.add(this.mesh);

		// Pattern 22
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader22,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -1;
		this.mesh.position.z = 4;
		this.scene.add(this.mesh);

		// Pattern 23
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader23,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 0;
		this.mesh.position.z = 4;
		this.scene.add(this.mesh);

		// Pattern 24
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader24,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 1;
		this.mesh.position.z = 4;
		this.scene.add(this.mesh);

		// Pattern 25
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader25,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 2;
		this.mesh.position.z = 4;
		this.scene.add(this.mesh);

		// Pattern 26
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader26,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -2;
		this.mesh.position.z = 5;
		this.scene.add(this.mesh);

		// Pattern 27
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader27,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -1;
		this.mesh.position.z = 5;
		this.scene.add(this.mesh);

		// Pattern 28
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader28,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 0;
		this.mesh.position.z = 5;
		this.scene.add(this.mesh);

		// Pattern 29
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader29,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 1;
		this.mesh.position.z = 5;
		this.scene.add(this.mesh);

		// Pattern 30
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader30,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 2;
		this.mesh.position.z = 5;
		this.scene.add(this.mesh);

		// Pattern 31
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader31,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -2;
		this.mesh.position.z = 6;
		this.scene.add(this.mesh);

		// Pattern 32
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader32,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -1;
		this.mesh.position.z = 6;
		this.scene.add(this.mesh);

		// Pattern 33
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader33,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 0;
		this.mesh.position.z = 6;
		this.scene.add(this.mesh);

		// Pattern 34
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader34,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 1;
		this.mesh.position.z = 6;
		this.scene.add(this.mesh);

		// Pattern 35
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader35,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 2;
		this.mesh.position.z = 6;
		this.scene.add(this.mesh);

		// Pattern 36
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader36,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -2;
		this.mesh.position.z = 7;
		this.scene.add(this.mesh);

		// Pattern 37
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader37,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = -1;
		this.mesh.position.z = 7;
		this.scene.add(this.mesh);

		// Pattern 38
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader38,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 0;
		this.mesh.position.z = 7;
		this.scene.add(this.mesh);

		// Pattern 39
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader39,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 1;
		this.mesh.position.z = 7;
		this.scene.add(this.mesh);

		// Pattern 40
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader40,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.x = 2;
		this.mesh.position.z = 7;
		this.scene.add(this.mesh);
	}

	update() {}
}
