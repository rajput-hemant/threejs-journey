export interface Source {
	name: string;
	type: string;
	path: string | string[];
}

// export interface Sources extends Array<Source> {}

const sources: Source[] = [
	{
		name: "displacementTexture",
		type: "texture",
		path: "/textures/displacementMap.png",
	},
];

export default sources;
