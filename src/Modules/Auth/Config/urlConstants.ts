import { getMyAPiUrl } from "Services/Methods/AuthMethods";

export const signInUrl: string = getMyAPiUrl() + "/auth/signup";
export const loginUrl: string = getMyAPiUrl() + "/auth/login";
