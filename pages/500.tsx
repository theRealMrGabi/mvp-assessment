import { FC } from "react";
import { ErrorUI } from "@components";
import { ErrorBoundary } from "react-error-boundary";

const Error500: FC = () => {
	return (
		<ErrorBoundary FallbackComponent={ErrorUI}>
			<ErrorUI />
		</ErrorBoundary>
	);
};

export default Error500;
