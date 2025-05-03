import axios from "axios";
import { uuidv7 } from "uuidv7";

// Set default API base URL and credentials handling
axios.defaults.baseURL = import.meta.env.VITE_LOCAL_API_URL;
axios.defaults.withCredentials = true;

const API_VERSION = "v1";

// ----------------------------------------
// LOGIN
// ----------------------------------------
export const login = async (email, password) => {
  try {
    await axios.get("/sanctum/csrf-cookie"); // Get CSRF token
    const response = await axios.post(`/api/${API_VERSION}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// ----------------------------------------
// REGISTER
// ----------------------------------------
export const register = async (name, email, password) => {
  try {
    await axios.get("/sanctum/csrf-cookie");
    const id = uuidv7();
    const response = await axios.post(`/api/${API_VERSION}/register`, {
      id,
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error;
  }
};

// ----------------------------------------
// LOGOUT
// ----------------------------------------
export const logout = async () => {
  try {
    const response = await axios.post(`/api/${API_VERSION}/logout`);
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error;
  }
};

// ----------------------------------------
// GET DATA (GET request to any endpoint)
// ----------------------------------------
export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`/api/${API_VERSION}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error.response?.data || error.message);
    throw error;
  }
};

// ----------------------------------------
// GET AUTHENTICATED USER
// ----------------------------------------
export const getUser = async () => {
  try {
    const response = await axios.get(`/api/${API_VERSION}/user`);
    return response.data;
  } catch (error) {
    console.error("Fetch user error:", error.response?.data || error.message);
    throw error;
  }
};

// ----------------------------------------
// POST DATA (handles both JSON and file uploads)
// ----------------------------------------
export const postData = async (endpoint, data, isFile = false) => {
  console.log(`📡 Sending POST to /api/${API_VERSION}/${endpoint}`, data);

  let requestData = data;

  if (isFile) {
    const formData = new FormData();
    if (data.document) formData.append("document", data.document);
    if (data.id) formData.append("id", data.id);
    if (data.user_id) formData.append("user_id", data.user_id);
    requestData = formData;
  }

  try {
    const response = await axios.post(
      `/api/${API_VERSION}/${endpoint}`,
      requestData,
      {
        headers: {
          "Content-Type": isFile ? "multipart/form-data" : "application/json",
        },
      }
    );

    console.log("✅ API response:", response);
    console.log("📦 Data received:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ postData error:", error);
    if (error.response) {
      console.error(
        "⚠️ Server response:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("🚨 No response from server:", error.message);
    }
    throw error;
  }
};

// ----------------------------------------
// DELETE DATA
// ----------------------------------------
export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`/api/${API_VERSION}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
    throw error;
  }
};
