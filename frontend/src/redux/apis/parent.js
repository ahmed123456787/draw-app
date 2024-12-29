import { API } from "./utils";
import { handleApiError } from "./utils";

export const getAllDrawsForParent = async () => {
  try {
    const response = await API.get(`parent/draws/`);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getDrawForParent = async (id) => {
  try {
    const response = await API.get(`parent/draws/${id}/`);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateDrawForParent = async (id, data) => {
  try {
    const response = await API.patch(`parent/draws/${id}/`, data);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteDrawForParent = async (id) => {
  try {
    const response = await API.delete(`parent/draws/${id}/`);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
