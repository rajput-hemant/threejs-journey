import { useThree, extend, Object3DNode } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

extend({ OrbitControls });

declare module "@react-three/fiber" {
	interface ThreeElements {
		orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>;
	}
}

const App = () => {
	const { camera, gl } = useThree();

	return (
		<>
			<orbitControls args={[camera, gl.domElement]} />

			<directionalLight position={[1, 2, 3]} intensity={1.5} />
			<ambientLight intensity={0.5} />

			<mesh position-x={-2}>
				<sphereGeometry />
				<meshStandardMaterial color="orange" />
			</mesh>

			<mesh position-x={2} scale={1.5}>
				<boxGeometry />
				<meshStandardMaterial color="mediumpurple" />
			</mesh>

			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>
		</>
	);
};

export default App;
