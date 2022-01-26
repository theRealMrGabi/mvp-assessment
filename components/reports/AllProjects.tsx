import { FC, useState, useCallback } from "react";
import { useDataSourceContext, useReportsContext } from "@contexts";
import { Table } from "@components";
import { formatNumber } from "@utils";

export const AllProjects: FC = () => {
	const { projects } = useDataSourceContext();
	const { reports } = useReportsContext();

	const filterData = useCallback(
		(projectId: string) => {
			const filter = reports?.filter(
				(item: IReportsData) => item.projectId !== projectId
			);
			return filter;
		},
		[reports]
	);

	const transformData = (projectId: string) => {
		const filter = filterData(projectId).map((item: IReportsData, i) => {
			const data = {
				date: item.created,
				gateway: `Gateway ${i + 1}`,
				transactionID: item.gatewayId,
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

	return (
		<div>
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
	);
};

export const TableHeader = [
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
