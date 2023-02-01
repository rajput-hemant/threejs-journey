import { useEffect } from "react";
import { useControls } from "leva";
import { useAnimations, useGLTF } from "@react-three/drei";

const Fox = () => {
	const model = useGLTF("/Fox/glTF/Fox.gltf");
	const animations = useAnimations(model.animations, model.scene);

	const { animation } = useControls({
		animation: {
			options: animations.names,
			label: "Animation",
		},
	});

	useEffect(() => {
		const action = animations.actions[animation];
		action?.reset().fadeIn(0.5).play();

		return () => {
			action?.fadeOut(0.5);
		};
	}, [animation]);

	return <primitive object={model.scene} scale={0.05} position-y={-1} />;
};

export default Fox;
