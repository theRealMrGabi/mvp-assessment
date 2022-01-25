import { FC } from "react";
import { Table } from "@components";

export const AllProjects: FC = () => {
	return (
		<div>
			<div className="rounded-xl bg-base-light-blue-100 p-4">
				<p className="font-semibold text-base-black-100">
					All projects | All gateways
				</p>

				<div className="mt-8 flex flex-col gap-y-3">
					{[...Array(5)].map((_item, i) => (
						<details key={i}>
							<summary className="flex cursor-pointer justify-between rounded-xl bg-white p-4 font-medium text-base-black-100">
								<p>Project 1</p>
								<p>TOTAL: 10,065 USD</p>
							</summary>

							<div className="ml-2 pt-4">
								<Table header={TableHeader} data={TableData} />
							</div>
						</details>
					))}
				</div>
			</div>

			<div className="mt-4 rounded-xl bg-base-light-blue-100 p-3 font-semibold text-base-black-100">
				TOTAL: 14,065 USD
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
	},
];

export const TableData = [
	{
		date: "01/21/2021",
		gateway: "Gateway 1",
		transactionID: "a732b",
		amount: "3964 USD",
	},
	{
		date: "01/21/2021",
		gateway: "Gateway 2",
		transactionID: "a732b",
		amount: "3964 USD",
	},
	{
		date: "01/21/2021",
		gateway: "Gateway 3",
		transactionID: "a732b",
		amount: "3964 USD",
	},
];
