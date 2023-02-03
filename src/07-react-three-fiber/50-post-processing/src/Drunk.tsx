import { forwardRef } from "react";
import { BlendFunction } from "postprocessing";

import DrunkProps from "./@types/drunk";
import DrunkEffect from "./DrunkEffect";

const Drunk = forwardRef(
	(
		{
			frequency = 2,
			amplitude = 0.1,
			blendFunction = BlendFunction.DARKEN,
		}: DrunkProps,
		ref
	) => {
		const effect = new DrunkEffect({ frequency, amplitude, blendFunction });

		return <primitive ref={ref} object={effect} />;
	}
);

export default Drunk;
