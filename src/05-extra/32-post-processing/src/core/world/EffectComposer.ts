import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";

import Core from "../Core";
import Debug from "../utils/Debug";
import Resources from "../utils/Resources";

export default class Base {
	core: Core;
	debug: Debug;
	scene: THREE.Scene;
	resources: Resources;
	effectComposer?: EffectComposer;
	renderTarget?: THREE.WebGLRenderTarget;

	private isOnePixelRatio: boolean;
	private isWebGL2Supported: boolean;

	/* Passes */
	private displacementPass?: ShaderPass;

	constructor() {
		this.core = new Core();
		this.debug = this.core.debug!;
		this.resources = this.core.resources!;
		this.scene = this.core.scene!;

		// this is for antialiasing
		this.isOnePixelRatio = this.core.renderer!.instance!.getPixelRatio() === 1;
		this.isWebGL2Supported =
			this.core.renderer!.instance!.capabilities.isWebGL2;

		/* Post processing */
		this.setRenderTarget();
		this.setComposer();
	}

	// Render Target
	setRenderTarget() {
		this.renderTarget = new THREE.WebGLRenderTarget(
			this.core.sizes!.width!,
			this.core.sizes!.height!,
			{
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				format: THREE.RGBAFormat,
				// encoding: THREE.sRGBEncoding, // this won't work, add GammaCorrectionShader as last pass instead
				samples: this.isOnePixelRatio && this.isWebGL2Supported ? 1 : 0, // this is for antialiasing
			}
		);
		if (this.isOnePixelRatio && this.isWebGL2Supported)
			console.log("using MSAA");
	}

	// Composer
	setComposer() {
		this.effectComposer = new EffectComposer(
			this.core.renderer!.instance!,
			this.renderTarget
		);
		this.effectComposer!.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.effectComposer!.setSize(
			this.core.sizes!.width!,
			this.core.sizes!.height!
		);

		/* Passes */
		const renderPass = new RenderPass(this.scene, this.core.camera!.instance!);
		this.effectComposer!.addPass(renderPass);

		/* Dot Screen Pass */
		const dotScreenPass = new DotScreenPass();
		dotScreenPass.enabled = false;
		this.effectComposer!.addPass(dotScreenPass);

		this.debug
			.ui!.addFolder({ title: "Dot Screen Pass" })
			.addInput(dotScreenPass, "enabled", { label: "Enable" });

		/* Glitch Pass */
		const glitchPass = new GlitchPass();
		glitchPass.goWild = false;
		glitchPass.enabled = true;
		this.effectComposer!.addPass(glitchPass);

		const glitchPassDebug = this.debug.ui!.addFolder({ title: "Glitch Pass" });
		glitchPassDebug.addInput(glitchPass, "enabled", { label: "Enable" });
		glitchPassDebug.addInput(glitchPass, "goWild", { label: "Go Wild" });

		/* RGBShift Pass */
		const rgbShiftPass = new ShaderPass(RGBShiftShader);
		rgbShiftPass.enabled = true;
		this.effectComposer!.addPass(rgbShiftPass);

		this.debug
			.ui!.addFolder({ title: "RGBShift Pass" })
			.addInput(rgbShiftPass, "enabled", { label: "Enable" });

		/* Unreal Bloom Pass */
		const bloomPass = new UnrealBloomPass(
			new THREE.Vector2(this.core.sizes!.width!, this.core.sizes!.height!),
			0.3,
			1,
			0.6
		);
		bloomPass.enabled = false;
		this.effectComposer!.addPass(bloomPass);

		const bloomPassDebug = this.debug.ui!.addFolder({ title: "Bloom Pass" });
		bloomPassDebug.addInput(bloomPass, "enabled", { label: "Enable" });
		bloomPassDebug.addInput(bloomPass, "strength", {
			label: "Strength",
			min: 0,
			max: 2,
			step: 0.01,
		});
		bloomPassDebug.addInput(bloomPass, "radius", {
			label: "Radius",
			min: 0,
			max: 2,
			step: 0.01,
		});
		bloomPassDebug.addInput(bloomPass, "threshold", {
			label: "Threshold",
			min: 0,
			max: 1,
			step: 0.01,
		});

		/* Custom Passes */

		// Tint Pass
		const tintShader = {
			uniforms: {
				tDiffuse: { value: null },
				uTint: { value: null },
			},
			vertexShader: `
				varying vec2 vUv;

				void main() {
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

					vUv = uv;
				}
			`,
			fragmentShader: `
				uniform sampler2D tDiffuse;
				uniform vec3 uTint;

				varying vec2 vUv;

				void main() {
					vec4 color = texture2D(tDiffuse, vUv);
					color.rgb += uTint;

					gl_FragColor = color;
				}
			`,
		};

		const tintPass = new ShaderPass(tintShader);
		tintPass.uniforms.uTint.value = new THREE.Vector3();
		this.effectComposer.addPass(tintPass);

		const tintPassDebug = this.debug.ui!.addFolder({ title: "Tint Pass" });
		tintPassDebug.addInput(tintPass.uniforms.uTint.value, "x", {
			label: "Red",
			min: 0,
			max: 1,
			step: 0.01,
		});
		tintPassDebug.addInput(tintPass.uniforms.uTint.value, "y", {
			label: "Green",
			min: 0,
			max: 1,
			step: 0.01,
		});
		tintPassDebug.addInput(tintPass.uniforms.uTint.value, "z", {
			label: "Blue",
			min: 0,
			max: 1,
			step: 0.01,
		});

		// Displacement Pass
		const displacementShader = {
			uniforms: {
				tDiffuse: { value: null },
				uNormalMap: { value: null },
				uDepth: { value: null },
				uIntensity: { value: null },
			},
			vertexShader: `
				varying vec2 vUv;

				void main() {
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

					vUv = uv;
				}
			`,
			fragmentShader: `
				uniform sampler2D tDiffuse;
				uniform sampler2D uNormalMap;
				uniform float uDepth;
				uniform float uIntensity;

				varying vec2 vUv;

				void main() {
					vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;

					vec2 newUv = vUv + normalColor.xy * uDepth;
					vec4 color = texture2D(tDiffuse, newUv);

					vec3 lightDirection = normalize(vec3(-1.0, 1.0, 0.0));
					float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);
					color.rgb += lightness * uIntensity;

					gl_FragColor = color;
				}
			`,
		};

		this.displacementPass = new ShaderPass(displacementShader);

		this.resources.on("ready", () => {
			this.displacementPass!.uniforms.uNormalMap.value =
				this.resources.items.normalMap;
		});
		this.displacementPass!.uniforms.uDepth.value = 0.1;
		this.displacementPass!.uniforms.uIntensity.value = 2.0;

		this.effectComposer.addPass(this.displacementPass);

		const displacementPassDebug = this.debug.ui!.addFolder({
			title: "Displacement Pass",
		});
		displacementPassDebug.addInput(this.displacementPass, "enabled", {
			label: "Enable",
		});
		displacementPassDebug.addInput(
			this.displacementPass.uniforms.uDepth,
			"value",
			{
				label: "Depth",
				min: 0,
				max: 1,
				step: 0.01,
			}
		);
		displacementPassDebug.addInput(
			this.displacementPass.uniforms.uIntensity,
			"value",
			{
				label: "Intensity",
				min: 0,
				max: 5,
				step: 0.1,
			}
		);

		// must be added after the render pass
		const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
		this.effectComposer!.addPass(gammaCorrectionPass);

		if (this.isOnePixelRatio && !this.isWebGL2Supported) {
			this.effectComposer!.addPass(
				new SMAAPass(this.core.sizes!.width!, this.core.sizes!.height!)
			);
			console.log("using SMAA");
		}
	}

	update() {
		this.effectComposer!.render();
	}
}
