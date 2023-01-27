export interface Source {
	name: string;
	type: string;
	path: string | string[];
}

// export interface Sources extends Array<Source> {}

const sources: Source[] = [
	{
		name: "damagedHelmet",
		type: "gltfModel",
		path: "/models/DamagedHelmet/glTF/DamagedHelmet.gltf",
	},
	{
		name: "normalMap",
		type: "texture",
		path: "/textures/interfaceNormalMap.png",
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
