export interface Source {
	name: string;
	type: string;
	path: string | string[];
}

const type = {
	texture: "texture",
	cubeTexture: "cubeTexture",
	gltfModel: "gltfModel",
};

// export interface Sources extends Array<Source> {}

const sources: Source[] = [
	{
		name: "environmentMap",
		type: type.cubeTexture,
		path: [
			"/textures/environmentMaps/0/px.jpg",
			"/textures/environmentMaps/0/nx.jpg",
			"/textures/environmentMaps/0/py.jpg",
			"/textures/environmentMaps/0/ny.jpg",
			"/textures/environmentMaps/0/pz.jpg",
			"/textures/environmentMaps/0/nz.jpg",
		],
	},
	{
		name: "FlightHelmet",
		type: type.gltfModel,
		path: "/models/FlightHelmet/glTF/FlightHelmet.gltf",
	},
];

export default sources;
