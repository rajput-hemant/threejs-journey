export interface Source {
	name: string;
	type: string;
	path: string | string[];
}

// export interface Sources extends Array<Source> {}

const sources: Source[] = [
	{
		name: "mapTexture",
		type: "texture",
		path: "models/LeePerrySmith/color.jpg",
	},
	{
		name: "normalTexture",
		type: "texture",
		path: "/models/LeePerrySmith/normal.jpg",
	},
	{
		name: "leePerrySmith",
		type: "gltfModel",
		path: "/models/LeePerrySmith/LeePerrySmith.glb",
	},
	{
		name: "environmentMapTexture",
		type: "cubeTexture",
		path: [
			"/textures/environmentMaps/0/px.jpg",
			"/textures/environmentMaps/0/nx.jpg",
			"/textures/environmentMaps/0/py.jpg",
			"/textures/environmentMaps/0/ny.jpg",
			"/textures/environmentMaps/0/pz.jpg",
			"/textures/environmentMaps/0/nz.jpg",
		],
	},
];

export default sources;
