import Head from "next/head";
import Navbar from "../navbar/navbar";

interface LayoutProps {
	children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Head>
				<title>Three.js Journey</title>
				<meta
					name="description"
					content="Track my journey of learning ThreeJS."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicons/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicons/favicon-16x16.png"
				/>
			</Head>
			<div className="bg-slate-100">
				<Navbar />
				<main className="pt-20 md:p-14 lg:px-20 xl:px-24 2xl:px-44">
					{children}
				</main>
			</div>
		</>
	);
};

export default Layout;
