import { OrbitControls } from "@react-three/drei";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";

const App = () => {
	const { perfVisible } = useControls("Performance", {
		perfVisible: {
			value: true,
			label: "Show Performance Monitor",
		},
	});

	const { position, color, visible } = useControls("Sphere", {
		position: {
			value: { x: -2, y: 0 },
			step: 0.1,
			joystick: "invertY",
			label: "Position",
		},
		color: "#ff0000",
		visible: true,
		interval: {
			min: 0,
			max: 10,
			value: [4, 5],
		},
		clickMe: button(() => {
			console.log("clicked!");
		}),
		Choice: { options: ["A", "B", "C"] },
	});

	const { scale } = useControls("Box", {
		scale: {
			value: 1.5,
			min: 0,
			max: 5,
			step: 0.01,
			label: "Scale",
		},
	});

	return (
		<>
			{perfVisible && <Perf position="top-left" />}

			<OrbitControls makeDefault />

			<directionalLight position={[1, 2, 3]} intensity={1.5} />
			<ambientLight intensity={0.5} />

			<mesh position={[position.x, position.y, 0]} visible={visible}>
				<sphereGeometry />
				<meshStandardMaterial color={color} />
			</mesh>

			<mesh position-x={2} scale={scale}>
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
