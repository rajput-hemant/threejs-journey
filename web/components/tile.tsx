type TileProps = {
	index: string;
	name: string;
	href: string;
	className: string;
};

const Tile = ({ href, index, name, className }: TileProps) => {
	return (
		<li className="rounded-md p-4 my-3 shadow-lg text-lg font-medium hover:bg-gray-50 active:translate-y-1">
			<a href={href} target="_blank" rel="noreferrer">
				<div className="flex truncate">
					<span className={`font-bold pr-2 ${className}`}>{index}</span> {name}
				</div>
			</a>
		</li>
	);
};

export default Tile;
