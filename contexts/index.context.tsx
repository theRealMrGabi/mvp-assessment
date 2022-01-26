import { DataSourceProvider, ReportsProvider } from "@contexts";

export const Provider = ({ children }: JSX.ElementChildrenAttribute) => {
	return (
		<DataSourceProvider>
			<ReportsProvider>{children}</ReportsProvider>
		</DataSourceProvider>
	);
};
