import { Suspense } from "react";
import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";

import Cube from "./models/Cube";
import Hamburger from "./models/Hamburger";
import FlightHelmet from "./models/FlightHelmet";
import Fox from "./models/Fox";

const App = () => {
	return (
		<>
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			<directionalLight
				castShadow
				position={[1, 2, 3]}
				intensity={1.5}
				// to remove Shadow Acne i.e. object(s) casting shadow on itself
				shadow-normalBias={0.04}
			/>
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
				<Hamburger scale={0.3} position-x={-2.5} position-y={-1} />
				<FlightHelmet />
				<Fox />
			</Suspense>
		</>
	);
};
export default App;
