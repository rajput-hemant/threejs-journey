import * as THREE from "three";
import { Pane } from "tweakpane";

import Core from "../core";
import Debug from "../utils/Debug";
import Resources from "../utils/Resources";

export default class Environment {
	core: Core;
	scene: THREE.Scene;
	resources: Resources;
	sunlight?: THREE.DirectionalLight;
	enviromentMap?: any = {};
	debug?: Debug;
	debugFolder?: Pane;

	constructor() {
		this.core = new Core();
		this.scene = this.core.scene!;
		this.resources = this.core.resources!;
		this.debug = this.core.debug;
	}
}
