import { useRef } from "react";
import { Group, Mesh } from "three";
import { useFrame, extend, useThree, Object3DNode } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";;

extend({ OrbitControls });

declare module "@react-three/fiber" {
	interface ThreeElements {
		orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>;
	}
}

function App() {
	const { camera, gl } = useThree();

	const cubeRef = useRef<Mesh>(null!);
	const groupRef = useRef<Group>(null!);

	useFrame((_, delta) => {
		cubeRef.current.rotation.y += delta;
		// groupRef.current.rotation.y += delta;
	});

	return (
		<>
			<orbitControls args={[camera, gl.domElement]} />

			<directionalLight position={[1, 2, 3]} />
			<ambientLight intensity={0.5} />

			<group ref={groupRef}>
				<mesh position-x={-2}>
					<sphereGeometry />
					<meshStandardMaterial color="orange" />
				</mesh>
				<mesh
					ref={cubeRef}
					scale={1.5}
					rotation-y={Math.PI * 0.25}
					position-x={2}
				>
					{/* <sphereGeometry args={[1.5, 32, 32]} /> */}
					<boxGeometry />
					<meshStandardMaterial color="mediumpurple" />
				</mesh>
			</group>
			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>
		</>
	);
}

export default App;
