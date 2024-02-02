import { api_Development } from "../Config/ApiConstants";
import crypto from 'crypto-js'

export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const AUTH_USER = "AUTH_USER";
export const ENCRYPT_USER_KEY = "RIJO@@@STUDY@@@ENCRYPTION@@@PURPOSE";
export const INITIALIZATION_VECTOR = "SAMPLE12345";

export const getAuthToken = () => {
  return localStorage.getItem(ACCESS_TOKEN)
    ? "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    : "";
};

export const getMyAPiUrl = () => {
  return api_Development;
};

export const getAuthUser = () => {
  if (localStorage.getItem(AUTH_USER)) {
    const selectedUser: any = localStorage.getItem(AUTH_USER);
    const bytes = crypto.AES.decrypt(selectedUser, ENCRYPT_USER_KEY, { INITIALIZATION_VECTOR });
    const returnData = bytes.toString(crypto.enc.Utf8);
    return JSON.parse(returnData);
  }
  else {
    return ''
  }
}
