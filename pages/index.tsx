import { FC } from "react";
import { useQuery } from "react-query";
import { apiService } from "@services/apiService";
import {
	Layout,
	Button,
	Input,
	Select,
	EmptyScreen,
	AllProjects,
} from "@components";

const Home: FC = () => {
	const { data: projects, isLoading: projectLoading } = useQuery({
		queryKey: "projects",
		queryFn: () => apiService.get(`projects`),
		refetchOnWindowFocus: false,
	});

	const { data: gateways, isLoading: gatewaysLoading } = useQuery({
		queryKey: "gateways",
		queryFn: () => apiService.get(`gateways`),
		refetchOnWindowFocus: false,
	});

	const projectOptions = projects?.map((item: any) => {
		const data = {
			value: item.projectId,
			label: item.name,
		};
		return data;
	});

	const gatewayOptions = gateways?.map((item: any) => {
		const data = {
			value: item.projectId,
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
								name="projects"
								disabled={projectLoading}
							/>
						</div>

						<div>
							<Select
								options={gatewayOptions}
								placeholder="All gateways"
								name="gateways"
								disabled={gatewaysLoading}
							/>
						</div>

						<div>
							<Input
								type="date"
								name="fromDate"
								placeholder="From date"
								label="From Date"
							/>
						</div>

						<div>
							<Input
								type="date"
								name="toDate"
								placeholder="To date"
								label="To Date"
							/>
						</div>

						<div className="pt-6">
							<Button text="Generate report" />
						</div>
					</div>
				</div>

				<div className="mt-6">
					{/* <EmptyScreen /> */}
					<AllProjects />
				</div>

				<div className="mt-10 mb-6">
					<a href="#" className="mb-auto font-bold text-base-blue-100">
						Terms &#38; Conditions | Privacy policy
					</a>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
