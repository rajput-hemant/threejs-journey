import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FlightHelmet = () => {
	const model = useLoader(GLTFLoader, "/FlightHelmet/glTF/FlightHelmet.gltf");

	return (
		<primitive object={model.scene} scale={5} position-x={2} position-y={-1} />
	);
};

export default FlightHelmet;
