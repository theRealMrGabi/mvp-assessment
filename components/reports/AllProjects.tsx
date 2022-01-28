import { FC, useCallback } from "react";
import { useDataSourceContext, useReportsContext } from "@contexts";
import { Table } from "@components";
import { formatNumber } from "@utils";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const AllProjects: FC = () => {
	const { projects, generateReport } = useDataSourceContext();
	const { reports } = useReportsContext();

	const filterData = useCallback(
		(projectId: string) => {
			const filter = reports?.filter(
				(item: IReportsData) => item.projectId === projectId
			);
			return filter;
		},
		[reports]
	);

	const transformData = (projectId: string) => {
		const filter = filterData(projectId).map((item: IReportsData, i) => {
			const data = {
				date: item.created,
				gateway: `Gateway ${item.gatewayId}`,
				transactionID: item.paymentId,
				amount: item.amount,
			};
			return data;
		});
		return filter;
	};

	const reduceTotalAmount = (reports: never[]) => {
		const data = reports?.reduce(
			(accumulator: number, current: IReportsData) =>
				accumulator + current.amount,
			0
		);
		return formatNumber(data);
	};

	const reduceIndividualPrice = (id: string) => {
		const data = filterData(id).reduce(
			(accumulator: number, current: IReportsData) =>
				accumulator + current.amount,
			0
		);
		return formatNumber(data);
	};

	const pieData = projects?.map((item: any) => {
		const data = {
			name: item.name,
			value: parseInt(reduceIndividualPrice(item.projectId)),
		};
		return data;
	});

	return (
		<div className="flex w-full flex-col-reverse gap-y-4 md:flex-row md:gap-x-6 md:gap-y-0">
			<div className={generateReport ? "w-full md:w-3/5" : "w-full"}>
				<div className="rounded-xl bg-base-light-blue-100 p-4">
					<p className="font-semibold text-base-black-100">
						All projects | All gateways
					</p>

					<div className="mt-8 flex flex-col gap-y-3">
						{projects?.map((item: any) => (
							<details key={item.projectId}>
								<summary className="flex cursor-pointer justify-between rounded-xl bg-white p-4 font-medium text-base-black-100">
									<p>{item.name}</p>
									<p>TOTAL: {reduceIndividualPrice(item.projectId)} USD</p>
								</summary>

								<div className="ml-2 pt-4">
									<Table
										header={TableHeader}
										data={transformData(item.projectId)}
									/>
								</div>
							</details>
						))}
					</div>
				</div>

				<div className="mt-4 rounded-xl bg-base-light-blue-100 p-3 font-semibold text-base-black-100">
					TOTAL: {reduceTotalAmount(reports)} USD
				</div>
			</div>

			<div className={generateReport ? "w-full md:w-2/5" : "hidden"}>
				<div className="flex gap-x-4 p-3">
					<div className="flex items-center gap-x-3">
						<div className="h-4 w-4 rounded bg-[#A259FF]"></div>
						<p className="text-sm text-base-black-100">Project 1</p>
					</div>

					<div className="flex items-center gap-x-3">
						<div className="h-4 w-4 rounded bg-[#F24E1E]"></div>
						<p className="text-sm text-base-black-100">Project 2</p>
					</div>
				</div>

				{/* Pie chart */}
				<div className="h-[75%] w-full">
					<div className="h-full w-full">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart width={800} height={400}>
								<Pie
									data={pieData}
									cx="50%"
									cy="50%"
									innerRadius={50}
									outerRadius={100}
									fill="#8884d8"
									paddingAngle={0}
									dataKey="value"
									label={renderCustomizedLabel}
								>
									{pieData.map((_entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>
				{/* Pie chart */}

				<div className="rounded-xl bg-base-light-blue-100 p-3 font-semibold text-base-black-100">
					GATEWAY TOTAL | {reduceTotalAmount(reports)} USD
				</div>
			</div>
		</div>
	);
};

const TableHeader = [
	{
		title: "Date",
		key: "date",
	},
	{ title: "Gateway", key: "gateway" },
	{ title: "Transaction ID", key: "transactionID" },
	{
		title: "Amount",
		key: "amount",
		component: (item: any) => <div>{formatNumber(item?.data?.amount)} USD</div>,
	},
];

const COLORS = ["#A259FF", "#F24E1E", "#FFC107", "#6497B1"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
}: any) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};
