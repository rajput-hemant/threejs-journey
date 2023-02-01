import { MeshProps } from "@react-three/fiber";

const Cube = (props: MeshProps) => {
	return (
		<mesh {...props}>
			<boxGeometry args={[1, 1, 1, 2, 2, 2]} />
			<meshBasicMaterial color="red" wireframe />
		</mesh>
	);
};

export default Cube;
