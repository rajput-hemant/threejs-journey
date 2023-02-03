import { Uniform } from "three";
import { Effect } from "postprocessing";

import DrunkProps from "./@types/drunk";

const fragmentShader = /* glsl */ `
  uniform float frequency;
  uniform float amplitude;
  uniform float offset;

  void mainUv(inout vec2 uv) {
    uv.y += amplitude * sin(uv.x * frequency + offset);
  }

  /*
    inputColor: contains the color for that pixel from the previous effect. 
    uv: contains the normalized coordinates of the pixel in the render target.
    outputColor: is what we need to change in order to apply tbe effect
  */
  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec4 color = inputColor;
    color.rgb *= vec3(0.8, 1.0, 0.5);
    outputColor = color;
  }
`;

export default class DrunkEffect extends Effect {
	constructor({ frequency, amplitude, blendFunction }: DrunkProps) {
		/* Invoke the Effect constructor with the name, the fragment shader, and the options. */
		super("DrunkEffect", fragmentShader, {
			blendFunction,
			uniforms: new Map([
				["frequency", new Uniform(frequency)],
				["amplitude", new Uniform(amplitude)],
				["offset", new Uniform(0)],
			]),
		});
	}

	/* this method is called every frame automatically */
	update(_: any, __: any, deltaTime: number) {
		this.uniforms.get("offset")!.value += deltaTime;
	}
}
