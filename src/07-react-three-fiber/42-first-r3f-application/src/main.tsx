import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Canvas>
			<App />
		</Canvas>
	</React.StrictMode>
);
