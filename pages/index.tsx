import { FC } from "react";
import {
	Layout,
	Button,
	Input,
	Select,
	EmptyScreen,
	AllProjects,
	LoadingSpinner,
} from "@components";
import { useDataSourceContext, useReportsContext } from "@contexts";

const Home: FC = () => {
	const {
		projects,
		gateways,
		projectLoading,
		gatewaysLoading,
		setGenerateReport,
	} = useDataSourceContext();
	const { reports, reportLoading, handleParamsChange, handleSelect } =
		useReportsContext();

	const projectOptions = projects?.map((item: any) => {
		const data = {
			value: item.projectId,
			label: item.name,
		};
		return data;
	});

	const gatewayOptions = gateways?.map((item: any) => {
		const data = {
			value: item.gatewayId,
			label: item.name,
		};
		return data;
	});

	return (
		<Layout title="Reports | MVP Test">
			<div className="">
				<div className="flex flex-col items-start justify-between xl:flex-row xl:items-center">
					<div>
						<h3 className="text-2xl font-bold text-base-black-100">Reports</h3>
						<p className="font-medium text-base-gray-200">
							Easily generate a report of your transactions
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-y-0 gap-x-3 md:gap-y-0 lg:flex-nowrap lg:gap-x-5">
						<div>
							<Select
								options={projectOptions}
								placeholder="All projects"
								name="projectId"
								disabled={projectLoading}
								onChange={({ value }: any) =>
									handleSelect({ name: "projectId", value })
								}
							/>
						</div>

						<div>
							<Select
								options={gatewayOptions}
								placeholder="All gateways"
								name="gatewayId"
								disabled={gatewaysLoading}
								onChange={({ value }: any) =>
									handleSelect({ name: "gatewayId", value })
								}
							/>
						</div>

						<div>
							<Input
								type="date"
								name="from"
								placeholder="From date"
								label="From Date"
								onChange={handleParamsChange}
							/>
						</div>

						<div>
							<Input
								type="date"
								name="to"
								placeholder="To date"
								label="To Date"
								onChange={handleParamsChange}
							/>
						</div>

						<div className="pt-6">
							<Button
								text="Generate report"
								onClick={() => setGenerateReport((value) => !value)}
							/>
						</div>
					</div>
				</div>

				<div className="mt-6">
					{reportLoading ? (
						<div className="grid h-[40vh] place-content-center md:h-[60vh]">
							<LoadingSpinner />
						</div>
					) : !!reports?.length ? (
						<AllProjects />
					) : (
						<EmptyScreen />
					)}
				</div>

				<div className={!!reports?.length ? "mt-10 mb-6" : "absolute bottom-5"}>
					<a href="#" className="mb-auto font-bold text-base-blue-100">
						Terms &#38; Conditions | Privacy policy
					</a>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
