import * as dat from "dat.gui";

export default class Debug {
	active: boolean;
	ui?: dat.GUI;

	constructor() {
		this.active = window.location.hash === "#debug";

		if (this.active) {
			this.ui = new dat.GUI();
		}
	}
}
