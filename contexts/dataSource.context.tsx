import {
	createContext,
	useContext,
	useMemo,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";
import { useQuery } from "react-query";
import { apiService } from "@services/apiService";

interface DataSourceContextProps {
	projects: never[];
	setProjects: Dispatch<SetStateAction<never[]>>;
	gateways: never[];
	setGateways: Dispatch<SetStateAction<never[]>>;
	projectLoading: boolean;
	gatewaysLoading: boolean;
}

export const DataSourceContext = createContext<
	DataSourceContextProps | undefined
>(undefined);

export const DataSourceProvider = ({
	children,
}: JSX.ElementChildrenAttribute) => {
	const { Provider } = DataSourceContext;

	const [projects, setProjects] = useState([]);
	const [gateways, setGateways] = useState([]);

	const { data: projectsData, isLoading: projectLoading } = useQuery({
		queryKey: "projects",
		queryFn: () => apiService.get(`projects`),
		refetchOnWindowFocus: false,
	});

	const { data: gatewaysData, isLoading: gatewaysLoading } = useQuery({
		queryKey: "gateways",
		queryFn: () => apiService.get(`gateways`),
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		setProjects(projectsData);
		setGateways(gatewaysData);
	}, [projectsData, gatewaysData]);

	const value = useMemo(
		() => ({
			projects,
			setProjects,
			gateways,
			setGateways,
			projectLoading,
			gatewaysLoading,
		}),
		[
			projects,
			setProjects,
			gateways,
			setGateways,
			projectLoading,
			gatewaysLoading,
		]
	);

	return <Provider value={value}>{children}</Provider>;
};

export const useDataSourceContext = () => {
	const context = useContext(DataSourceContext);
	if (!context) {
		throw new Error("Context must be provided");
	}
	return context;
};
