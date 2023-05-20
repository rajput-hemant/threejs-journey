import Logo from "@components/logo";
import LogoText from "@components/logo-text";
import SocialNav from "./socials";

const Navbar = () => {
	return (
		<nav className="sticky h-16 flex justify-center md:justify-between px-4 w-full container md:h-20 border-b border-gray-200 inset-0 backdrop-blur">
			<div className="flex gap-2 items-center">
				<Logo />

				<LogoText />
			</div>

			<SocialNav className="hidden md:flex" />
		</nav>
	);
};

export default Navbar;
