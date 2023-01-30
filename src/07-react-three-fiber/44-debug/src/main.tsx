import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";

import App from "./App";
import "./index.css";
import { Leva } from "leva";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Leva collapsed={false} />
		<Canvas
			camera={{
				fov: 45,
				near: 0.1,
				far: 200,
				position: [-4, 3, 6],
			}}
		>
			<App />
		</Canvas>
	</React.StrictMode>
);
