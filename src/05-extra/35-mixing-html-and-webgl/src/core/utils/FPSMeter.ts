import { Pane, BladeApi } from "tweakpane";
import { BladeController, View } from "@tweakpane/core";
import * as Essentials from "@tweakpane/plugin-essentials";

import Core from "../Core";

export default class FPSMeter {
	core: Core;
	gui: Pane;
	graph: BladeApi<BladeController<View>>;

	constructor() {
		this.core = new Core();
		this.gui = this.core.debug!.pane!;
		this.gui.registerPlugin(Essentials);

		this.graph = this.gui!.addBlade({
			view: "fpsgraph",
			label: "FPS",
		});
	}
}
