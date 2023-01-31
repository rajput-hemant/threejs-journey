import { useRef } from "react";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";
import {
	// AccumulativeShadows,
	BakeShadows,
	ContactShadows,
	Environment,
	Lightformer,
	OrbitControls,
	// Sky,
	// Stage,
	// RandomizedLight,
	// SoftShadows,
	useHelper,
} from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useControls } from "leva";

const App = () => {
	const cube = useRef<THREE.Mesh>(null!);
	const directionalLight = useRef<THREE.DirectionalLight>(null!);

	useHelper(directionalLight, DirectionalLightHelper, 1, "hotpink");

	useFrame((state, delta) => {
		// const time = state.clock.elapsedTime;
		// cube.current.position.x = 2 + Math.sin(time);
		cube.current.rotation.y += delta * 0.2;
	});

	const { color, opacity, blur } = useControls("Contact Shadowes", {
		color: "#4b2709",
		opacity: {
			value: 0.5,
			min: 0,
			max: 1,
			step: 0.01,
			label: "Opacity",
		},
		blur: {
			value: 2.8,
			min: 0,
			max: 10,
			step: 1,
			label: "Blur",
		},
	});

	const { sunPosition } = useControls("Sun", {
		sunPosition: {
			value: [1, 2, 3],
			label: "Position",
		},
	});

	const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
		useControls("Environment Map", {
			envMapIntensity: { value: 3.5, min: 0, max: 12 },
			envMapHeight: { value: 7, min: 0, max: 100 },
			envMapRadius: { value: 28, min: 10, max: 1000 },
			envMapScale: { value: 100, min: 10, max: 1000 },
		});

	return (
		<>
			<Environment
				// background
				ground={{
					height: envMapHeight,
					radius: envMapRadius,
					scale: envMapScale,
				}}
				// files={[
				// 	"/environmentMaps/2/px.jpg",
				// 	"/environmentMaps/2/nx.jpg",
				// 	"/environmentMaps/2/py.jpg",
				// 	"/environmentMaps/2/ny.jpg",
				// 	"/environmentMaps/2/pz.jpg",
				// 	"/environmentMaps/2/nz.jpg",
				// ]}
				// files={"/environmentMaps/the_sky_is_on_fire_2k.hdr"}
				preset="sunset"
				resolution={32}
			>
				<color args={["#000"]} attach="background" />
				{/* instead of setting color intensity > 1, use LightFormer Helper from Drei*/}
				{/* <mesh position-z={-5} scale={10}>
					<planeGeometry />
					<meshBasicMaterial color={[10, 0, 0]} />
				</mesh> */}
				<Lightformer
					position-z={-5}
					scale={10}
					color="red"
					intensity={10}
					form="ring"
				/>
			</Environment>

			<BakeShadows />
			{/* <SoftShadows
				frustum={3.75}
				size={0.005}
				near={9.5}
				samples={17}
				rings={11}
			/> */}

			<color args={["ivory"]} attach="background" />

			<Perf position="top-left" />

			<OrbitControls makeDefault />

			{/* works only on plane geometry */}
			{/* <AccumulativeShadows
				position={[0, -0.99, 0]}
				scale={10}
				color="#316d39"
				opacity={0.8}
				frames={Infinity}
				temporal
				blend={100}
			>
				<RandomizedLight
					position={[1, 2, 3]}
					amount={8}
					radius={1}
					ambient={0.5}
					intensity={1}
					bias={0.001}
				/>
			</AccumulativeShadows> */}

			{/* works only on plane geometry */}
			<ContactShadows
				position={[0, 0, 0]}
				scale={10}
				resolution={512}
				far={5}
				color={color}
				opacity={opacity}
				blur={blur}
			/>

			{/* <directionalLight
				ref={directionalLight}
				position={sunPosition}
				intensity={1.5}
				castShadow
				shadow-mapSize={[1024, 1024]}
				shadow-camera-far={10}
				shadow-camera-near={1}
				shadow-camera-left={-5}
				shadow-camera-right={5}
				shadow-camera-top={5}
				shadow-camera-bottom={-5}
			/> */}
			{/* <ambientLight intensity={0.5} /> */}

			{/* <Sky sunPosition={sunPosition} /> */}

			{/* <Stage
				shadows="contact"
				environment="sunset"
				preset="portrait"
				intensity={2}
			> */}
			<mesh position-x={-2} position-y={1} castShadow>
				<sphereGeometry />
				<meshStandardMaterial
					color="orange"
					envMapIntensity={envMapIntensity}
				/>
			</mesh>

			<mesh ref={cube} position-x={2} position-y={1} scale={1.5} castShadow>
				<boxGeometry />
				<meshStandardMaterial
					color="mediumpurple"
					envMapIntensity={envMapIntensity}
				/>
			</mesh>
			{/* </Stage> */}

			{/* <mesh
				position-y={0}
				rotation-x={-Math.PI * 0.5}
				scale={10}
				// receiveShadow
			>
				<planeGeometry />
				<meshStandardMaterial
					color="greenyellow"
					envMapIntensity={envMapIntensity}
				/>
			</mesh> */}
		</>
	);
};

export default App;
