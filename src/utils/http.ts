import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { match } from "ts-pattern";
import { getMSWState } from "./msw-toggle";
import { getOperation } from "./operations";

// 백엔드 API 공통 응답 형식
type ApiResponse<T> = {
	code: string;
	message: string;
	data: T;
};

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

// Token storage with localStorage persistence
const TOKEN_STORAGE_KEY = "taja_access_token";

// Initialize token from localStorage on module load
let accessToken: string | null = null;

// Initialize token from localStorage
try {
	const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
	if (storedToken) {
		accessToken = storedToken;
	}
} catch (error) {
	console.error("Failed to load token from localStorage:", error);
}

// Subscriber pattern for reactive token updates
type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribeToToken(listener: Listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function setAccessToken(token: string | null) {
	accessToken = token;

	// Persist to localStorage
	try {
		if (token) {
			localStorage.setItem(TOKEN_STORAGE_KEY, token);
		} else {
			localStorage.removeItem(TOKEN_STORAGE_KEY);
		}
	} catch (error) {
		console.error("Failed to save token to localStorage:", error);
	}

	// Notify all subscribers when token changes
	for (const listener of listeners) {
		listener();
	}
}

export function getAccessToken() {
	return accessToken;
}

// baseURL을 동적으로 결정하는 함수
function getBaseURL() {
	return match(getOperation())
		.with("local", () => "/api")
		.with("live", () => {
			// MSW가 켜져 있으면 /api 사용 (MSW가 가로챔)
			// MSW가 꺼져 있으면 실제 서버 주소 사용
			return getMSWState() ? "/api" : "https://taja.myvnc.com:8888";
		})
		.exhaustive();
}

const axiosInstance: CustomAxiosInstance = axios.create({
	withCredentials: true,
});

// Request interceptor - attach Authorization header & set baseURL dynamically
axiosInstance.interceptors.request.use((config) => {
	// 매 요청마다 baseURL을 동적으로 설정 (MSW 토글 대응)
	config.baseURL = getBaseURL();

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
	(response) => {
		// 백엔드 API 응답 형식: {code, message, data}에서 data만 추출
		const apiResponse = response.data as ApiResponse<unknown>;
		return apiResponse.data ?? response.data;
	},
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
				// data는 이미 interceptor에서 추출된 상태
				const token =
					typeof data === "object" && data !== null && "accessToken" in data
						? data.accessToken
						: null;
				if (token) {
					setAccessToken(token);
				}
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
