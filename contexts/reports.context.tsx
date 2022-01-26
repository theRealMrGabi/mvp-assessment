import {
	createContext,
	useContext,
	useMemo,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";
import { useMutation } from "react-query";
import { apiService } from "@services/apiService";

interface ReportsContextProps {
	reports: never[];
	setReports: Dispatch<SetStateAction<never[]>>;
	reportParams: IReportParams;
	setReportParams: Dispatch<SetStateAction<IReportParams>>;
	reportLoading: boolean;
	handleParamsChange: (
		e: React.ChangeEvent<HTMLInputElement | undefined>
	) => void;
	handleSelect: ({ name, value }: SelectProps) => void;
}

interface SelectProps {
	name: string;
	value: string;
}

export const ReportsContext = createContext<ReportsContextProps | undefined>(
	undefined
);

export const ReportsProvider = ({ children }: JSX.ElementChildrenAttribute) => {
	const { Provider } = ReportsContext;

	const [reports, setReports] = useState([]);
	const [reportParams, setReportParams] = useState<IReportParams>({
		from: "",
		to: "",
		projectId: "",
		gatewayId: "",
	});

	const fetchReport = async () => {
		const response = await apiService.post({
			url: "report",
			payload: reportParams,
		});
		return response;
	};

	const { isLoading: reportLoading, mutate } = useMutation(fetchReport, {
		onSuccess: (res: any) => {
			setReports(res?.data);
		},
	});

	const handleParamsChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | undefined>) => {
			const { name, value } = e.target;
			setReportParams({
				...reportParams,
				[name]: value,
			});
		},
		[reportParams]
	);

	const handleSelect = useCallback(
		({ name, value }: any) => {
			setReportParams({
				...reportParams,
				[name]: value,
			});
		},
		[reportParams]
	);

	useEffect(() => {
		//@ts-ignore
		mutate(reportParams);
	}, [mutate, reportParams]);

	const value = useMemo(
		() => ({
			reports,
			setReports,
			reportParams,
			setReportParams,
			reportLoading,
			handleParamsChange,
			handleSelect,
		}),
		[
			reports,
			setReports,
			reportParams,
			setReportParams,
			reportLoading,
			handleParamsChange,
			handleSelect,
		]
	);

	return <Provider value={value}>{children}</Provider>;
};

export const useReportsContext = () => {
	const context = useContext(ReportsContext);
	if (!context) {
		throw new Error("Context must be provided");
	}
	return context;
};
