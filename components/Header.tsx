import { FC } from "react";
import { BrandLogo, HamburgerIcon } from "@assets";
import Image from "next/image";
import { useQuery } from "react-query";
import { apiService } from "@services/apiService";
import { getNameInitials } from "@utils";

export const Header: FC = () => {
	const { data: users, isLoading } = useQuery({
		queryKey: "users",
		queryFn: () => apiService.get(`users`),
		refetchOnWindowFocus: false,
	});

	const user: IUser = users?.[0];

	return (
		<div className="flex items-center justify-between border-b border-base-gray-100 bg-white py-3 px-2 md:px-0 md:pl-8 md:pr-8 lg:pr-24">
			<div className="hidden items-center gap-x-8 md:flex">
				<div>
					<Image src={BrandLogo} alt="MVP Test" />
				</div>
				<div className="cursor-pointer">
					<Image src={HamburgerIcon} alt="Hamburger" />
				</div>
			</div>

			<div className="md:hidden">
				<Image src={HamburgerIcon} alt="Hamburger" />
			</div>

			<div className="md:hidden">
				<Image src={BrandLogo} alt="MVP Test" />
			</div>

			{user && (
				<div className="flex items-center gap-x-2">
					<div className="rounded bg-base-yellow-100 py-2 px-3 text-xl font-bold text-white">
						{getNameInitials(user) ?? ""}
					</div>
					<p className="hidden text-base font-semibold text-base-blue-100 md:block">
						{`${user?.firstName} ${user?.lastName}`}
					</p>
				</div>
			)}
		</div>
	);
};
