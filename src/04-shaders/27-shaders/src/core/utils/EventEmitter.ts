interface Name {
	original: string;
	value: string;
	namespace: string;
}

/**
 * @author Bruno Simon
 * @link https://gist.github.com/brunosimon/120acda915e6629e3a4d497935b16bdf
 *
 * TS Adaptation
 * @author Charles Taylor
 * @link https://gist.github.com/brunosimon/120acda915e6629e3a4d497935b16bdf?permalink_comment_id=3964343#gistcomment-3964343
 */
export default class EventEmitter {
	callbacks: any = {};

	constructor() {
		this.callbacks = {};
		this.callbacks.base = {};
	}

	on(_names: string, callback: Function) {
		// Errors
		if (typeof _names === "undefined" || _names === "") {
			console.warn("wrong names");
			return false;
		}

		if (typeof callback === "undefined") {
			console.warn("wrong callback");
			return false;
		}

		// Resolve names
		const names = this.resolveNames(_names);

		// Each name
		names.forEach((_name) => {
			// Resolve name
			const name = this.resolveName(_name);

			// Create namespace if not exist
			if (!(this.callbacks[name.namespace] instanceof Object))
				this.callbacks[name.namespace] = {};

			// Create callback if not exist
			if (!(this.callbacks[name.namespace][name.value] instanceof Array))
				this.callbacks[name.namespace][name.value] = [];

			// Add callback
			this.callbacks[name.namespace][name.value].push(callback);
		});

		return this;
	}

	off(_names: string) {
		// Errors
		if (typeof _names === "undefined" || _names === "") {
			console.warn("wrong name");
			return false;
		}

		// Resolve names
		const names = this.resolveNames(_names);

		// Each name
		names.forEach((_name) => {
			// Resolve name
			const name = this.resolveName(_name);

			// Remove namespace
			if (name.namespace !== "base" && name.value === "") {
				delete this.callbacks[name.namespace];
			}

			// Remove specific callback in namespace
			else {
				// Default
				if (name.namespace === "base") {
					// Try to remove from each namespace
					for (const namespace in this.callbacks) {
						if (
							this.callbacks[namespace] instanceof Object &&
							this.callbacks[namespace][name.value] instanceof Array
						) {
							delete this.callbacks[namespace][name.value];

							// Remove namespace if empty
							if (Object.keys(this.callbacks[namespace]).length === 0)
								delete this.callbacks[namespace];
						}
					}
				}

				// Specified namespace
				else if (
					this.callbacks[name.namespace] instanceof Object &&
					this.callbacks[name.namespace][name.value] instanceof Array
				) {
					delete this.callbacks[name.namespace][name.value];

					// Remove namespace if empty
					if (Object.keys(this.callbacks[name.namespace]).length === 0)
						delete this.callbacks[name.namespace];
				}
			}
		});

		return this;
	}

	trigger(_name: string, _args?: any[]) {
		// Errors
		if (typeof _name === "undefined" || _name === "") {
			console.warn("wrong name");
			return false;
		}

		let finalResult: any = null;
		let result = null;

		// Default args
		const args = !(_args instanceof Array) ? [] : _args;

		// Resolve names (should on have one event)
		let nameArray = this.resolveNames(_name);

		// Resolve name
		let name = this.resolveName(nameArray[0]);

		// Default namespace
		if (name.namespace === "base") {
			// Try to find callback in each namespace
			for (const namespace in this.callbacks) {
				if (
					this.callbacks[namespace] instanceof Object &&
					this.callbacks[namespace][name.value] instanceof Array
				) {
					this.callbacks[namespace][name.value].forEach(
						(callback: Function) => {
							result = callback.apply(this, args);

							if (typeof finalResult === "undefined") {
								finalResult = result;
							}
						}
					);
				}
			}
		}

		// Specified namespace
		else if (this.callbacks[name.namespace] instanceof Object) {
			if (name.value === "") {
				console.warn("wrong name");
				return this;
			}

			this.callbacks[name.namespace][name.value].forEach(
				(callback: Function) => {
					result = callback.apply(this, args);

					if (typeof finalResult === "undefined") finalResult = result;
				}
			);
		}

		return finalResult;
	}

	resolveNames(_names: string) {
		let names: string | string[] = _names;
		names = names.replace(/[^a-zA-Z0-9 ,/.]/g, "");
		names = names.replace(/[,/]+/g, " ");
		names = names.split(" ");

		return names;
	}

	resolveName(name: string) {
		const newName: Partial<Name> = {};
		const parts = name.split(".");

		newName.original = name;
		newName.value = parts[0];
		newName.namespace = "base"; // Base namespace

		// Specified namespace
		if (parts.length > 1 && parts[1] !== "") {
			newName.namespace = parts[1];
		}

		return newName as Name;
	}
}
