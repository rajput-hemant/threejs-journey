import * as THREE from "three";

import Experience from "../Experience";
import Debug from "../utils/Debug";
import Resources from "../utils/Resources";
import Time from "../utils/Time";

export default class Fox {
	experience: Experience;
	scene: THREE.Scene;
	resources: Resources;
	model?: THREE.Group;
	resource: any;
	animation: any = {};
	time?: Time;
	debug?: Debug;
	debugFolder?: dat.GUI;

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene!;
		this.resources = this.experience.resources!;
		this.time = this.experience.time;
		this.debug = this.experience.debug;

		// Debug
		if (this.debug?.active) {
			this.debugFolder = this.debug.ui!.addFolder("fox");
		}

		// Setup
		this.resource = this.resources.items.foxModel;

		this.setModel();
		this.setAnimation();
	}

	setModel() {
		this.model = this.resource.scene;
		this.model!.scale.set(0.02, 0.02, 0.02);

		this.scene.add(this.model!);

		this.model!.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
			}
		});
	}

	setAnimation() {
		this.animation.mixer = new THREE.AnimationMixer(this.model!);

		this.animation.actions = {};

		this.animation.actions.survey = this.animation.mixer.clipAction(
			this.resource.animations[0]
		);
		this.animation.actions.walk = this.animation.mixer.clipAction(
			this.resource.animations[1]
		);
		this.animation.actions.run = this.animation.mixer.clipAction(
			this.resource.animations[2]
		);

		this.animation.actions.current = this.animation.actions.survey;
		this.animation.actions.current.play();

		this.animation.play = (name: string) => {
			const newAction = this.animation.actions[name];
			const currentAction = this.animation.actions.current;
			newAction.reset();
			newAction.play();
			newAction.crossFadeFrom(currentAction, 0.5, true);

			this.animation.actions.current = newAction;
		};

		// Debug
		if (this.debug?.active) {
			const debugObject = {
				survey: () => this.animation.play("survey"),
				walk: () => this.animation.play("walk"),
				run: () => this.animation.play("run"),
			};

			this.debugFolder!.add(debugObject, "survey");
			this.debugFolder!.add(debugObject, "walk");
			this.debugFolder!.add(debugObject, "run");
		}
	}

	update() {
		this.animation.mixer.update(this.time!.delta * 0.001);
	}
}
