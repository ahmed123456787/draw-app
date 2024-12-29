import { API } from "./utils";
import { handleApiError } from "./utils";

export const login = async (data) => {
  try {
    const response = await API.post("user/token/", data);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getRefreshToken = async (data) => {
  try {
    const response = await API.post("user/token/refresh/", data);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const childLogin = async (data) => {
  try {
    const response = await API.post("user/child-register/", data);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
