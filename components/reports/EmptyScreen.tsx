import { FC } from "react";
import Image from "next/image";
import { EmptyReportsImg } from "@assets";

export const EmptyScreen: FC = () => {
	return (
		<div className="grid w-full place-items-center gap-y-2 lg:h-[70vh]">
			<div className="text-center">
				<h4 className="text-2xl font-bold text-base-black-100">No reports</h4>
				<p className="hidden pt-2 font-medium text-base-gray-200 md:block">
					Currently you have no data for the reports to be generated. <br />{" "}
					Once you start generating traffic through the Balance application{" "}
					<br /> the reports will be shown.
				</p>
				<div className="pt-10">
					<Image src={EmptyReportsImg} alt="No reports" />
				</div>
			</div>
		</div>
	);
};
