interface TileProps {
	index: string;
	name: string;
	href: string;
	classes: string;
}

const Tile = ({ href, index, name, classes }: TileProps) => {
	return (
		<li className="rounded-md p-4 my-3 shadow-lg text-lg font-medium active:translate-y-1">
			<a href={href} target="_blank" rel="noreferrer">
				<div className="flex truncate">
					<span className={`${classes} font-bold pr-2`}>{index}</span> {name}
				</div>
			</a>
		</li>
	);
};

export default Tile;
