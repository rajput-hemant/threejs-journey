import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
// import { CineonToneMapping, LinearEncoding } from "three";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Canvas
			// dpr={[1, 2]} // devicePixelRatio, default: [1, 2]
			// flat // toneMapping
			gl={
				{
					// antialias: false,
					// toneMapping: CineonToneMapping,
					// outputEncoding: LinearEncoding,
				}
			}
			// orthographic
			camera={{
				fov: 45,
				// zoom: 100,
				near: 0.1,
				far: 200,
				position: [3, 2, 6],
			}}
		>
			<App />
		</Canvas>
	</React.StrictMode>
);
