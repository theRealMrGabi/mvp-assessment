import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Meta, ErrorUI, Sidebar, Header } from "@components";

export const Layout: FC<MetaProps> = ({
	children,
	title,
	keywords,
	description,
}) => {
	return (
		<ErrorBoundary FallbackComponent={ErrorUI}>
			<Meta title={title} keywords={keywords} description={description} />
			<header>
				<Header />
			</header>

			<div className="flex w-full pt-5 md:gap-x-4 md:pt-10 lg:gap-x-3 xl:gap-x-5">
				<nav className="hidden pl-8 md:block md:w-[10%] lg:w-[8%] xl:w-[5%] 2xl:w-[3%]">
					<Sidebar />
				</nav>

				<main className="w-full px-2 md:w-[90%] md:px-0 md:pr-[1.7rem] lg:w-[92%] lg:pr-[5.7rem] xl:w-[95%]">
					{children}
				</main>
			</div>
		</ErrorBoundary>
	);
};
