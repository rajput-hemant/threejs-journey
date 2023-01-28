import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
	start: number;
	current: number;
	elapsed: number;
	delta: number;

	constructor() {
		/**
		 * Call the EventEmitter constructor
		 */
		super();
		this.start = Date.now();
		this.current = this.start;
		this.elapsed = 0;
		this.delta = 16.666; // default to 60fps

		/**
		 * why do we need to use requestAnimationFrame here?
		 *
		 * to wait for the next frame before starting the clock i.e. tick method
		 */
		window.requestAnimationFrame(() => this.tick());
	}

	tick() {
		const currentTime = Date.now();
		this.delta = currentTime - this.current;
		this.current = currentTime;
		this.elapsed = (this.current - this.start) / 1000; // in seconds

		/**
		 * Emit a Custom tick event
		 */
		this.trigger("tick");

		window.requestAnimationFrame(() => this.tick());
	}
}
