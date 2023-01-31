import React from "react";
import ReactDOM from "react-dom/client";
import { Leva } from "leva";
import { Canvas } from "@react-three/fiber";

import App from "./App";
import "./index.css";

// const created = (state: RootState) => {
// 	// state.gl.setClearColor("red");
// 	// state.scene.background = new THREE.Color("red");

// };

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Leva collapsed={false} />
		<Canvas
			shadows
			camera={{
				fov: 45,
				near: 0.1,
				far: 200,
				position: [-4, 3, 6],
			}}
			// onCreated={created}
		>
			<App />
		</Canvas>
	</React.StrictMode>
);
