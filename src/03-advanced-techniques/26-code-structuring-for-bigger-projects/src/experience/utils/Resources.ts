import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { Source } from "../sources";
import EventEmitter from "./EventEmitter";

export default class Resourses extends EventEmitter {
	sources: Source[];
	items: any;
	toLoad: number;
	loaded: number;

	loaders?: any;

	constructor(sources: Source[]) {
		/**
		 * Call the EventEmitter constructor
		 */
		super();

		this.sources = sources;

		this.items = {}; // { name: file }
		this.toLoad = this.sources.length;
		this.loaded = 0;

		this.setLoaders();

		this.startLoading();
	}

	setLoaders() {
		this.loaders = {
			gltfLoader: new GLTFLoader(),
			textureLoader: new THREE.TextureLoader(),
			cubeTextureLoader: new THREE.CubeTextureLoader(),
		};
	}

	startLoading() {
		for (const src of this.sources) {
			if (src.type === "gltfModel")
				this.loaders.gltfLoader.load(src.path, (gltf: GLTF) => {
					this.sourceLoaded(src, gltf);
				});
			else if (src.type === "texture")
				this.loaders.textureLoader.load(src.path, (texture: THREE.Texture) => {
					this.sourceLoaded(src, texture);
				});
			else if (src.type === "cubeTexture")
				this.loaders.cubeTextureLoader.load(
					src.path,
					(texture: THREE.CubeTexture) => {
						this.sourceLoaded(src, texture);
					}
				);
		}
	}

	sourceLoaded(source: Source, file: GLTF | THREE.Texture | THREE.CubeTexture) {
		this.items[source.name] = file;
		this.loaded++;

		if (this.loaded === this.toLoad) {
			/**
			 * Emit the ready event when all the files are loaded
			 */
			this.trigger("ready");
		}
	}
}
