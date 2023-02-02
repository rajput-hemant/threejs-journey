import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import { BlendFunction, GlitchMode } from "postprocessing";
import {
	Bloom,
	DepthOfField,
	EffectComposer,
	Glitch,
	Noise,
	Vignette,
} from "@react-three/postprocessing";

export default function Experience() {
	return (
		<>
			<color args={["#000"]} attach="background" />

			<EffectComposer
			// multisampling={0}
			>
				<Vignette
					offset={0.5}
					darkness={0.9}
					blendFunction={BlendFunction.NORMAL}
				/>
				<Glitch
					// @ts-ignore
					delay={[0.5, 1]}
					// @ts-ignore
					duration={[0.1, 0.3]}
					// @ts-ignore
					strength={[0.2, 0.4]}
					mode={GlitchMode.SPORADIC}
				/>
				<Noise blendFunction={BlendFunction.SOFT_LIGHT} premultiply={false} />
				<Bloom mipmapBlur intensity={0.5} luminanceThreshold={0} />
				<DepthOfField
					focusDistance={0.025}
					focalLength={0.025}
					bokehScale={6}
				/>
			</EffectComposer>

			<Perf position="top-left" />

			<OrbitControls makeDefault />

			<directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
			<ambientLight intensity={0.5} />

			<mesh castShadow position-x={-2}>
				<sphereGeometry />
				<meshStandardMaterial color="orange" />
			</mesh>

			<mesh castShadow position-x={2} scale={1.5}>
				<boxGeometry />
				{/* <meshStandardMaterial
					color="white"
					emissive="orange"
					emissiveIntensity={2}
					toneMapped={false}
				/> */}
				<meshBasicMaterial color={[1.5, 1, 4]} toneMapped={false} />
			</mesh>

			<mesh
				receiveShadow
				position-y={-1}
				rotation-x={-Math.PI * 0.5}
				scale={10}
			>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>
		</>
	);
}
