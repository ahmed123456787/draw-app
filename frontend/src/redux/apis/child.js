import { API } from "./utils";
import { handleApiError } from "./utils";

export const getAllDraws = async () => {
  try {
    const response = await API.get(`child/draws/`);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getDraw = async (id) => {
  try {
    const response = await API.get(`child/draws/${id}/`);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const createDraw = async (data) => {
  try {
    const response = await API.post("child/draws/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateDraw = async (id, data) => {
  try {
    const response = await API.put(`child/draws/${id}/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteDraw = async (id) => {
  try {
    const response = await API.delete(`child/draws/${id}/`);
    return { error: null, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
