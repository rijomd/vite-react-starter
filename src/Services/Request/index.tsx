/* eslint-disable @typescript-eslint/no-explicit-any */
import { api_Development } from "../Config/ApiConstants";
import { getAuthToken } from "../Methods/AuthMethods";
import axios from "axios";

type RequestHeaders = {
  [key: string]: string;
};
type Params = {
  headers: RequestHeaders;
  method: string;
};
type MyPromise<T> = Promise<{ data: T }>;

export const requestMethod = async (
  url: string,
  data: any,
  method: string
): MyPromise<any> => {

  const baseUrl: string = `${api_Development}/${url}`;
  const headers: RequestHeaders = {
    "Content-Type": "application/json",
  };

  if (getAuthToken()) {
    headers["Authorization"] = getAuthToken();
  }

  const requestOptions: Params = {
    headers: headers,
    method: method,
  };

  return await axios({ ...requestOptions, url: baseUrl, data })
    .then((response: any) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error: any) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

const instance = axios.create({
  baseURL: api_Development,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Credentials": true,
    "Accept": "application/json",
    Authorization: getAuthToken()
  }
});

const cancelTokenSource = axios.CancelToken.source();
instance.defaults.cancelToken = cancelTokenSource.token;

export const cancelRequests = (reason: any) => {
  cancelTokenSource.cancel(reason);
};

export const isCancel = (error: any) => {
  return axios.isCancel(error);
};

export default instance;