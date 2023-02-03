import { BlendFunction } from "postprocessing";

export default interface DrunkProps {
	frequency: number;
	amplitude: number;
	blendFunction?: BlendFunction;
}
