import { useRef } from "react";
import {
	Float,
	Html,
	MeshReflectorMaterial,
	OrbitControls,
	PivotControls,
	Text,
	TransformControls,
} from "@react-three/drei";

const App = () => {
	const cube = useRef<THREE.Mesh>(null!);
	const sphere = useRef<THREE.Mesh>(null!);

	return (
		<>
			<OrbitControls makeDefault />
			<directionalLight position={[1, 2, 3]} intensity={1.5} />
			<ambientLight intensity={0.5} />

			{/* anchor is relative position to object */}
			<PivotControls
				anchor={[0, 0, 0]}
				depthTest={false}
				lineWidth={2}
				scale={100}
				fixed
				axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
			>
				<mesh ref={sphere} position-x={-2}>
					<sphereGeometry />
					<meshStandardMaterial color="orange" />
					<Html
						wrapperClass="label"
						position={[1, 1, 0]}
						distanceFactor={6}
						center
						// occlude={[sphere, cube]}
						occlude
					>
						That's a Sphere 👍🏻
					</Html>
				</mesh>
			</PivotControls>

			<mesh ref={cube} position-x={2} scale={1.5}>
				<boxGeometry />
				<meshStandardMaterial color="mediumpurple" />
			</mesh>
			<TransformControls object={cube} mode="translate" />

			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				{/* <meshStandardMaterial color="greenyellow" /> */}
				<MeshReflectorMaterial
					mirror={0.75}
					resolution={512}
					mixBlur={1}
					color="lightgray"
				/>
			</mesh>

			<Float speed={5} floatIntensity={2}>
				<Text
					font="./bangers.woff"
					fontSize={1}
					color="salmon"
					position-y={2}
					maxWidth={2}
					textAlign="center"
				>
					I love R3F
				</Text>
			</Float>
		</>
	);
};

export default App;
