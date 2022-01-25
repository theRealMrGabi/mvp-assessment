import { FC } from "react";
import Image, { ImageProps } from "next/image";
import {
	AnalyticsIcon,
	GridIcon,
	PowerIcon,
	ReportIcon,
	WalletIcon,
} from "@assets";
import Link from "next/link";

export const Sidebar: FC = () => {
	return (
		<div className="flex flex-col gap-y-5">
			{routes.map((item, i) => (
				<NavLink key={i} image={item.image} altText={item.altText} />
			))}
		</div>
	);
};

const routes = [
	{ image: AnalyticsIcon, altText: "Analytics" },
	{ image: GridIcon, altText: "Grid" },
	{ image: WalletIcon, altText: "Wallet" },
	{ image: ReportIcon, altText: "Report" },
	{ image: PowerIcon, altText: "Power" },
];

type NavlinkProps = {
	image: ImageProps;
	altText: string;
};

const NavLink: FC<NavlinkProps> = ({ image = AnalyticsIcon, altText }) => {
	return (
		<Link href="#">
			<a>
				<Image src={image} alt={altText} />
			</a>
		</Link>
	);
};
