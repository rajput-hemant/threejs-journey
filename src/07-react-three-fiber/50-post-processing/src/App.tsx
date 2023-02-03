import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
import { BlendFunction, GlitchMode } from "postprocessing";
import {
	Bloom,
	DepthOfField,
	EffectComposer,
	Glitch,
	Noise,
	SSR,
	Vignette,
} from "@react-three/postprocessing";

import Drunk from "./Drunk";

export default function Experience() {
	const drunkRef = useRef<THREE.Mesh>();

	const vignetteProps = useControls(
		"Vignette",
		{
			offset: { value: 0.5, min: 0, max: 1, label: "Offset" },
			darkness: { value: 0.9, min: 0, max: 1, label: "Darkness" },
			blendFunction: {
				value: BlendFunction.NORMAL,
				options: BlendFunction,
				label: "Blend Function",
			},
		},
		{ collapsed: true }
	);

	const glitchProps = useControls(
		"Glitch",
		{
			delay: { value: [0.5, 1], min: 0, max: 1, label: "Delay" },
			duration: { value: [0.1, 0.3], min: 0, max: 1, label: "Duration" },
			strength: { value: [0.2, 0.4], min: 0, max: 1, label: "Strength" },
			mode: {
				value: GlitchMode.SPORADIC,
				options: GlitchMode,
				label: "Mode",
			},
			blendFunction: {
				value: BlendFunction.NORMAL,
				options: BlendFunction,
				label: "Blend Function",
			},
		},
		{ collapsed: true }
	);

	const noiseProps = useControls(
		"Noise",
		{
			blendFunction: {
				value: BlendFunction.SOFT_LIGHT,
				options: BlendFunction,
				label: "Blend Function",
			},
			opacity: { value: 0.9, min: 0, max: 1, label: "Opacity" },
			premultiply: { value: false, label: "Premultiply" },
		},
		{ collapsed: true }
	);

	const bloomProps = useControls(
		"Bloom",
		{
			intensity: { value: 0.5, min: 0, max: 1, label: "Intensity" },
			luminanceThreshold: { value: 0, min: 0, max: 1, label: "Threshold" },
			mipmapBlur: { value: true, label: "Mipmap Blur" },
		},
		{ collapsed: true }
	);

	const depthOfFieldProps = useControls(
		"Depth of Field",
		{
			focusDistance: { value: 0.025, min: 0, max: 1 },
			focalLength: { value: 0.05, min: 0, max: 1 },
			bokehScale: { value: 6, min: 0, max: 10 },
		},
		{ collapsed: true }
	);

	// const ssrProps = useControls(
	// 	"SSR Effect",
	// 	{
	// 		temporalResolve: true,
	// 		STRETCH_MISSED_RAYS: true,
	// 		USE_MRT: true,
	// 		USE_NORMALMAP: true,
	// 		USE_ROUGHNESSMAP: true,
	// 		ENABLE_JITTERING: true,
	// 		ENABLE_BLUR: true,
	// 		temporalResolveMix: { value: 0.9, min: 0, max: 1 },
	// 		temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
	// 		maxSamples: { value: 0, min: 0, max: 1 },
	// 		resolutionScale: { value: 1, min: 0, max: 1 },
	// 		blurMix: { value: 0.5, min: 0, max: 1 },
	// 		blurKernelSize: { value: 8, min: 0, max: 8 },
	// 		blurSharpness: { value: 0.5, min: 0, max: 1 },
	// 		rayStep: { value: 0.3, min: 0, max: 1 },
	// 		intensity: { value: 1, min: 0, max: 5 },
	// 		maxRoughness: { value: 0.1, min: 0, max: 1 },
	// 		jitter: { value: 0.7, min: 0, max: 5 },
	// 		jitterSpread: { value: 0.45, min: 0, max: 1 },
	// 		jitterRough: { value: 0.1, min: 0, max: 1 },
	// 		roughnessFadeOut: { value: 1, min: 0, max: 1 },
	// 		rayFadeOut: { value: 0, min: 0, max: 1 },
	// 		MAX_STEPS: { value: 20, min: 0, max: 20 },
	// 		NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
	// 		maxDepthDifference: { value: 3, min: 0, max: 10 },
	// 		maxDepth: { value: 1, min: 0, max: 1 },
	// 		thickness: { value: 10, min: 0, max: 10 },
	// 		ior: { value: 1.45, min: 0, max: 2 },
	// 	},
	// 	{ collapsed: true }
	// );

	const drunkProps = useControls(
		"Drunk Effect",
		{
			frequency: { value: 2, min: 1, max: 20 },
			amplitude: { value: 0.1, min: 0, max: 1 },
			blendFunction: {
				value: BlendFunction.DARKEN,
				options: BlendFunction,
				label: "Blend Function",
			},
		},
		{ collapsed: true }
	);

	return (
		<>
			<color args={["#000"]} attach="background" />

			<EffectComposer
			// multisampling={0}
			>
				{/* @ts-ignore */}
				<Vignette {...vignetteProps} />

				{/* @ts-ignore */}
				<Glitch {...glitchProps} />

				{/* @ts-ignore */}
				<Noise {...noiseProps} />

				<Bloom {...bloomProps} />

				<DepthOfField {...depthOfFieldProps} />

				{/* <SSR {...ssrProps} /> */}

				{/* @ts-ignore */}
				<Drunk ref={drunkRef} {...drunkProps} />
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
				{/* <meshStandardMaterial color="mediumpurple" /> */}
			</mesh>

			<mesh
				receiveShadow
				position-y={-1}
				rotation-x={-Math.PI * 0.5}
				scale={10}
			>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" metalness={0} roughness={0} />
			</mesh>
		</>
	);
}
