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

export default class Base {
	core: Core;
	debug: Debug;
	scene: THREE.Scene;
	effectComposer?: EffectComposer;
	renderTarget?: THREE.WebGLRenderTarget;

	private isOnePixelRatio: boolean;
	private isWebGL2Supported: boolean;

	constructor() {
		this.core = new Core();
		this.debug = this.core.debug!;
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

		const dotScreenPass = new DotScreenPass();
		dotScreenPass.enabled = false;
		this.effectComposer!.addPass(dotScreenPass);

		this.debug
			.ui!.addFolder({ title: "Dot Screen Pass" })
			.addInput(dotScreenPass, "enabled", { label: "Enable" });

		const glitchPass = new GlitchPass();
		glitchPass.goWild = false;
		glitchPass.enabled = false;
		this.effectComposer!.addPass(glitchPass);

		const glitchPassDebug = this.debug.ui!.addFolder({ title: "Glitch Pass" });
		glitchPassDebug.addInput(glitchPass, "enabled", { label: "Enable" });
		glitchPassDebug.addInput(glitchPass, "goWild", { label: "Go Wild" });

		const rgbShiftPass = new ShaderPass(RGBShiftShader);
		rgbShiftPass.enabled = false;
		this.effectComposer!.addPass(rgbShiftPass);

		this.debug
			.ui!.addFolder({ title: "RGBShift Pass" })
			.addInput(rgbShiftPass, "enabled", { label: "Enable" });

		const bloomPass = new UnrealBloomPass(
			new THREE.Vector2(this.core.sizes!.width!, this.core.sizes!.height!),
			0.3,
			1,
			0.6
		);
		bloomPass.enabled = true;
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
