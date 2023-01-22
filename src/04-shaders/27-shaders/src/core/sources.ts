export interface Source {
	name: string;
	type: string;
	path: string | string[];
}

// export interface Sources extends Array<Source> {}

const sources: Source[] = [
	{
		name: "flagTexture",
		type: "texture",
		path: "textures/indian-flag.png",
	},
];

export default sources;
