import { useRef } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { meshBounds, OrbitControls, useGLTF } from "@react-three/drei";

export default function Experience() {
	const cube = useRef<THREE.Mesh>(null!);

	useFrame((_, delta) => {
		cube.current.rotation.y += delta * 0.2;
	});

	const onClickCube = (e: ThreeEvent<MouseEvent>) => {
		(cube.current.material as THREE.MeshStandardMaterial).color.set(
			`hsl(${Math.random() * 360}, 100%, 75%)`
		);
	};

	const onClickSphere = (e: ThreeEvent<MouseEvent>) => {
		/* this will stop the event from propagating to the next object i.e. Cube */
		e.stopPropagation();
	};

	const hamburger = useGLTF("/hamburger.glb");

	return (
		<>
			<OrbitControls makeDefault />

			<directionalLight position={[1, 2, 3]} intensity={1.5} />
			<ambientLight intensity={0.5} />

			<mesh position-x={-2}>
				<sphereGeometry />
				<meshStandardMaterial color="orange" />
			</mesh>

			<mesh
				ref={cube}
				position-x={2}
				scale={1.5}
				onClick={onClickCube}
				// onContextMenu={onClickCube} // right click
				// onDoubleClick={onClickCube} // double
				// onPointerUp={onClickCube} // mouse up
				// onPointerDown={onClickCube} // mouse down
				// onPointerOver={onClickCube} // mouse over, same as mouse enter
				// onPointerOut={onClickCube} // mouse out, same as mouse leave
				// onPointerMove={onClickCube} // mouse move, called every frame
				// onPointerMissed={() => {
				// 	console.log("missed");
				// }} // mouse missed, called every frame
				onPointerEnter={() => {
					document.body.style.cursor = "pointer";
				}}
				onPointerLeave={() => {
					document.body.style.cursor = "default";
				}}
				/**
				 * meshBounds will create a imaginary sphere around the object,
				 * and the pointer events will be fired only if the pointer is inside the sphere
				 * it is not precise, but it is good enough for most cases
				 */
				raycast={meshBounds}
			>
				<boxGeometry />
				<meshStandardMaterial color="mediumpurple" />
			</mesh>

			<mesh
				position-y={-1}
				rotation-x={-Math.PI * 0.5}
				scale={10}
				onClick={onClickSphere}
			>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>

			<primitive
				object={hamburger.scene}
				scale={0.25}
				position-y={0.5}
				onClick={(e: ThreeEvent<MouseEvent>) => {
					console.log("hamburger clicked");
					e.stopPropagation(); // this is to stop event propagation to other meshes of hamburger
				}}
			/>
		</>
	);
}
