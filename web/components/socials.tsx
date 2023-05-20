import { Icons } from "./icons";
import { siteConfig } from "@config/site";

const SocialNav = ({ className }: { className?: string }) => {
	return (
		<div className={`flex items-center md:gap-1 text-gray-700 ${className}`}>
			<a href={siteConfig.links.github} target="_blank" rel="noreferrer">
				<Icons.github className="h-10 w-10 p-2 rounded-lg hover:text-black border border-transparent hover:border-zinc-200 fill-current" />

				<span className="sr-only">GitHub</span>
			</a>

			<a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
				<Icons.twitter className="h-10 w-10 p-2 rounded-lg hover:text-black border border-transparent hover:border-zinc-200 fill-current" />

				<span className="sr-only">Twitter</span>
			</a>

			<a href={siteConfig.links.discord} target="_blank" rel="noreferrer">
				<Icons.discord className="h-10 w-10 p-2 rounded-lg hover:text-black border border-transparent hover:border-zinc-200 fill-current" />

				<span className="sr-only">Discord</span>
			</a>
		</div>
	);
};

export default SocialNav;
