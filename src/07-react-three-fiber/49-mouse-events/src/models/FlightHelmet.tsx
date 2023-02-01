import { useGLTF } from "@react-three/drei";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FlightHelmet = () => {
	// const model = useLoader(GLTFLoader, "/FlightHelmet/glTF/FlightHelmet.gltf");
	const model = useGLTF("/FlightHelmet/glTF/FlightHelmet.gltf");

	return (
		<primitive
			object={model.scene}
			scale={5}
			position-x={2.5}
			position-y={-1}
		/>
	);
};

/* this will preload the model */
useGLTF.preload("/FlightHelmet/glTF/FlightHelmet.gltf");

export default FlightHelmet;
