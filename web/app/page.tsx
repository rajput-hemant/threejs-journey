import Card from "@components/card";

const modules = [
	{
		index: "01",
		name: "Basic",
		className: "text-orange-500",
		description:
			"Create your first scene and understand fundamentals like cameras, geometries, materials, textures. Add a debug panel to tweak your environment and animate everything.",
	},
	{
		index: "02",
		name: "Classic Techniques",
		className: "text-sky-500",
		description:
			"Illuminate your scene with various lights, start practicing environment creation and create millions of particles.",
	},
	{
		index: "03",
		name: "Advance Techniques",
		className: "text-yellow-500",
		description:
			"Add physics to your world so that objects start to collide and stumble. Then import your own model made with Blender and make it look as realistic as possible.",
	},
	{
		index: "04",
		name: "Shaders",
		className: "text-violet-500",
		description:
			"Using Three.js materials is great but creating your own is even better. Learn the shader language to unleash the true power of WebGL and create stunning experiences!",
	},
	{
		index: "05",
		name: "Extra",
		className: "text-slate-600",
		description:
			"Once you know shaders, it's the opportunity to go even further and try new techniques. But it's also important to make sure your projects are working on most devices by monitoring and optimising performance.",
	},
	{
		index: "06",
		name: "Portal Scene",
		className: "text-lime-600",
		description:
			"Learn how to create a cool scene using Blender and discover the baking technique to get the best looking lights and shadows.",
	},
	{
		index: "07",
		name: "React Three Fibre",
		className: "text-indigo-500",
		description:
			"Did you know that Three.js integrates well in React? Thanks to React Three Fiber (R3F) you can create awesome Three.js experiences in React with just a few lines of code.",
	},
];

const Homepage = () => {
	return (
		<div className="lg:grid pt-6 lg:grid-cols-2 lg:gap-x-10">
			<h2 className="font-bold p-6 lg:p-16 from-indigo-400 text-2xl text-transparent leading-[10rem] tracking-wide text-center sm:text-3xl bg-clip-text via-indigo-600 mt-10 to-purple-800 bg-gradient-to-r md:text-4xl lg:text-7xl">
				Track my progress through the Three.js Journey course.
			</h2>

			{modules.map((module, index) => (
				<Card
					key={index}
					index={module.index}
					name={module.name}
					className={module.className}
					description={module.description}
				/>
			))}
		</div>
	);
};

export default Homepage;
