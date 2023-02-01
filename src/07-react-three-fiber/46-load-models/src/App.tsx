import { Suspense } from "react";
import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";

import Cube from "./models/Cube";
import Hamburger from "./models/Hamburger";
import FlightHelmet from "./models/FlightHelmet";

const App = () => {
	return (
		<>
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			<directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
			<ambientLight intensity={0.5} />

			<mesh
				receiveShadow
				position-y={-1}
				rotation-x={-Math.PI * 0.5}
				scale={10}
			>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>

			<Suspense fallback={<Cube position-y={0.5} scale={[2, 3, 2]} />}>
				<Hamburger />
				<FlightHelmet />
			</Suspense>
		</>
	);
};
export default App;
