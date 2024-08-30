import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Utility function to construct API endpoints
function endPoint(endpoint: string): string {
  return `/api/${endpoint}`;
}

// Endpoints
export const API = {
  USER: endPoint("user/"),
  API_CHAT_SOCKET: endPoint("chat/"),
  API_AUTH_LOGIN: endPoint("auth/signin"),
  API_AUTH_SIGNUP: endPoint("auth/signup"),
};

// Type definitions for the request and options
interface ApiCallOptions {
  id?: string;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

export async function apiCallAxios(
  request: AxiosRequestConfig
): Promise<AxiosResponse> {
  console.log(
    `apiCallAxios: ${request.url}, method: ${request.method}, params: ${request.params}`
  );
  const start = Date.now();
  const response = await axios.request(request);
  const timeTaken = Date.now() - start;
  console.log(
    `apiCallAxios: url: ${request.url}. method: ${request.method}. Time taken: ${timeTaken}ms`
  );
  return response;
}

export async function apiCall(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: ApiCallOptions,
  controller?: AbortController
): Promise<AxiosResponse> {
  let finalEndpoint = endpoint;
  try {
    const request: AxiosRequestConfig = {
      method: method,
      url: "http://localhost:3000" + finalEndpoint,
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        "Content-Type": "application/json",
      },
      params: options?.params,
      data: options?.data,
      signal: controller?.signal, // Optional abort controller for cancelling requests
    };

    console.log(request);

    const res = await apiCallAxios(request);
    if (res.status < 200 || res.status >= 300) {
      if (res.status === 401) {
        // Handle unauthorized access
      }
      throw new Error(`apiCallAxios failed with status: ${res.status}`);
    }
    return res;
  } catch (error: any) {
    if (error.response?.data?.apiError) {
      if (error.response.data.apiError.status === 401) {
        // Handle specific 401 status
      }
    //   //throw new HttpApiError(
    //     error.response.data.apiError.status,
    //     `HttpApiError:${error.response.data.apiError.status} ${finalEndpoint}: (${error.message})`,
    //     error.response.data.apiError.errorCode
    //   );
    }
    throw error;
  }
}