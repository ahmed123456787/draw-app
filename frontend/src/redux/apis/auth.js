import { API } from "./utils";
import { handleApiError } from "./utils";

export const login = async (data) => {
  try {
    const response = await API.post("user/token/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getRefreshToken = async (data) => {
  try {
    const response = await API.post("user/token/refresh/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const childLogin = async (data) => {
  try {
    const response = await API.post("user/child-register/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
