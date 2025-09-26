import axiosClient from "./axiosClient";
import APIError from "./APIError";
import { Method, AxiosRequestConfig, AxiosProgressEvent, ResponseType } from "axios";

export interface HeaderObj {
  Authorization?: string;
  [key: string]: any;
}

export interface IAPICallConfig {
  route: string;
  method: Method;
  body?: object | FormData;
  query?: object;
  header?: HeaderObj;
  isSecureRoute?: boolean;
  responseType?: ResponseType;
  onUploadProgress?: (event: AxiosProgressEvent) => void;
}

const makeCall = async (config: IAPICallConfig) => {
  try {
    const axiosConfig: AxiosRequestConfig = {
      url: config.route,
      method: config.method,
      params: config.query,
      data: config.body,
      headers: { ...config.header },
      responseType: config.responseType || "json",
      onUploadProgress: config.onUploadProgress,
    };
    const response = await axiosClient(axiosConfig);
    return response.data;
  } catch (error: any) {
    if (error instanceof APIError) throw error;
    if (error.response) {
      throw new APIError(
        error.response.data?.message || error.message,
        error.response.status,
        error.response.data?.error
      );
    }
    throw new APIError(error.message || "Network error");
  }
};

export default makeCall;