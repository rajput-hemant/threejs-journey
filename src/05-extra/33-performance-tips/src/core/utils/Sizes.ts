import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
	width: number;
	height: number;
	pixelRatio: number;

	constructor() {
		/**
		 * Call the EventEmitter constructor
		 */
		super();

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.pixelRatio = Math.min(window.devicePixelRatio, 2);

		/**
		 * Resize event
		 */
		window.addEventListener("resize", () => {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.pixelRatio = Math.min(window.devicePixelRatio, 2);

			/**
			 * Emit a Custom resize event
			 */
			this.trigger("resize");
		});
	}
}
