import "./style.css";
import Core from "./core/Core";

const core = new Core(document.querySelector("canvas.webgl") as HTMLElement);

console.log(core);
