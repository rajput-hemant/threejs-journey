import "./style.css";
import Experience from "./experience/Experience";

const experience = new Experience(
	document.querySelector("canvas.webgl") as HTMLElement
);

console.log(experience);
