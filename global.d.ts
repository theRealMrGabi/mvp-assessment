interface MetaProps {
	title?: string;
	keywords?: string;
	description?: string;
}

interface IUser {
	email: string;
	firstName: string;
	lastName: string;
	userId: string;
}

interface IReportParams {
	from: string;
	to: string;
	projectId: string;
	gatewayId: string;
}

interface IReportsData {
	amount: number;
	created: string;
	gatewayId: string;
	modified: string;
	paymentId: string;
	projectId: string;
	userIds: [];
}
[];
