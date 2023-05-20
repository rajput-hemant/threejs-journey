import { siteConfig } from "@config/site";
import SocialNav from "./socials";

const Footer = () => {
	return (
		<footer className="border-gray-200 text-gray-600 container flex flex-col items-center justify-center border-t py-1 text-sm lg:pb-2">
			<SocialNav />

			<span>Released under the MIT License.</span>

			<span className="flex items-center gap-1">
				Copyright © 2022-{new Date().getFullYear()}
				<a
					href={siteConfig.links.github}
					className="hover:text-black px-1 underline underline-offset-2"
				>
					rajput-hemant@github
				</a>
			</span>
		</footer>
	);
};

export default Footer;
