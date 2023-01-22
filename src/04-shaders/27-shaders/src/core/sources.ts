export interface Source {
	name: string;
	type: string;
	path: string | string[];
}

// export interface Sources extends Array<Source> {}

const sources: Source[] = [];

export default sources;
