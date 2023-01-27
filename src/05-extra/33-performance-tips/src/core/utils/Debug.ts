import { Pane } from "tweakpane";

export default class Debug {
	pane?: Pane;

	constructor() {
		this.pane = new Pane({
			title: "Debug panel",
			// expanded: false,
		});
	}
}
