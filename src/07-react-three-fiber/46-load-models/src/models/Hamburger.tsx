import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const Hamburger = () => {
	const model = useLoader(
		GLTFLoader,
		//  "/hamburger.glb",
		"/hamburger-draco.glb",
		(loader) => {
			const dracoLoader = new DRACOLoader();
			dracoLoader.setDecoderPath("/draco/");
			loader.setDRACOLoader(dracoLoader);
		}
	);

	return (
		<primitive
			object={model.scene}
			scale={0.35}
			position-x={-2}
			position-y={-1}
		/>
	);
};

export default Hamburger;
