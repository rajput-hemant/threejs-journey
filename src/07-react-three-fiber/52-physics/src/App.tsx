import { useEffect, useMemo, useRef, useState } from "react";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import {
	Physics,
	RigidBody,
	Debug,
	CuboidCollider,
	// BallCollider,
	RigidBodyApi,
	CylinderCollider,
	InstancedRigidBodies,
	Vector3Array,
} from "@react-three/rapier";
import { Euler, InstancedMesh, Matrix4, Quaternion, Vector3 } from "three";

const App = () => {
	const cube = useRef<RigidBodyApi>(null!);
	const twister = useRef<RigidBodyApi>(null!);
	// const [hitSound] = useState(new Audio("hit.mp3"));
	const hamburger = useGLTF("hamburger.glb");

	const cubesCount = 50;
	const cubes = useRef<InstancedMesh>(null!);

	const cubeTransforms = useMemo(() => {
		const positions: Vector3Array[] = [];
		const rotations: Vector3Array[] = [];
		const scales = new Vector3();

		for (let i = 0; i < cubesCount; i++) {
			positions.push([
				(Math.random() - 0.5) * 8,
				6 + i * 0.2,
				(Math.random() - 0.5) * 8,
			]);

			rotations.push([Math.random(), Math.random(), Math.random()]);

			const scale = 0.2 + Math.random() * 0.2;
			scales.set(scale, scale, scale);
		}

		return { positions, rotations, scales };
	}, []);

	/**
	 * our matrices aren't being used as the base position
	 * and we need to provide the positions, rotations and scales
	 * separately to the `<InstancedRigidBodies>`
	 */
	// useEffect(() => {
	// 	for (let i = 0; i < cubesCount; i++) {
	// 		const matrix = new Matrix4();
	// 		matrix.compose(
	// 			new Vector3(i * 2, 0, 0),
	// 			new Quaternion(),
	// 			new Vector3(1, 1, 1)
	// 		);
	// 		cubes.current!.setMatrixAt(i, matrix);
	// 	}
	// }, []);

	useFrame((state, _) => {
		const time = state.clock.getElapsedTime();
		/**
		 * setNextKinematicPosition() needs quaternion rotation
		 * so we need to convert euler rotation to quaternion rotation
		 */
		const eulerRotation = new Euler(0, time * 3, 0);
		const quaternionRotation = new Quaternion();

		quaternionRotation.setFromEuler(eulerRotation);

		twister.current.setNextKinematicRotation(quaternionRotation);

		const angle = time * 0.5;
		const x = Math.cos(angle) * 2;
		const z = Math.sin(angle) * 2;
		twister.current.setNextKinematicTranslation({ x, y: -0.8, z });
	});

	/**
	 * `applyForce()` is used to apply force for quite a long time (like the wind)
	 *
	 * while, `applyImpluse()` is used to aply a short force for very short period of time(like for a projectile)
	 */
	const cubeJump = () => {
		const mass = cube.current.mass();

		/* multiply by mass to get the same force for all objects */
		cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
		cube.current.applyTorqueImpulse({
			x: Math.random() - 0.5,
			y: Math.random() - 0.5,
			z: Math.random() - 0.5,
		});
	};

	const collisionEnter = () => {
		// hitSound.currentTime = 0;
		// hitSound.volume = Math.random();
		// hitSound.play();
	};

	return (
		<>
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			<directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
			<ambientLight intensity={0.5} />

			<Physics gravity={[0, -9.81, 0]}>
				{/* <Debug /> */}

				<RigidBody colliders="ball">
					<mesh castShadow position={[-1.5, 2, 0]}>
						<sphereGeometry />
						<meshStandardMaterial color="orange" />
					</mesh>
				</RigidBody>

				{/* colliders generated w/ trimesh are empty on the inside
					and it makes collision detection more complicated & prone to bugs
					A fast moving object might get through the trimesh or get stuck on its surface */}
				{/* <RigidBody
					// colliders="hull"
					// colliders="trimesh"
					colliders={false}
					position={[0, 1, 0]}
					rotation={[Math.PI * 0.5, 0, 0]}
				> */}
				{/* <CuboidCollider
						// these are the values of half extent
						args={[1.5, 1.5, 0.5]}
					/>
					<CuboidCollider
						args={[0.25, 1, 0.25]}
						position={[0, 0, 1]}
						rotation={[-Math.PI * 0.35, 0, 0]}
					/> */}
				{/* <BallCollider args={[1.5]} />
					<mesh castShadow>
						<torusGeometry args={[1, 0.5, 16, 32]} />
						<meshStandardMaterial color="mediumpurple" />
					</mesh>
				</RigidBody> */}

				<RigidBody
					ref={cube}
					position={[1.5, 2, 0]}
					gravityScale={1}
					restitution={0.5} // bounce
					friction={0.7}
					colliders={false}
					onCollisionEnter={collisionEnter}
					// onCollionExit={() => console.log("exit")}
					// onSleep={() => console.log("sleep")}
					// onWake={() => console.log("wake up")}
				>
					<CuboidCollider args={[0.5, 0.5, 0.5]} mass={2} />
					<mesh castShadow onClick={cubeJump}>
						<boxGeometry />
						<meshStandardMaterial color="mediumpurple" />
					</mesh>
				</RigidBody>

				<RigidBody type="fixed" friction={0.7}>
					<mesh receiveShadow position-y={-1.25}>
						<boxGeometry args={[10, 0.5, 10]} />
						<meshStandardMaterial color="greenyellow" />
					</mesh>
				</RigidBody>

				<RigidBody
					ref={twister}
					position={[0, -0.8, 0]}
					friction={0}
					type="kinematicPosition"
				>
					<mesh castShadow scale={[0.4, 0.4, 3]}>
						<boxGeometry />
						<meshStandardMaterial color="red" />
					</mesh>
				</RigidBody>
				{/* we cann't use hull and trimesh (not viable for dynamic bodies) here */}
				<RigidBody position={[0, 4, 0]} colliders={false}>
					<CylinderCollider args={[0.5, 1.25]} />
					<primitive object={hamburger.scene} scale={0.25} />
				</RigidBody>

				{/* walls */}
				<RigidBody type="fixed">
					<CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
					<CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
					<CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
					<CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
				</RigidBody>

				<InstancedRigidBodies
					positions={cubeTransforms.positions}
					rotations={cubeTransforms.rotations}
					scale={cubeTransforms.scales}
				>
					<instancedMesh
						ref={cubes}
						args={[undefined, undefined, cubesCount]}
						castShadow
					>
						<boxGeometry />
						<meshStandardMaterial color="tomato" />
					</instancedMesh>
				</InstancedRigidBodies>
			</Physics>
		</>
	);
};

export default App;
