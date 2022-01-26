import cogoToast from "cogo-toast";

export const showToast = (
	message: string,
	type: "success" | "info" | "loading" | "warn" | "error"
) => {
	switch (type) {
		case "success":
			cogoToast.success(message, { position: "top-right", hideAfter: 5 });
			break;
		case "info":
			cogoToast.info(message, { position: "top-right", hideAfter: 5 });
			break;
		case "loading":
			cogoToast.loading(message, { position: "top-right", hideAfter: 5 });
			break;
		case "warn":
			cogoToast.warn(message, { position: "top-right", hideAfter: 5 });
			break;
		case "error":
			cogoToast.error(message, { position: "top-right", hideAfter: 5 });
			break;

		default:
			cogoToast.info(message, { position: "top-right", hideAfter: 5 });
			break;
	}
};

export const getNameInitials = (user: IUser) => {
	const firstNameInitial = user?.firstName.charAt(0);
	const lastNameInitial = user?.lastName.charAt(0);
	return `${firstNameInitial}${lastNameInitial}`;
};

export const formatNumber = (value: number) =>
	new Intl.NumberFormat().format(value);
