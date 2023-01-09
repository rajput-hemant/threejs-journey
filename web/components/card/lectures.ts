type Lectures = {
	[key: string]: {
		name: string;
		index: string;
		href: string;
	}[];
};

const lectures: Lectures = {
	"01": [
		{
			name: "Basics",
			index: "03",
			href: "https://basics-threejs-journey.vercel.app",
		},
		{
			name: "Transform Objects",
			index: "05",
			href: "https://transform-objects-threejs-journey.vercel.app",
		},
		{
			name: "Animations",
			index: "06",
			href: "https://animations-threejs-journey.vercel.app",
		},
		{
			name: "Camera",
			index: "07",
			href: "https://camera-threejs-journey.vercel.app",
		},
		{
			name: "Fullscreen and Rotation",
			index: "08",
			href: "https://fullscreen-and-resizing-threejs-journey.vercel.app",
		},
		{
			name: "Geometries",
			index: "09",
			href: "https://geometries-threejs-journey.vercel.app",
		},
		{
			name: "Debug UI",
			index: "10",
			href: "https://debug-ui-threejs-journey.vercel.app",
		},
		{
			name: "Textures",
			index: "11",
			href: "https://textures-threejs-journey.vercel.app",
		},
		{
			name: "Materials",
			index: "12",
			href: "https://materials-threejs-journey.vercel.app",
		},
		{
			name: "3D Text",
			index: "13",
			href: "https://3d-text-threejs-journey.vercel.app",
		},
	],
	"02": [
		{
			name: "Lights",
			index: "15",
			href: "https://lights-threejs-journey.vercel.app",
		},
		{
			name: "Shadows",
			index: "16",
			href: "https://shadows-threejs-journey.vercel.app",
		},
		{
			name: "Haunted House",
			index: "17",
			href: "https://haunted-house-threejs-journey.vercel.app",
		},
	],
};

export default lectures;
