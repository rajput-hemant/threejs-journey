import * as THREE from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

import "./style.css";
import Core from "./core/Core";

const core = new Core(document.querySelector("canvas.webgl") as HTMLElement);

console.log(core);

/**
 * Tips
 */

// // Tip 4
// console.log(core.renderer!.instance!.info);

// // Tip 6
// core.scene!.remove(core.world!.cube!.cube!);
// core.world!.cube!.cube!.geometry.dispose();
// // @ts-ignore
// core.world!.cube!.cube!.material.dispose();

// // Tip 10
// core.world!.environment!.sunlight!.shadow.camera.top = 3;
// core.world!.environment!.sunlight!.shadow.camera.right = 6;
// core.world!.environment!.sunlight!.shadow.camera.left = -6;
// core.world!.environment!.sunlight!.shadow.camera.bottom = -3;
// core.world!.environment!.sunlight!.shadow.camera.far = 10;
// core.world!.environment!.sunlight!.shadow.mapSize.set(1024, 1024);

// const cameraHelper = new THREE.CameraHelper(
// 	core.world!.environment!.sunlight!.shadow.camera
// );
// core.scene!.add(cameraHelper);

// // Tip 11
// core.world!.cube!.cube!.castShadow = true;
// core.world!.cube!.cube!.receiveShadow = false;

// core.world!.torusKnot!.torusKnot!.castShadow = true;
// core.world!.torusKnot!.torusKnot!.receiveShadow = false;

// core.world!.sphere!.sphere!.castShadow = true;
// core.world!.sphere!.sphere!.receiveShadow = false;

// core.world!.floor!.floor!.castShadow = false;
// core.world!.floor!.floor!.receiveShadow = true;

// // Tip 12
// core.renderer!.instance!.shadowMap.autoUpdate = false;
// core.renderer!.instance!.shadowMap.needsUpdate = true;

// // Tip 18
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

// for (let i = 0; i < 50; i++) {
// 	const material = new THREE.MeshNormalMaterial();

// 	const mesh = new THREE.Mesh(geometry, material);
// 	mesh.position.x = (Math.random() - 0.5) * 10;
// 	mesh.position.y = (Math.random() - 0.5) * 10;
// 	mesh.position.z = (Math.random() - 0.5) * 10;
// 	mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2;
// 	mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2;

// 	core.scene!.add(mesh);
// }

// Tip 19
const geometries = [];

for (let i = 0; i < 50; i++) {
	const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

	geometry.rotateX((Math.random() - 0.5) * Math.PI * 2);
	geometry.rotateY((Math.random() - 0.5) * Math.PI * 2);

	geometry.translate(
		(Math.random() - 0.5) * 10,
		(Math.random() - 0.5) * 10,
		(Math.random() - 0.5) * 10
	);

	geometries.push(geometry);
}

const mergedGeometry = mergeBufferGeometries(geometries);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(mergedGeometry, material);
core.scene!.add(mesh);

// // Tip 20
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
// const material = new THREE.MeshNormalMaterial()

// for(let i = 0; i < 50; i++)
// {
//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     core.scene!.add(mesh)
// }

// // Tip 22
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// const material = new THREE.MeshNormalMaterial();

// const mesh = new THREE.InstancedMesh(geometry, material, 50);
// /* If you intend to change these matrices in tick() fn */
// mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
// core.scene!.add(mesh);

// for (let i = 0; i < 50; i++) {
// 	const position = new THREE.Vector3(
// 		(Math.random() - 0.5) * 10,
// 		(Math.random() - 0.5) * 10,
// 		(Math.random() - 0.5) * 10
// 	);

// 	const quaternion = new THREE.Quaternion();
// 	quaternion.setFromEuler(
// 		new THREE.Euler(
// 			(Math.random() - 0.5) * Math.PI * 2,
// 			(Math.random() - 0.5) * Math.PI * 2,
// 			0
// 		)
// 	);

// 	const matrix = new THREE.Matrix4();
// 	matrix.makeRotationFromQuaternion(quaternion);
// 	matrix.setPosition(position);
// 	mesh.setMatrixAt(i, matrix);
// }

// // Tip 29
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// // Tip 31, 32, 34 and 35
const shaderGeometry = new THREE.PlaneGeometry(10, 10, 256, 256);

core.resources!.on("ready", () => {
	const shaderMaterial = new THREE.ShaderMaterial({
		precision: "lowp",
		uniforms: {
			uDisplacementTexture: {
				value: core.resources!.items.displacementTexture,
			},
			// avoid unnecessary uniforms
			// uDisplacementStrength: { value: 1.5 },
		},
		defines: {
			uDisplacementStrength: 1.5,
		},
		vertexShader: `
        // #define uDisplacementStrength 1.5

        uniform sampler2D uDisplacementTexture;
        // uniform float uDisplacementStrength;

        varying vec3 vColor;

        void main()
        {
            // Position
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);

            float elevation = texture2D(uDisplacementTexture, uv).r;

            // try to avoid if blocks
            // if(elevation < 0.5)
            // {
            //     elevation = 0.5;
            // }

            modelPosition.y += max(elevation, 0.5) * uDisplacementStrength;

            gl_Position = projectionMatrix * viewMatrix * modelPosition;

            // Color
            float colorElevation = max(elevation, 0.25);
            vec3 color = mix(vec3(1.0, 0.1, 0.1), vec3(0.1, 0.0, 0.5), colorElevation);

            // Varying
            vColor = color;
        }
    `,
		fragmentShader: `
        uniform sampler2D uDisplacementTexture;

        // try to do all calculations in vertex shaders
        varying vec3 vColor;

        void main()
        {
            // float elevation = texture2D(uDisplacementTexture, vUv).r;
            // try to avoid if blocks
            // if(elevation < 0.25)
            // {
            //     elevation = 0.25;
            // }
            // elevation = max(elevation, 0.25);

            // vec3 depthColor = vec3(1.0, 0.1, 0.1);
            // vec3 surfaceColor = vec3(0.1, 0.0, 0.5);

            // we can use mix() fn here instead
            // vec3 finalColor = vec3(0.0);
            // finalColor.r += depthColor.r + (surfaceColor.r - depthColor.r) * elevation;
            // finalColor.g += depthColor.g + (surfaceColor.g - depthColor.g) * elevation;
            // finalColor.b += depthColor.b + (surfaceColor.b - depthColor.b) * elevation;

            // vec3 finalColor = mix(depthColor, surfaceColor, elevation);


            gl_FragColor = vec4(vColor, 1.0);
          }
          `,
	});

	const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial);
	shaderMesh.rotation.x = -Math.PI * 0.5;
	shaderMesh.position.y = -2.5;
	core.scene!.add(shaderMesh);
});
