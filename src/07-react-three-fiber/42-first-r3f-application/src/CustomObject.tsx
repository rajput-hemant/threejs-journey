import { useMemo, useRef } from "react";
import { BufferGeometry, DoubleSide } from "three";

const CustomObject = () => {
	const geometry = useRef<BufferGeometry>(null);
	geometry.current?.computeVertexNormals();

	// 10 triangles, each w/ 3 vertices
	const verticesCount = 10 * 3;

	const positions = useMemo(() => {
		// each vertex has 3 coordinates
		const positions = new Float32Array(verticesCount * 3);

		for (let i = 0; i < verticesCount * 3; i++)
			positions[i] = (Math.random() - 0.5) * 3;

		return positions;
	}, []);

	return (
		<mesh>
			<bufferGeometry ref={geometry}>
				<bufferAttribute
					attach="attributes-position"
					count={verticesCount}
					itemSize={3}
					array={positions}
				/>
			</bufferGeometry>
			<meshStandardMaterial color="red" side={DoubleSide} />
		</mesh>
	);
};

export default CustomObject;
