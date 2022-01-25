import { FC } from "react";
import styles from "./Table.module.scss";

interface TableProps {
	header: any;
	data?: any;
	loading?: boolean;
	error?: null;
}

export const Table: FC<TableProps> = ({ header, data, loading, error }) => {
	return (
		<div className={`${styles.tableCont} overflow-x-scroll`}>
			<table className={styles.table} data-testid="table-component">
				<thead>
					<tr>
						{header?.map((item: any, i: number) => (
							<th key={i}>{item?.title}</th>
						))}
					</tr>
				</thead>

				{Boolean(data?.length) && (
					<tbody className="t-body bg-base-white-200">
						{data.map((data: any, i: number) => (
							<tr key={data.id || i}>
								{header.map((item: any, i: number) =>
									item.component ? (
										<td key={i}>
											{item.component({ item: data[item.key], data })}
										</td>
									) : (
										<td key={i}>{data[item.key]}</td>
									)
								)}
							</tr>
						))}
					</tbody>
				)}

				{!Boolean(data?.length) && (
					<tbody className={`h-full w-full ${styles.emptyCont}`}>
						<tr>
							<td>
								{loading ? (
									<div className="bolder mt-3 text-center">
										Loading Data ...
									</div>
								) : (
									<div className="bolder text-center">No Data Available</div>
								)}
							</td>
						</tr>
						{error && <div className="items-center">{error}</div>}
					</tbody>
				)}
			</table>
		</div>
	);
};
