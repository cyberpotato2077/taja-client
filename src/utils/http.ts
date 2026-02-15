import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

interface CustomAxiosInstance extends AxiosInstance {
	getUri(config?: AxiosRequestConfig): string;
	request<T>(config: AxiosRequestConfig): Promise<T>;
	get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
	delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
	head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
	options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

// In-memory token storage
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
	accessToken = token;
}

export function getAccessToken() {
	return accessToken;
}

const axiosInstance: CustomAxiosInstance = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

// Request interceptor - attach Authorization header
axiosInstance.interceptors.request.use((config) => {
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

// Token refresh queue for concurrent 401 handling
let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value: unknown) => void;
	reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
	for (const { resolve, reject } of failedQueue) {
		if (error) {
			reject(error);
		} else {
			resolve(undefined);
		}
	}
	failedQueue = [];
};

// Response interceptor - extract data & handle 401 token refresh
axiosInstance.interceptors.response.use(
	(response) => response.data,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.status === 401 &&
			// biome-ignore lint/suspicious/noExplicitAny: flag to prevent infinite retry
			!(originalRequest as any)._retry &&
			originalRequest.url !== "/auth/token"
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				}).then(() => axiosInstance(originalRequest));
			}

			// biome-ignore lint/suspicious/noExplicitAny: flag to prevent infinite retry
			(originalRequest as any)._retry = true;
			isRefreshing = true;

			try {
				const data = await axiosInstance.post<{ accessToken: string }>(
					"/auth/token",
					{},
				);
				setAccessToken(data.accessToken);
				processQueue(null);
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError);
				setAccessToken(null);
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

export const http = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	get: <T>(url: string, params?: Record<string, any>) => {
		return axiosInstance.get<T>(url, { params });
	},
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	post: <T>(url: string, data: any) => {
		return axiosInstance.post<T>(url, data);
	},
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	patch: <T>(url: string, data: any) => {
		return axiosInstance.patch<T>(url, data);
	},
	delete: <T>(url: string) => {
		return axiosInstance.delete<T>(url);
	},
};
