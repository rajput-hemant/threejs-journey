import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
	const cube = useRef<THREE.Mesh>(null!);

	useFrame((state, delta) => {
		cube.current.rotation.y += delta * 0.2;
	});

	return (
		<>
			<OrbitControls makeDefault />

			<directionalLight position={[1, 2, 3]} intensity={1.5} />
			<ambientLight intensity={0.5} />

			<mesh position-x={-2}>
				<sphereGeometry />
				<meshStandardMaterial color="orange" />
			</mesh>

			<mesh ref={cube} position-x={2} scale={1.5}>
				<boxGeometry />
				<meshStandardMaterial color="mediumpurple" />
			</mesh>

			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>
		</>
	);
}
