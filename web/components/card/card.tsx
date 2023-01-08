import Tile from "./tile";
import Lectures from "./lectures";

interface CardProps {
	name: string;
	index: string;
	classes: string;
	description: string;
}

const Card = ({ name, index, classes, description }: CardProps) => {
	return (
		<div className="bg-gray-100 rounded-2xl my-5 p-5 shadow-2xl md:p-14">
			<h4 className="text-3xl font-bold">{index}</h4>
			<h3 className={`${classes} text-4xl font-bold`}>{name}</h3>
			<p className="p-2 text-slate-700 font-bold italic">{description}</p>
			<ul className="divide-y-2 divide-gray-300 divide-dashed">
				{Lectures[index]?.map((lecture, index) => (
					<Tile
						key={index}
						index={lecture.index}
						name={lecture.name}
						href={lecture.href}
						classes={classes}
					/>
				))}
			</ul>
		</div>
	);
};

export default Card;
