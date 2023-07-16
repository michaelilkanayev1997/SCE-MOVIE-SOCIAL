import axios from "axios";
import apiConfig from "./apiConfig";

const tmdbApiKey = apiConfig.apiKey;

const api = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    Authorization: `Bearer ${tmdbApiKey}`,
  },
  params: {
    api_key: tmdbApiKey,
  },
});

export const getMediaList = async (MediaType, MediaName) => {
  try {
    const response = await api.get("/" + MediaType + "/" + MediaName);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const getMediaListByPage = async (MediaType, MediaName, page) => {
  try {
    const response = await api.get("/" + MediaType + "/" + MediaName, {
      params: { page: page },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDetails = async (type, id) => {
  try {
    const response = await api.get("/" + type + "/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCast = async (type, id) => {
  try {
    const response = await api.get("/" + type + "/" + id + "/credits");
    return response.data.cast;
  } catch (error) {
    console.error(error);
  }
};

export const getVideo = async (type, id) => {
  try {
    const response = await api.get("/" + type + "/" + id + "/videos");
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const getSimilar = async (type, id) => {
  try {
    const response = await api.get("/" + type + "/" + id + "/similar");
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const getImages = async (type, id) => {
  try {
    const response = await api.get("/" + type + "/" + id + "/images");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPersonDetail = async (personId) => {
  try {
    const response = await api.get("/person/" + personId);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPersonMedia = async (personId) => {
  try {
    const response = await api.get("/person/" + personId + "/combined_credits");
    return response.data.cast;
  } catch (error) {
    console.error(error);
  }
};

export const SearchMedia = async (mediaType, query, page) => {
  try {
    const response = await api.get("/search/" + mediaType, {
      params: { query: query, page: page },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
