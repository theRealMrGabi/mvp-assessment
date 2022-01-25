import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { showToast } from "@utils";

const apiResource = () => {
	const baseURL = process.env.NEXT_PUBLIC_BASEURL!;

	const service = axios.create({
		baseURL: `${baseURL}`,
		withCredentials: false,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			// "Access-Control-Allow-Methods": "*",
			// "Access-Control-Allow-Origin": baseURL,
		},
	});

	service.interceptors.request.use((config: AxiosRequestConfig) => {
		return config;
	});

	service.interceptors.response.use(
		(response: AxiosResponse) => {
			return response?.data;
		},
		(error: AxiosError) => {
			if (error?.response === undefined)
				showToast("No internet connection", "error");
			else {
				const status = error?.response?.status;
				const errors = error?.response?.data;

				if (status === 404) {
					showToast("Resource not found", "error");
				}

				const errorMessage = errors?.error || errors?.message;

				if (errorMessage) {
					showToast(errorMessage, "error");
				}

				return Promise.reject(errors);
			}
		}
	);

	interface IPostProps {
		url: string;
		payload?: object;
	}

	return {
		get: async (url: string) => {
			try {
				const data = service.get(url);
				const resolvedData = await Promise.resolve(data);
				const exactData = resolvedData?.data;
				return exactData;
			} catch (error) {
				return Promise.reject(error);
			}
		},

		post: async ({ url, payload }: IPostProps) => {
			try {
				const data = service.post(url, payload);
				const resolvedData = await Promise.resolve(data);
				return resolvedData;
			} catch (error) {
				return Promise.reject(error);
			}
		},

		patch: async ({ url, payload }: IPostProps) => {
			try {
				const data = service.patch(url, payload);
				const resolvedData = await Promise.resolve(data);
				return resolvedData;
			} catch (error) {
				return Promise.reject(error);
			}
		},

		delete: async ({ url, payload }: IPostProps) => {
			try {
				const data = service.delete(url, payload);
				const resolvedData = await Promise.resolve(data);
				return resolvedData;
			} catch (error) {
				return Promise.reject(error);
			}
		},

		put: async ({ url, payload }: IPostProps) => {
			try {
				const data = service.put(url, payload);
				const resolvedData = await Promise.resolve(data);
				return resolvedData;
			} catch (error) {
				return Promise.reject(error);
			}
		},
	};
};

export const apiService = apiResource();
