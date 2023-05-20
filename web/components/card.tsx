import React from "react";

import Tile from "./tile";
import { lectures } from "config/lectures";

interface CardProps {
	name: string;
	index: string;
	description: string;
	className: string;
}

const Card = ({ name, index, className, description }: CardProps) => {
	return (
		<div className="bg-gray-100 rounded-2xl my-5 p-5 shadow-2xl md:p-14">
			<h4 className="text-3xl font-bold">{index}</h4>

			<h3 className={`text-4xl font-bold ${className}`}>{name}</h3>

			<p className="p-2 text-slate-700 font-bold italic">{description}</p>

			<ul className="divide-y-2 divide-gray-300 divide-dashed">
				{lectures[index]?.map((lecture, index) => (
					<Tile
						key={index}
						index={lecture.index}
						name={lecture.name}
						href={lecture.href}
						className={className}
					/>
				))}
			</ul>
		</div>
	);
};

export default Card;
