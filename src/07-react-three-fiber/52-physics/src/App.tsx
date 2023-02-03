import { useRef } from "react";
import { Perf } from "r3f-perf";
import {
	Physics,
	RigidBody,
	Debug,
	// CuboidCollider,
	// BallCollider,
	RigidBodyApi,
} from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";

const App = () => {
	const cube = useRef<RigidBodyApi>(null!);

	/**
	 * `applyForce()` is used to apply force for quite a long time (like the wind)
	 *
	 * while, `applyImpluse()` is used to aply a short force for very short period of time(like for a projectile)
	 */
	const cubeJump = () => {
		cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
		cube.current.applyTorqueImpulse({
			x: Math.random() - 0.5,
			y: Math.random() - 0.5,
			z: Math.random() - 0.5,
		});
	};

	return (
		<>
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			<directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
			<ambientLight intensity={0.5} />

			<Physics gravity={[0, -9.81, 0]}>
				<Debug />

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
				>
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
			</Physics>
		</>
	);
};
export default App;
