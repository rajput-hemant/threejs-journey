import Logo from "../../public/logo";
import LogoText from "../../public/logo-text";

const Navbar = () => {
	return (
		<nav className="px-4 pt-4 pb-2 fixed w-full top-0 left-0 bg-blue-sm backdrop-blur-sm">
			<div className="flex justify-center items-center gap-2 md:justify-start">
				<Logo />
				<LogoText />
			</div>
		</nav>
	);
};

export default Navbar;
