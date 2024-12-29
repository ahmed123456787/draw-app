import { API } from "./utils";
import { handleApiError } from "./utils";

export const createChild = async (data) => {
  try {
    const response = await API.post("user/childs/", data);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAllChild = async (id) => {
  try {
    const response = await API.get(`user/childs/${id}/`);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteChild = async (id) => {
  try {
    const response = await API.delete(`user/childs/${id}/`);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const createParent = async (data) => {
  try {
    const response = await API.post("user/", data);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const modifyPaeent = async (data) => {
  try {
    const response = await API.put(`user/`, data);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
