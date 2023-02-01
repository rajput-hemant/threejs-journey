import { useEffect, useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import {
	Center,
	OrbitControls,
	Text3D,
	useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
	// const donutGroup = useRef<THREE.Group>(null!);
	const donuts = useRef<THREE.Mesh[]>([]);

	const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

	// const [torusGeometry, setTorusGeometry] = useState<THREE.TorusGeometry>();
	// const [material, setMaterial] = useState<THREE.MeshMatcapMaterial>();

	useEffect(() => {
		matcapTexture.encoding = THREE.sRGBEncoding;
		matcapTexture.needsUpdate = true;

		material.matcap = matcapTexture;
		material.needsUpdate = true;
	}, []);

	useFrame((_, delta) => {
		/* rotating children of three.js group */
		// donutGroup.current.children.forEach((donut) => {
		// 	donut.rotation.x += 0.1 * delta;
		// 	donut.rotation.y += 0.1 * delta;
		// });

		/* rotating using an array of refs to each donut */
		donuts.current.forEach((donut) => {
			donut.rotation.x += 0.1 * delta;
			donut.rotation.y += 0.1 * delta;
		});
	});

	return (
		<>
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			{/* @ts-ignore */}
			{/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} /> */}
			{/* @ts-ignore */}
			{/* <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

			<Center>
				<Text3D
					font="/fonts/helvetiker_regular.typeface.json"
					size={0.75}
					height={0.2}
					curveSegments={12}
					bevelEnabled
					bevelThickness={0.02}
					bevelSize={0.02}
					bevelOffset={0}
					bevelSegments={5}
					material={material}
				>
					rajput-hemant
					{/* <meshMatcapMaterial matcap={matcapTexture} /> */}
				</Text3D>
			</Center>
			{/* <group ref={donutGroup}> */}
			{[...Array(100)].map((_, i) => (
				<mesh
					key={i}
					ref={(mesh) => (donuts.current[i] = mesh!)}
					position={[
						(Math.random() - 0.5) * 10,
						(Math.random() - 0.5) * 10,
						(Math.random() - 0.5) * 10,
					]}
					scale={0.2 + Math.random() * 0.2}
					rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
					geometry={torusGeometry}
					material={material}
				>
					{/* <torusGeometry args={[1, 0.6, 16, 32]} /> */}
					{/* <meshMatcapMaterial matcap={matcapTexture} /> */}
				</mesh>
			))}
			{/* </group> */}
		</>
	);
}
