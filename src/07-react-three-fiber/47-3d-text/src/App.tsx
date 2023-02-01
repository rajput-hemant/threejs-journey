import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
	return (
		<>
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			<mesh scale={1.5}>
				<boxGeometry />
				<meshNormalMaterial />
			</mesh>
		</>
	);
}
