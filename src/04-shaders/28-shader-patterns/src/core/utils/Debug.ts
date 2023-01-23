import { Pane } from "tweakpane";

export default class Debug {
	ui?: Pane;

	constructor() {
		this.ui = new Pane({
			title: "Debug panel",
			expanded: true,
		});
	}
}
